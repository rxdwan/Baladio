console.clear(); // Clear old logs on every server restart
console.log('🎵 Lofi Beats server starting...');
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const multer = require('multer');
const mm = require('music-metadata');
const NodeID3 = require('node-id3');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegStatic);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SONGS_DIR          = path.join(__dirname, '..', 'songs');
const COVERS_DIR         = path.join(__dirname, 'covers');
const SONG_COVERS_DIR    = path.join(COVERS_DIR, 'songs');
const PLAYLIST_COVERS_DIR= path.join(COVERS_DIR, 'playlists');
const DATA_DIR           = path.join(__dirname, 'data');
const PLAYLISTS_FILE     = path.join(DATA_DIR, 'playlists.json');
const METADATA_FILE      = path.join(DATA_DIR, 'metadata.json');
const HISTORY_FILE       = path.join(DATA_DIR, 'history.json');

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Ensure directories exist
[SONGS_DIR, COVERS_DIR, SONG_COVERS_DIR, PLAYLIST_COVERS_DIR, DATA_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const Database = require('better-sqlite3');
const DB_FILE = path.join(DATA_DIR, 'baladio.db');
const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        song_id TEXT NOT NULL,
        filename TEXT,
        title TEXT,
        artist TEXT,
        duration INTEGER,
        played_at INTEGER NOT NULL,
        hour INTEGER,
        day_of_week INTEGER,
        week_num INTEGER,
        month INTEGER,
        year INTEGER
    );
    CREATE TABLE IF NOT EXISTS song_stats (
        song_id TEXT PRIMARY KEY,
        play_count INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS artist_stats (
        artist TEXT PRIMARY KEY,
        play_count INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS playlists (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        has_cover INTEGER DEFAULT 0,
        position INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS playlist_songs (
        playlist_id TEXT NOT NULL,
        song_id TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (playlist_id, song_id)
    );
    CREATE TABLE IF NOT EXISTS metadata (
        song_id TEXT PRIMARY KEY,
        filename TEXT,
        title TEXT,
        artist TEXT,
        has_custom_cover INTEGER DEFAULT 0,
        ignore_id3_cover INTEGER DEFAULT 0
    );
`);

// One-time migration from JSON to SQLite
const hasMigrated = db.prepare("SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name='migration_done'").get().c > 0;
if (!hasMigrated) {
    console.log('Running JSON to SQLite migration...');
    db.exec('CREATE TABLE migration_done (migrated INTEGER)');
    
    if (fs.existsSync(METADATA_FILE)) {
        try {
            const meta = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
            const stmt = db.prepare('INSERT INTO metadata (song_id, filename, title, artist, has_custom_cover, ignore_id3_cover) VALUES (?, ?, ?, ?, ?, ?)');
            db.transaction(() => {
                for (const [uuid, data] of Object.entries(meta)) {
                    stmt.run(uuid, data.filename, data.title, data.artist, data.hasCustomCover ? 1 : 0, data.ignoreID3Cover ? 1 : 0);
                }
            })();
        } catch(e) { console.error('Metadata migration error', e); }
    }

    if (fs.existsSync(PLAYLISTS_FILE)) {
        try {
            const plList = JSON.parse(fs.readFileSync(PLAYLISTS_FILE, 'utf-8'));
            const insertPl = db.prepare('INSERT INTO playlists (id, name, has_cover, position) VALUES (?, ?, ?, ?)');
            const insertSong = db.prepare('INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)');
            db.transaction(() => {
                plList.forEach((pl, idx) => {
                    insertPl.run(pl.id, pl.name, pl.hasCover ? 1 : 0, idx);
                    pl.songs.forEach((songId, sIdx) => {
                        insertSong.run(pl.id, songId, sIdx);
                    });
                });
            })();
        } catch(e) { console.error('Playlist migration error', e); }
    }

    if (fs.existsSync(HISTORY_FILE)) {
        try {
            const histList = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
            const insertHist = db.prepare('INSERT INTO history (song_id, filename, title, artist, duration, played_at, hour, day_of_week, week_num, month, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            const upsertSong = db.prepare('INSERT INTO song_stats (song_id, play_count) VALUES (?, 1) ON CONFLICT(song_id) DO UPDATE SET play_count = play_count + 1');
            const upsertArtist = db.prepare('INSERT INTO artist_stats (artist, play_count) VALUES (?, 1) ON CONFLICT(artist) DO UPDATE SET play_count = play_count + 1');
            
            db.transaction(() => {
                // To get accurate play counts, just count the events
                for (const h of histList) {
                    insertHist.run(h.id, h.filename || null, h.title || null, h.artist || null, h.duration || 0, h.playedAt, h.hour, h.dayOfWeek, h.weekNum, h.month, h.year);
                    upsertSong.run(h.id);
                    if (h.artist) {
                        const splitArtists = h.artist.split(/[,&]/).map(a => a.trim()).filter(a => a && a !== 'Unknown Artist');
                        for (const a of splitArtists) {
                            upsertArtist.run(a);
                        }
                    }
                }
            })();
        } catch(e) { console.error('History migration error', e); }
    }
    console.log('Migration complete!');
    db.exec('INSERT INTO migration_done VALUES (1)');
}

function getPlaylistsData() {
    const playlists = db.prepare('SELECT * FROM playlists ORDER BY position ASC').all();
    const songsStmt = db.prepare('SELECT song_id FROM playlist_songs WHERE playlist_id = ? ORDER BY position ASC');
    return playlists.map(pl => {
        const songs = songsStmt.all(pl.id).map(s => s.song_id);
        return {
            id: pl.id,
            name: pl.name,
            hasCover: !!pl.has_cover,
            songs: songs
        };
    });
}

function savePlaylistsData(playlists) {
    const deletePl = db.prepare('DELETE FROM playlists');
    const deleteSongs = db.prepare('DELETE FROM playlist_songs');
    const insertPl = db.prepare('INSERT INTO playlists (id, name, has_cover, position) VALUES (?, ?, ?, ?)');
    const insertSong = db.prepare('INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)');
    
    db.transaction(() => {
        deleteSongs.run();
        deletePl.run();
        playlists.forEach((pl, idx) => {
            insertPl.run(pl.id, pl.name, pl.hasCover ? 1 : 0, idx);
            pl.songs.forEach((songId, sIdx) => {
                insertSong.run(pl.id, songId, sIdx);
            });
        });
    })();
}

function getMetadataData() {
    const rows = db.prepare('SELECT * FROM metadata').all();
    const map = {};
    for (const row of rows) {
        map[row.song_id] = {
            filename: row.filename,
            title: row.title,
            artist: row.artist,
            hasCustomCover: !!row.has_custom_cover,
            ignoreID3Cover: !!row.ignore_id3_cover
        };
    }
    return map;
}

function saveMetadataData(data) {
    const deleteMeta = db.prepare('DELETE FROM metadata');
    const stmt = db.prepare('INSERT INTO metadata (song_id, filename, title, artist, has_custom_cover, ignore_id3_cover) VALUES (?, ?, ?, ?, ?, ?)');
    db.transaction(() => {
        deleteMeta.run();
        for (const [uuid, entry] of Object.entries(data)) {
            stmt.run(uuid, entry.filename, entry.title, entry.artist, entry.hasCustomCover ? 1 : 0, entry.ignoreID3Cover ? 1 : 0);
        }
    })();
}

function buildFilenameToUuid(metadataData) {
    const map = {};
    for (const [uuid, entry] of Object.entries(metadataData)) {
        if (UUID_RE.test(uuid) && entry.filename) {
            map[entry.filename] = uuid;
        }
    }
    return map;
}

app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for cover uploads — now names file by song UUID (passed as `id` in body)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SONG_COVERS_DIR);
    },
    filename: (req, file, cb) => {
        const songId = req.body.id;
        if (!songId) return cb(new Error('No song id provided'));
        cb(null, `${songId}.jpg`);
    }
});
const upload = multer({ storage });

// GET /api/library
app.get('/api/library', async (req, res) => {
    try {
        const files = fs.readdirSync(SONGS_DIR);
        const musicFiles = files.filter(f => f.toLowerCase().endsWith('.mp3') || f.toLowerCase().endsWith('.mp4'));
        const metadataData = getMetadataData();
        const filenameToUuid = buildFilenameToUuid(metadataData);
        const results = [];

        for (const file of musicFiles) {
            const filePath = path.join(SONGS_DIR, file);
            const ext = path.extname(file).toLowerCase().replace('.', '');
            const stats = fs.statSync(filePath);

            let title = file.replace(/\.[^/.]+$/, "");
            let artist = 'Unknown Artist';
            let duration = 0;
            let hasID3Cover = false;

            try {
                const metadata = await mm.parseFile(filePath);
                title = metadata.common.title || title;
                artist = metadata.common.artist || 'Unknown Artist';
                duration = metadata.format.duration || 0;
                if (metadata.common.picture && metadata.common.picture.length > 0) {
                    hasID3Cover = true;
                }
            } catch (err) {
                console.error(`Error parsing metadata for ${file}:`, err.message);
            }

            // Look up or create UUID for this file
            let uuid = filenameToUuid[file];
            if (!uuid) {
                // New file added after migration — assign UUID on-the-fly
                uuid = crypto.randomUUID();
                metadataData[uuid] = { filename: file };
                saveMetadataData(metadataData);
                filenameToUuid[file] = uuid;
                console.log(`[library] Auto-assigned UUID ${uuid} to new file: ${file}`);
            }

            const songMeta = metadataData[uuid] || {};
            let ignoreID3Cover = false;
            if (songMeta.title) title = songMeta.title;
            if (songMeta.artist) artist = songMeta.artist;
            if (songMeta.ignoreID3Cover) ignoreID3Cover = true;

            // Custom cover is now keyed by UUID
            const customCoverPath = path.join(SONG_COVERS_DIR, `${uuid}.jpg`);
            const hasCustomCover = fs.existsSync(customCoverPath);
            const hasAnyCover = hasCustomCover || (hasID3Cover && !ignoreID3Cover) || (ext === 'mp4' && !ignoreID3Cover);

            results.push({
                id: uuid,       // stable UUID — use this everywhere except streaming
                filename: file, // still needed for /stream/:filename
                title,
                artist,
                duration,
                type: ext,
                hasCustomCover,
                hasAnyCover,
                size: stats.size
            });
        }
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scan library' });
    }
});

// GET /stream/:filename  — unchanged, still uses filename to serve the file
app.get('/stream/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(SONGS_DIR, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': filename.endsWith('.mp4') ? 'video/mp4' : 'audio/mpeg',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': filename.endsWith('.mp4') ? 'video/mp4' : 'audio/mpeg',
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});

// Helper: send default cover image
function sendDefaultCover(res) {
    const defaultCover = path.join(COVERS_DIR, 'default_song_cover.jpg');
    if (fs.existsSync(defaultCover)) {
        return res.sendFile(defaultCover);
    }
    const placeholder = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    res.set('Content-Type', 'image/png');
    return res.send(placeholder);
}

// GET /api/cover/default
app.get('/api/cover/default', (req, res) => {
    sendDefaultCover(res);
});

// GET /api/cover/:id  — :id is now a UUID
app.get('/api/cover/:id', async (req, res) => {
    const id = req.params.id;

    // 1. Check custom cover by UUID
    const customCoverPath = path.join(SONG_COVERS_DIR, `${id}.jpg`);
    if (fs.existsSync(customCoverPath)) {
        return res.sendFile(customCoverPath);
    }

    // 2. Look up filename from metadata
    const metadataData = getMetadataData();
    const songMeta = metadataData[id];
    if (!songMeta || !songMeta.filename) {
        return sendDefaultCover(res);
    }
    const filename = songMeta.filename;

    if (songMeta.ignoreID3Cover) {
        return sendDefaultCover(res);
    }

    const filePath = path.join(SONGS_DIR, filename);
    if (!fs.existsSync(filePath)) {
        return sendDefaultCover(res);
    }

    // 3. Try embedded cover from MP3 ID3 tags
    if (filename.toLowerCase().endsWith('.mp3')) {
        try {
            const metadata = await mm.parseFile(filePath);
            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const picture = metadata.common.picture[0];
                res.set('Content-Type', picture.format);
                return res.send(picture.data);
            }
        } catch (err) {}
        return sendDefaultCover(res);
    } else if (filename.toLowerCase().endsWith('.mp4')) {
        // Extract first frame using ffmpeg
        res.set('Content-Type', 'image/jpeg');
        const tempName = `${id}_temp.jpg`;
        const command = ffmpeg(filePath)
            .screenshots({
                timestamps: [0],
                size: '320x240',
                folder: SONG_COVERS_DIR,
                filename: tempName
            });

        command.on('end', () => {
            const tempCover = path.join(SONG_COVERS_DIR, tempName);
            if (fs.existsSync(tempCover)) {
                res.sendFile(tempCover, {}, (err) => {
                    fs.unlink(tempCover, () => {});
                });
            } else {
                sendDefaultCover(res);
            }
        });
        command.on('error', () => {
            sendDefaultCover(res);
        });
        return;
    }

    sendDefaultCover(res);
});

// POST /api/save-settings  — accepts `id` (UUID) instead of `filename`
app.post('/api/save-settings', (req, res) => {
    const { id, newTitle, newArtist } = req.body;
    if (!id) return res.status(400).send('Song id is required');

    const metadataData = getMetadataData();
    metadataData[id] = metadataData[id] || {};
    metadataData[id].title = newTitle;
    metadataData[id].artist = newArtist;
    saveMetadataData(metadataData);

    const filename = metadataData[id].filename;
    if (filename) {
        const filePath = path.join(SONGS_DIR, filename);
        if (fs.existsSync(filePath)) {
            if (filename.toLowerCase().endsWith('.mp3')) {
                const tags = { title: newTitle, artist: newArtist };
                NodeID3.update(tags, filePath);
            }
        }
    }

    res.json({ success: true });
});

// POST /api/upload-cover  — body now sends `id` (UUID)
app.post('/api/upload-cover', upload.single('cover'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const songId = req.body.id;
    const metadataData = getMetadataData();
    metadataData[songId] = metadataData[songId] || {};
    metadataData[songId].hasCustomCover = true;
    metadataData[songId].ignoreID3Cover = false;
    saveMetadataData(metadataData);

    res.json({ success: true });
});

// DELETE /api/cover/:id  — :id is now a UUID
app.delete('/api/cover/:id', (req, res) => {
    const id = req.params.id;
    const coverPath = path.join(SONG_COVERS_DIR, `${id}.jpg`);
    if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
    }
    const metadataData = getMetadataData();
    metadataData[id] = metadataData[id] || {};
    metadataData[id].hasCustomCover = false;
    metadataData[id].ignoreID3Cover = true;
    saveMetadataData(metadataData);
    res.json({ success: true });
});

// GET /api/playlists
app.get('/api/playlists', (req, res) => {
    res.json(getPlaylistsData());
});

// POST /api/playlists
app.post('/api/playlists', (req, res) => {
    const { name } = req.body;
    const playlists = getPlaylistsData();

    const newPlaylist = {
        id: Date.now().toString(),
        name,
        songs: []
    };

    playlists.push(newPlaylist);
    savePlaylistsData(playlists);
    res.json(newPlaylist);
});

// PUT /api/playlists/reorder
app.put('/api/playlists/reorder', (req, res) => {
    const { order } = req.body;
    if (!Array.isArray(order)) return res.status(400).send('order array required');
    const playlists = getPlaylistsData();
    const byId = new Map(playlists.map(p => [p.id, p]));
    const reordered = order.map(id => byId.get(id)).filter(Boolean);
    playlists.forEach(p => { if (!order.includes(p.id)) reordered.push(p); });
    savePlaylistsData(reordered);
    res.json({ success: true, playlists: reordered });
});

// PUT /api/playlists/:id
app.put('/api/playlists/:id', (req, res) => {
    const id = req.params.id;
    const { name, songs } = req.body;
    const playlists = getPlaylistsData();

    const playlist = playlists.find(p => p.id === id);
    if (playlist) {
        if (name !== undefined) playlist.name = name;
        if (songs !== undefined) playlist.songs = songs;
        savePlaylistsData(playlists);
        res.json(playlist);
    } else {
        res.status(404).send('Playlist not found');
    }
});

// DELETE /api/playlists/:id
app.delete('/api/playlists/:id', (req, res) => {
    const id = req.params.id;
    let playlists = getPlaylistsData();
    playlists = playlists.filter(p => p.id !== id);
    savePlaylistsData(playlists);
    res.json({ success: true });
});

// POST /api/playlist-cover/:id
const playlistCoverStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, PLAYLIST_COVERS_DIR),
    filename: (req, file, cb) => cb(null, `playlist_${req.params.id}.jpg`)
});
const uploadPlaylistCover = multer({ storage: playlistCoverStorage });

app.post('/api/playlist-cover/:id', uploadPlaylistCover.single('cover'), (req, res) => {
    const playlistId = req.params.id;
    if (!playlistId) return res.status(400).send('playlistId required');
    const playlists = getPlaylistsData();
    const pl = playlists.find(p => p.id === playlistId);
    if (pl) { pl.hasCover = true; savePlaylistsData(playlists); }
    res.json({ success: true });
});

// GET /api/playlist-cover/:id
app.get('/api/playlist-cover/:id', (req, res) => {
    const coverPath = path.join(PLAYLIST_COVERS_DIR, `playlist_${req.params.id}.jpg`);
    if (fs.existsSync(coverPath)) return res.sendFile(coverPath);
    sendDefaultCover(res);
});

// DELETE /api/playlist-cover/:id
app.delete('/api/playlist-cover/:id', (req, res) => {
    const id = req.params.id;
    const coverPath = path.join(PLAYLIST_COVERS_DIR, `playlist_${id}.jpg`);
    if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
    const playlists = getPlaylistsData();
    const pl = playlists.find(p => p.id === id);
    if (pl) { pl.hasCover = false; savePlaylistsData(playlists); }
    res.json({ success: true });
});

// POST /api/rename-file — renames the actual file; UUID stays the same, filename field in metadata updates
app.post('/api/rename-file', async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'song id required' });

    const metadataData = getMetadataData();
    const songMeta = metadataData[id];
    if (!songMeta || !songMeta.filename) return res.status(404).json({ error: 'Song not found' });

    const filename = songMeta.filename;
    const filePath = path.join(SONGS_DIR, filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });

    const ext = path.extname(filename);
    let title = songMeta.title, artist = songMeta.artist;
    if (!title) {
        try {
            const meta = await mm.parseFile(filePath);
            title  = title  || meta.common.title  || path.basename(filename, ext);
            if (!artist) artist = meta.common.artist || '';
        } catch(e) {
            title = title || path.basename(filename, ext);
            if (!artist) artist = '';
        }
    } else if (artist === undefined || artist === null) {
        artist = '';
    }

    const sanitize = s => s.replace(/[\/\\?%*:|"><]/g, '-').trim();
    const knownArtist = artist && artist.trim() && artist.trim().toLowerCase() !== 'unknown artist';
    const newBase = knownArtist
        ? `${sanitize(artist)} - ${sanitize(title)}${ext}`
        : `${sanitize(title)}${ext}`;
    if (newBase === filename) return res.json({ success: true, newFilename: filename, unchanged: true });

    let newFilename = newBase;
    let counter = 1;
    while (fs.existsSync(path.join(SONGS_DIR, newFilename))) {
        const base = knownArtist ? `${sanitize(artist)} - ${sanitize(title)}` : sanitize(title);
        newFilename = `${base} (${counter++})${ext}`;
    }

    fs.renameSync(filePath, path.join(SONGS_DIR, newFilename));

    // Cover image stays named by UUID — no rename needed!
    // Just update the filename field in metadata
    metadataData[id].filename = newFilename;
    saveMetadataData(metadataData);

    // Playlists store UUIDs now — no update needed!

    // History entries use UUID — no update needed!

    res.json({ success: true, newFilename, oldFilename: filename });
});

// GET /api/history
app.get('/api/history', (req, res) => {
    const rows = db.prepare('SELECT * FROM history ORDER BY played_at DESC LIMIT 50').all();
    res.json(rows.map(r => ({
        id: r.song_id,
        filename: r.filename,
        title: r.title,
        artist: r.artist,
        duration: r.duration,
        playedAt: r.played_at,
        hour: r.hour,
        dayOfWeek: r.day_of_week,
        weekNum: r.week_num,
        month: r.month,
        year: r.year
    })));
});

// POST /api/history — append one entry and upsert stats
app.post('/api/history', (req, res) => {
    const entry = req.body;
    if (!entry || !entry.id) return res.status(400).json({ error: 'entry with id required' });
    
    const insertHist = db.prepare('INSERT INTO history (song_id, filename, title, artist, duration, played_at, hour, day_of_week, week_num, month, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const upsertSong = db.prepare('INSERT INTO song_stats (song_id, play_count) VALUES (?, 1) ON CONFLICT(song_id) DO UPDATE SET play_count = play_count + 1');
    const upsertArtist = db.prepare('INSERT INTO artist_stats (artist, play_count) VALUES (?, 1) ON CONFLICT(artist) DO UPDATE SET play_count = play_count + 1');
    
    db.transaction(() => {
        insertHist.run(entry.id, entry.filename || null, entry.title || null, entry.artist || null, entry.duration || 0, entry.playedAt, entry.hour, entry.dayOfWeek, entry.weekNum, entry.month, entry.year);
        upsertSong.run(entry.id);
        if (entry.artist) {
            const splitArtists = entry.artist.split(/[,&]/).map(a => a.trim()).filter(a => a && a !== 'Unknown Artist');
            for (const a of splitArtists) {
                upsertArtist.run(a);
            }
        }
    })();
    
    // limit history to 5000
    db.prepare(`
        DELETE FROM history 
        WHERE id NOT IN (
            SELECT id FROM history ORDER BY played_at DESC LIMIT 5000
        )
    `).run();
    
    res.json({ success: true });
});

// GET /api/analytics - fetch pre-computed stats
app.get('/api/analytics', (req, res) => {
    const topSong = db.prepare('SELECT song_id, play_count FROM song_stats ORDER BY play_count DESC LIMIT 1').get();
    const topArtist = db.prepare('SELECT artist, play_count FROM artist_stats ORDER BY play_count DESC LIMIT 1').get();
    const topPl = db.prepare(`
        SELECT ps.playlist_id, COALESCE(SUM(ss.play_count), 0) as pl_plays 
        FROM playlist_songs ps 
        LEFT JOIN song_stats ss ON ps.song_id = ss.song_id 
        GROUP BY ps.playlist_id 
        ORDER BY pl_plays DESC 
        LIMIT 1
    `).get();

    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const todayCount = db.prepare('SELECT count(*) as c FROM history WHERE played_at >= ?').get(todayStart.getTime()).c;
    const uniqueArtists = db.prepare('SELECT count(*) as c FROM artist_stats').get().c;
    const totalPlays = db.prepare('SELECT count(*) as c FROM history').get().c;
    
    const dayMs = 86400000;
    let streak = 0;
    let checkDay = new Date(); checkDay.setHours(0,0,0,0);
    const streakStmt = db.prepare('SELECT count(*) as c FROM history WHERE played_at >= ? AND played_at < ?');
    while (true) {
        const start = checkDay.getTime(), end = start + dayMs;
        const c = streakStmt.get(start, end).c;
        if (c > 0) {
            streak++;
            checkDay = new Date(start - dayMs);
        } else {
            break;
        }
    }

    res.json({
        topSongId: topSong ? topSong.song_id : null,
        topSongPlays: topSong ? topSong.play_count : 0,
        topArtist: topArtist ? topArtist.artist : null,
        topArtistPlays: topArtist ? topArtist.play_count : 0,
        topPlaylistId: topPl ? topPl.playlist_id : null,
        topPlaylistPlays: topPl ? topPl.pl_plays : 0,
        todayCount,
        uniqueArtists,
        streak,
        totalPlays
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});