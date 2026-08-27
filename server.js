console.clear(); // Clear old logs on every server restart
console.log('Baladio server starting...');
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

// --- Developer Tools: Log Interceptor & SSE ---
const MAX_LOGS = 500;
const devLogs = [];
const sseClients = new Set();

function broadcastLog(logEntry) {
    devLogs.push(logEntry);
    if (devLogs.length > MAX_LOGS) devLogs.shift();
    
    const msg = `data: ${JSON.stringify(logEntry)}\n\n`;
    for (const res of sseClients) {
        try { res.write(msg); } catch (e) { sseClients.delete(res); }
    }
}

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

function formatArgs(args) {
    return Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
}

console.log = function(...args) {
    originalLog.apply(console, args);
    broadcastLog({ type: 'info', message: formatArgs(args), timestamp: new Date().toISOString() });
};

console.warn = function(...args) {
    originalWarn.apply(console, args);
    broadcastLog({ type: 'warn', message: formatArgs(args), timestamp: new Date().toISOString() });
};

console.error = function(...args) {
    originalError.apply(console, args);
    broadcastLog({ type: 'error', message: formatArgs(args), timestamp: new Date().toISOString() });
};

app.get('/api/dev/logs', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    
    // Send existing history
    for (const log of devLogs) {
        res.write(`data: ${JSON.stringify(log)}\n\n`);
    }
    
    sseClients.add(res);
    
    req.on('close', () => {
        sseClients.delete(res);
    });
});
// ----------------------------------------------

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
    CREATE TABLE IF NOT EXISTS lyrics_cache (
        song_id   TEXT PRIMARY KEY,
        synced    INTEGER DEFAULT 0,
        content   TEXT NOT NULL,
        source    TEXT,
        fetched_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS notifications (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        type       TEXT NOT NULL,
        title      TEXT NOT NULL,
        body       TEXT NOT NULL,
        seen       INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        payload    TEXT
    );
`);

// Add lufs_offset column if it doesn't exist yet (safe to run every boot)
try { db.exec('ALTER TABLE metadata ADD COLUMN lufs_offset REAL'); } catch(e) { /* already exists */ }
try { db.exec("ALTER TABLE metadata ADD COLUMN cover_source TEXT DEFAULT NULL"); } catch(e) { /* already exists */ }


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
            ignoreID3Cover: !!row.ignore_id3_cover,
            coverSource: row.cover_source || null
        };
    }
    return map;
}


function saveMetadataData(data) {
    const deleteMeta = db.prepare('DELETE FROM metadata');
    const stmt = db.prepare('INSERT INTO metadata (song_id, filename, title, artist, has_custom_cover, ignore_id3_cover, cover_source) VALUES (?, ?, ?, ?, ?, ?, ?)');
    db.transaction(() => {
        deleteMeta.run();
        for (const [uuid, entry] of Object.entries(data)) {
            stmt.run(uuid, entry.filename, entry.title, entry.artist, entry.hasCustomCover ? 1 : 0, entry.ignoreID3Cover ? 1 : 0, entry.coverSource || null);
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

// Background LUFS scan queue
const _lufsQueue = new Set();
let _lufsWorkerRunning = false;

function scheduleLufsScan(uuid, filePath) {
    _lufsQueue.add({ uuid, filePath });
    if (!_lufsWorkerRunning) runLufsWorker();
}

async function runLufsWorker() {
    _lufsWorkerRunning = true;
    for (const job of _lufsQueue) {
        _lufsQueue.delete(job);
        try {
            const offset = await measureLufs(job.filePath);
            if (offset !== null) {
                db.prepare('UPDATE metadata SET lufs_offset = ? WHERE song_id = ?').run(offset, job.uuid);
                console.log(`[lufs] Scanned ${path.basename(job.filePath)}: offset ${offset.toFixed(2)} dB`);
            }
        } catch(e) {
            console.error('[lufs] Scan failed for', job.filePath, e.message);
        }
    }
    _lufsWorkerRunning = false;
}

function measureLufs(filePath) {
    const TARGET_LUFS = -14;
    return new Promise((resolve) => {
        let stderr = '';
        ffmpeg(filePath)
            .audioFilters('ebur128=framelog=verbose')
            .format('null')
            .output('-')
            .on('stderr', (line) => { stderr += line + '\n'; })
            .on('end', () => {
                const match = stderr.match(/I:\s+([\-\d.]+)\s+LUFS/);
                if (match) {
                    const integrated = parseFloat(match[1]);
                    resolve(TARGET_LUFS - integrated);
                } else {
                    resolve(null);
                }
            })
            .on('error', () => resolve(null))
            .run();
    });
}

// GET /api/library
app.get('/api/library', async (req, res) => {
    try {
        const files = fs.readdirSync(SONGS_DIR);
        const validExts = ['.mp3', '.mp4', '.m4a', '.webm', '.wav', '.flac', '.ogg'];
        const musicFiles = files.filter(f => {
            const ext = path.extname(f).toLowerCase();
            return validExts.includes(ext);
        });
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
            let _lufsOffsetFromTag = null;

            try {
                const metadata = await mm.parseFile(filePath);
                title = metadata.common.title || title;
                artist = metadata.common.artist || 'Unknown Artist';
                duration = metadata.format.duration || 0;
                if (metadata.common.picture && metadata.common.picture.length > 0) {
                    hasID3Cover = true;
                }
                // Tier 1: Read ReplayGain tag if present (instant, zero cost)
                const rg = metadata.common.replaygain_track_gain;
                if (rg && typeof rg.dB === 'number' && isFinite(rg.dB)) {
                    _lufsOffsetFromTag = rg.dB;
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

            // Resolve lufsOffset: tag > cached DB value > null (pending ffmpeg scan)
            let lufsOffset = null;
            const dbRow = db.prepare('SELECT lufs_offset FROM metadata WHERE song_id = ?').get(uuid);
            if (_lufsOffsetFromTag !== null) {
                lufsOffset = _lufsOffsetFromTag;
                // Persist tag value if not already stored
                if (!dbRow || dbRow.lufs_offset === null || dbRow.lufs_offset === undefined) {
                    db.prepare('UPDATE metadata SET lufs_offset = ? WHERE song_id = ?').run(lufsOffset, uuid);
                }
            } else if (dbRow && dbRow.lufs_offset !== null && dbRow.lufs_offset !== undefined) {
                lufsOffset = dbRow.lufs_offset;
            } else {
                // Queue background ffmpeg scan for this song
                scheduleLufsScan(uuid, filePath);
            }

            // Custom cover is keyed by UUID. We now separate user and itunes covers.
            const userCoverPath = path.join(SONG_COVERS_DIR, `${uuid}.jpg`);
            const itunesCoverPath = path.join(SONG_COVERS_DIR, `${uuid}_itunes.jpg`);
            const hasCustomCover = fs.existsSync(userCoverPath);
            const hasItunesCover = fs.existsSync(itunesCoverPath);
            const hasAnyCover = hasCustomCover || hasItunesCover || (hasID3Cover && !ignoreID3Cover) || (ext === 'mp4' && !ignoreID3Cover);

            results.push({
                id: uuid,
                filename: file,
                title,
                artist,
                duration,
                type: ext,
                hasCustomCover,
                hasItunesCover,
                hasID3Cover: hasID3Cover && !ignoreID3Cover,
                hasAnyCover,
                coverSource: songMeta.coverSource || null,
                coverReverted: songMeta.coverReverted || false,
                lufsOffset,
                size: stats.size
            });
        }
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scan library' });
    }
});

// GET /stream/:id  — UUID-based, looks up filename from metadata store
app.get('/stream/:id', (req, res) => {
    const id = req.params.id;
    const metadataData = getMetadataData();
    const songMeta = metadataData[id];

    if (!songMeta || !songMeta.filename) {
        return res.status(404).send('Song not found');
    }

    const filename = songMeta.filename;
    const filePath = path.join(SONGS_DIR, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found on disk');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const ext = path.extname(filename).toLowerCase();
    let mimeType = 'audio/mpeg';
    if (ext === '.mp4' || ext === '.m4a') mimeType = 'audio/mp4';
    else if (ext === '.webm') mimeType = 'audio/webm';
    else if (ext === '.wav') mimeType = 'audio/wav';
    else if (ext === '.ogg') mimeType = 'audio/ogg';
    else if (ext === '.flac') mimeType = 'audio/flac';

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': mimeType,
        });
        file.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': mimeType,
        });
        fs.createReadStream(filePath).pipe(res);
    }
});

// Helper: send default cover image
function sendDefaultCover(res) {
    const customDefaultCover = path.join(COVERS_DIR, 'custom_default_cover.jpg');
    if (fs.existsSync(customDefaultCover)) {
        return res.sendFile(customDefaultCover);
    }
    const builtInDefaultCover = path.join(__dirname, 'public', 'assets', 'default_song_cover.jpg');
    if (fs.existsSync(builtInDefaultCover)) {
        return res.sendFile(builtInDefaultCover);
    }
    const placeholder = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    res.set('Content-Type', 'image/png');
    return res.send(placeholder);
}

// GET /api/cover/default
app.get('/api/cover/default', (req, res) => {
    sendDefaultCover(res);
});

const defaultCoverStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });
        cb(null, COVERS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, 'custom_default_cover.jpg');
    }
});
const uploadDefaultCover = multer({ storage: defaultCoverStorage });

// POST /api/default-cover
app.post('/api/default-cover', uploadDefaultCover.single('cover'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    res.json({ success: true });
});

// DELETE /api/default-cover
app.delete('/api/default-cover', (req, res) => {
    const customDefaultCover = path.join(COVERS_DIR, 'custom_default_cover.jpg');
    if (fs.existsSync(customDefaultCover)) {
        fs.unlinkSync(customDefaultCover);
    }
    res.json({ success: true });
});


// GET /api/cover/:id  — :id is now a UUID
app.get('/api/cover/:id', async (req, res) => {
    const id = req.params.id;
    const onlineOnly = req.query.onlineOnly === '1';

    const userCoverPath = path.join(SONG_COVERS_DIR, `${id}.jpg`);
    const itunesCoverPath = path.join(SONG_COVERS_DIR, `${id}_itunes.jpg`);

    if (onlineOnly) {
        if (fs.existsSync(itunesCoverPath)) return res.sendFile(itunesCoverPath);
        return sendDefaultCover(res);
    }

    // 1. Check custom user cover
    if (fs.existsSync(userCoverPath)) return res.sendFile(userCoverPath);
    
    // 2. Check iTunes cover
    if (fs.existsSync(itunesCoverPath)) return res.sendFile(itunesCoverPath);

    // 3. Look up filename from metadata
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
    const { id, newTitle, newArtist, clearCoverReverted } = req.body;
    if (!id) return res.status(400).send('Song id is required');

    const metadataData = getMetadataData();
    metadataData[id] = metadataData[id] || {};

    // Only update title/artist if they were actually sent
    if (newTitle !== undefined) metadataData[id].title = newTitle;
    if (newArtist !== undefined) metadataData[id].artist = newArtist;

    // Allow clearing the coverReverted flag so auto-fetch can run again
    if (clearCoverReverted) {
        delete metadataData[id].coverReverted;
    }

    saveMetadataData(metadataData);

    const filename = metadataData[id].filename;
    if (filename && (newTitle !== undefined || newArtist !== undefined)) {
        const filePath = path.join(SONGS_DIR, filename);
        if (fs.existsSync(filePath)) {
            if (filename.toLowerCase().endsWith('.mp3')) {
                const tags = {};
                if (newTitle !== undefined) tags.title = newTitle;
                if (newArtist !== undefined) tags.artist = newArtist;
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
    metadataData[songId].coverSource = 'user';
    saveMetadataData(metadataData);

    res.json({ success: true });
});


// DELETE /api/cover/:id  — :id is now a UUID
app.delete('/api/cover/:id', (req, res) => {
    const id = req.params.id;
    const userCoverPath = path.join(SONG_COVERS_DIR, `${id}.jpg`);
    if (fs.existsSync(userCoverPath)) {
        fs.unlinkSync(userCoverPath);
    }
    const metadataData = getMetadataData();
    metadataData[id] = metadataData[id] || {};
    metadataData[id].hasCustomCover = false;
    metadataData[id].ignoreID3Cover = true;
    metadataData[id].coverSource = null;
    saveMetadataData(metadataData);
    res.json({ success: true });
});

// DELETE /api/itunes-cover/:id — revert an iTunes-fetched cover back to embedded/default
// Sets coverReverted=true so the auto-fetcher never re-fetches for this song.
app.delete('/api/itunes-cover/:id', (req, res) => {
    const id = req.params.id;
    const metadataData = getMetadataData();
    
    const itunesCoverPath = path.join(SONG_COVERS_DIR, `${id}_itunes.jpg`);
    if (fs.existsSync(itunesCoverPath)) {
        fs.unlinkSync(itunesCoverPath);
    }

    // Permanently mark as reverted — auto-fetch will skip this song forever
    metadataData[id] = metadataData[id] || {};
    metadataData[id].coverSource = null;
    metadataData[id].coverReverted = true;
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
    const rows = db.prepare(`
        SELECT h.*, 
               COALESCE(m.title, h.title) as current_title, 
               COALESCE(m.artist, h.artist) as current_artist,
               COALESCE(m.filename, h.filename) as current_filename
        FROM history h
        LEFT JOIN metadata m ON h.song_id = m.song_id
        ORDER BY h.played_at DESC 
        LIMIT 50
    `).all();
    res.json(rows.map(r => ({
        id: r.song_id,
        filename: r.current_filename,
        title: r.current_title,
        artist: r.current_artist,
        duration: r.duration,
        playedAt: r.played_at,
        hour: r.hour,
        dayOfWeek: r.day_of_week,
        weekNum: r.week_num,
        month: r.month,
        year: r.year
    })));
});

// POST /api/history — append one entry
app.post('/api/history', (req, res) => {
    const entry = req.body;
    if (!entry || !entry.id) return res.status(400).json({ error: 'entry with id required' });
    
    const insertHist = db.prepare('INSERT INTO history (song_id, filename, title, artist, duration, played_at, hour, day_of_week, week_num, month, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    
    db.transaction(() => {
        insertHist.run(entry.id, entry.filename || null, entry.title || null, entry.artist || null, entry.duration || 0, entry.playedAt, entry.hour, entry.dayOfWeek, entry.weekNum, entry.month, entry.year);
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

// DELETE /api/analytics/reset - clear all history
app.delete('/api/analytics/reset', (req, res) => {
    db.prepare('DELETE FROM history').run();
    res.json({ success: true });
});

// GET /api/analytics - fetch pre-computed stats
app.get('/api/analytics', (req, res) => {
    // Top Song
    const topSong = db.prepare(`
        SELECT song_id, COUNT(*) as play_count 
        FROM history 
        GROUP BY song_id 
        ORDER BY play_count DESC 
        LIMIT 1
    `).get();

    // Top Artist
    const topArtist = db.prepare(`
        SELECT m.artist, COUNT(*) as play_count 
        FROM history h
        JOIN metadata m ON h.song_id = m.song_id
        WHERE m.artist IS NOT NULL AND m.artist != '' AND m.artist != 'Unknown Artist'
        GROUP BY m.artist 
        ORDER BY play_count DESC 
        LIMIT 1
    `).get();

    // Top Playlist
    const topPl = db.prepare(`
        SELECT ps.playlist_id, COUNT(h.id) as pl_plays 
        FROM playlist_songs ps 
        JOIN history h ON ps.song_id = h.song_id 
        GROUP BY ps.playlist_id 
        ORDER BY pl_plays DESC 
        LIMIT 1
    `).get();

    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const todayCount = db.prepare('SELECT count(*) as c FROM history WHERE played_at >= ?').get(todayStart.getTime()).c;
    
    // Unique Artists
    const uniqueArtists = db.prepare(`
        SELECT COUNT(DISTINCT m.artist) as c 
        FROM history h
        JOIN metadata m ON h.song_id = m.song_id
        WHERE m.artist IS NOT NULL AND m.artist != '' AND m.artist != 'Unknown Artist'
    `).get().c;
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

// --- Lyrics & Notifications API ---
const https = require('https');

function httpsGet(url, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { 
            headers: { 'User-Agent': 'Baladio/1.0 (https://github.com/rxdwan/baladio)' },
            timeout: timeoutMs
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error(`Request timed out after ${timeoutMs}ms`));
        });

        req.on('error', reject);
    });
}

// Download binary data (for cover images)
function httpsGetBinary(url, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: { 'User-Agent': 'Baladio/1.0 (https://github.com/rxdwan/baladio)' },
            timeout: timeoutMs
        }, (res) => {
            // Follow redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return httpsGetBinary(res.headers.location, timeoutMs).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode}`));
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        });
        req.on('timeout', () => { req.destroy(); reject(new Error('Timed out')); });
        req.on('error', reject);
    });
}

// POST /api/fetch-cover — fetch cover from iTunes for songs missing one
// Body: { songs: [{ id, title, artist }] }
// Skips any song that already has a custom cover on disk.
// Returns: { fetched: number, results: [{id, success}] }
app.post('/api/fetch-cover', async (req, res) => {
    const { songs } = req.body;
    if (!Array.isArray(songs) || songs.length === 0) {
        return res.status(400).json({ error: 'songs array required' });
    }

    const results = [];
    let fetched = 0;

    const metadataData = getMetadataData();

    for (const { id, title, artist, forceOnline } of songs) {
        const itunesCoverPath = path.join(SONG_COVERS_DIR, `${id}_itunes.jpg`);

        // Never re-fetch for songs the user explicitly reverted
        const songMeta = metadataData[id] || {};
        if (songMeta.coverReverted && !forceOnline) {
            results.push({ id, success: false, reason: 'user_reverted' });
            continue;
        }

        // If we already have an iTunes cover, no need to refetch unless forced
        if (fs.existsSync(itunesCoverPath) && !forceOnline) {
            results.push({ id, success: false, reason: 'already_has_itunes_cover' });
            continue;
        }

        try {
            const cleanTitle = (title || '').replace(/\s*\([^)]*\)/g, '').trim();
            const query = encodeURIComponent(`${artist} ${cleanTitle}`);
            const searchUrl = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=5`;
            const data = await httpsGet(searchUrl, 10000);

            if (!data || !data.results || data.results.length === 0) {
                results.push({ id, success: false, reason: 'no_results' });
                continue;
            }

            // Pick best match — prioritise results where artist name matches
            const artistLower = (artist || '').toLowerCase();
            let pick = data.results.find(r =>
                r.artistName && r.artistName.toLowerCase().includes(artistLower)
            ) || data.results[0];

            // Get highest-res artwork: replace 100x100 with 600x600
            const artUrl = (pick.artworkUrl100 || '').replace('100x100bb', '600x600bb');
            if (!artUrl) {
                results.push({ id, success: false, reason: 'no_artwork' });
                continue;
            }

            const imgBuffer = await httpsGetBinary(artUrl, 15000);
            fs.writeFileSync(itunesCoverPath, imgBuffer);

            // Mark as having a fetched cover in metadata
            const metadataData = getMetadataData();
            metadataData[id] = metadataData[id] || {};
            metadataData[id].coverSource = 'itunes';
            saveMetadataData(metadataData);

            results.push({ id, success: true });
            fetched++;
        } catch (e) {
            console.error(`[cover-fetch] Failed for ${id} (${title}):`, e.message);
            results.push({ id, success: false, reason: 'error' });
        }
    }

    res.json({ fetched, results });
});

app.get('/api/lyrics/:songId', async (req, res) => {
    const songId = req.params.songId;
    const meta = db.prepare('SELECT title, artist FROM metadata WHERE song_id = ?').get(songId);
    if (!meta) return res.status(404).json({ status: 'not_found' });

    // 1. Local .lrc file — always wins, even over cache
    //    Place file in: C:\Users\umarm\Music\lyrics\Artist - Title.lrc
    const lyricsDir = path.join(SONGS_DIR, '..', 'lyrics');
    if (fs.existsSync(lyricsDir)) {
        const expectedFile = path.join(lyricsDir, `${meta.artist} - ${meta.title}.lrc`);
        if (fs.existsSync(expectedFile)) {
            const content = fs.readFileSync(expectedFile, 'utf-8');
            // Upsert into cache so it loads fast next time
            db.prepare(`
                INSERT INTO lyrics_cache (song_id, synced, content, source, fetched_at)
                VALUES (?, 1, ?, 'local', ?)
                ON CONFLICT(song_id) DO UPDATE SET synced=1, content=excluded.content, source='local', fetched_at=excluded.fetched_at
            `).run(songId, content, Date.now());
            return res.json({ status: 'found', synced: true, content });
        }
    }

    // 2. Cache (from a previous LRCLIB fetch or user confirmation)
    const cached = db.prepare('SELECT * FROM lyrics_cache WHERE song_id = ?').get(songId);
    if (cached) {
        return res.json({ status: 'found', synced: !!cached.synced, content: cached.content });
    }

    // 3. LRCLIB Exact Match
    try {
        const cleanTitle = (meta.title || '').replace(/\s*\([^)]*\)/g, '').trim();
        const titleEnc = encodeURIComponent(cleanTitle);
        const artistEnc = encodeURIComponent(meta.artist);
        const exactUrl = `https://lrclib.net/api/get?artist_name=${artistEnc}&track_name=${titleEnc}`;
        
        try {
            const exactRes = await httpsGet(exactUrl);
            if (exactRes && (exactRes.syncedLyrics || exactRes.plainLyrics)) {
                const isSynced = !!exactRes.syncedLyrics;
                const content = exactRes.syncedLyrics || exactRes.plainLyrics;
                db.prepare('INSERT INTO lyrics_cache (song_id, synced, content, source, fetched_at) VALUES (?, ?, ?, ?, ?)').run(songId, isSynced ? 1 : 0, content, 'lrclib_exact', Date.now());
                return res.json({ status: 'found', synced: isSynced, content });
            }
        } catch (e) {
            // Ignore errors from exact match, proceed to search
        }

        // 4. LRCLIB Fuzzy Search
        const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(meta.artist + ' ' + cleanTitle)}`;
        const searchRes = await httpsGet(searchUrl);
        
        if (searchRes && searchRes.length > 0) {
            const candidates = searchRes.filter(r => r.syncedLyrics || r.plainLyrics).slice(0, 5);
            if (candidates.length > 0) {
                const existingFuzzy = db.prepare("SELECT id FROM notifications WHERE type = 'lyrics_fuzzy_match' AND payload LIKE ?").get(`%"songId":"${songId}"%`);
                if (existingFuzzy) {
                    return res.json({ status: 'fuzzy_pending', notificationId: existingFuzzy.id });
                }

                const payload = JSON.stringify({ songId, candidates, originalTitle: meta.title, originalArtist: meta.artist });
                const info = db.prepare(`
                    INSERT INTO notifications (type, title, body, created_at, payload)
                    VALUES ('lyrics_fuzzy_match', ?, ?, ?, ?)
                `).run(
                    'Lyrics: fuzzy match found',
                    `${candidates.length} possible matches found.`,
                    Date.now(),
                    payload
                );
                return res.json({ status: 'fuzzy_pending', notificationId: info.lastInsertRowid });
            }
        }

        // 5. Nothing found
        const notFoundBody = `No lyrics found online for "${meta.title}" by ${meta.artist}.`;
        const existingNotFound = db.prepare("SELECT id FROM notifications WHERE type = 'lyrics_not_found' AND body = ?").get(notFoundBody);
        if (!existingNotFound) {
            db.prepare('INSERT INTO notifications (type, title, body, created_at) VALUES (?, ?, ?, ?)').run(
                'lyrics_not_found',
                'Lyrics not found',
                notFoundBody,
                Date.now()
            );
        }
        return res.json({ status: 'not_found' });

    } catch (e) {
        console.error('Lyrics fetch error:', e);
        return res.status(500).json({ status: 'error' });
    }
});

app.post('/api/lyrics/confirm', async (req, res) => {
    const { songId, lrclib_id, notificationId } = req.body;
    try {
        const lrclibRes = await httpsGet(`https://lrclib.net/api/get/${lrclib_id}`);
        if (lrclibRes && (lrclibRes.syncedLyrics || lrclibRes.plainLyrics)) {
            const isSynced = !!lrclibRes.syncedLyrics;
            const content = lrclibRes.syncedLyrics || lrclibRes.plainLyrics;
            
            // Upsert cache
            db.prepare(`
                INSERT INTO lyrics_cache (song_id, synced, content, source, fetched_at) 
                VALUES (?, ?, ?, ?, ?) 
                ON CONFLICT(song_id) DO UPDATE SET synced=excluded.synced, content=excluded.content, source=excluded.source, fetched_at=excluded.fetched_at
            `).run(songId, isSynced ? 1 : 0, content, 'user_confirmed', Date.now());
            
            if (notificationId) {
                db.prepare('UPDATE notifications SET seen = 1 WHERE id = ?').run(notificationId);
            }
            
            return res.json({ status: 'found', synced: isSynced, content });
        }
        res.status(404).json({ error: 'Lyrics not found on LRCLIB' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch lyrics' });
    }
});

app.get('/api/notifications', (req, res) => {
    const rows = db.prepare('SELECT * FROM notifications ORDER BY created_at DESC').all();
    res.json(rows);
});

app.patch('/api/notifications/seen', (req, res) => {
    db.prepare('UPDATE notifications SET seen = 1 WHERE seen = 0').run();
    res.json({ success: true });
});

app.delete('/api/notifications', (req, res) => {
    db.prepare('DELETE FROM notifications').run();
    res.json({ success: true });
});

// ─── Discovery API ──────────────────────────────────────────────────────────

const { spawn } = require('child_process');

// GET /api/discovery/search?q=<query>
// Search YouTube via yt-dlp and return up to 10 results
// GET /api/discovery/search?q=<query>
// Search YouTube via yt-dlp and return up to 10 results
app.get('/api/discovery/search', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing query' });

    try {
        const results = await new Promise((resolve, reject) => {
            const args = [
                `ytsearch10:${q}`,
                '--dump-json',
                '--flat-playlist',
                '--no-playlist',
                '--no-warnings',
            ];
            const proc = spawn('yt-dlp', args);
            let stdout = '';
            let stderr = '';

            const timeoutId = setTimeout(() => {
                proc.kill('SIGKILL');
                reject(new Error('Search timed out after 15 seconds'));
            }, 15000);

            proc.stdout.on('data', d => stdout += d.toString());
            proc.stderr.on('data', d => stderr += d.toString());
            proc.on('close', code => {
                clearTimeout(timeoutId);
                if (code !== 0 && !stdout) return reject(new Error(stderr || 'yt-dlp error'));
                const items = stdout.trim().split('\n').filter(Boolean).map(line => {
                    try {
                        const r = JSON.parse(line);
                        return {
                            id: r.id,
                            title: r.title,
                            channel: r.channel || r.uploader || '',
                            thumbnail: r.thumbnail || (r.thumbnails && r.thumbnails[0]?.url) || '',
                            duration: r.duration || 0,
                        };
                    } catch { return null; }
                }).filter(Boolean);
                resolve(items);
            });
            proc.on('error', err => {
                clearTimeout(timeoutId);
                reject(err);
            });
        });
        res.json(results);
    } catch (err) {
        console.error('[Discovery] search error:', err.message);
        res.status(500).json({ error: 'Search failed', detail: err.message });
    }
});

// POST /api/discovery/download  { videoId, title }
// Downloads audio as MP3 into SONGS_DIR via yt-dlp
app.post('/api/discovery/download', async (req, res) => {
    const { videoId, title } = req.body;
    if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const outputTemplate = path.join(SONGS_DIR, '%(title)s.%(ext)s');

    try {
        const filename = await new Promise((resolve, reject) => {
            const args = [
                url,
                '-x',
                '--audio-format', 'mp3',
                '--audio-quality', '0',
                '--embed-thumbnail',
                '--add-metadata',
                '--no-playlist',
                '--no-warnings',
                '-o', outputTemplate,
                '--print', 'after_move:filepath',
            ];
            const proc = spawn('yt-dlp', args);
            let finalPath = '';
            let stderr = '';

            const timeoutId = setTimeout(() => {
                proc.kill('SIGKILL');
                reject(new Error('Download timed out after 3 minutes'));
            }, 180000);

            proc.stdout.on('data', d => finalPath += d.toString());
            proc.stderr.on('data', d => stderr += d.toString());
            proc.on('close', code => {
                clearTimeout(timeoutId);
                if (code !== 0) return reject(new Error(stderr || 'yt-dlp exited with code ' + code));
                resolve(finalPath.trim());
            });
            proc.on('error', err => {
                clearTimeout(timeoutId);
                reject(err);
            });
        });
        res.json({ success: true, filename: path.basename(filename) });
    } catch (err) {
        console.error('[Discovery] download error:', err.message);
        res.status(500).json({ error: 'Download failed', detail: err.message });
    }
});

// GET /api/discovery/lyrics-candidates?songId=<id>
// Returns up to 5 LRCLIB candidates for a given song
app.get('/api/discovery/lyrics-candidates', async (req, res) => {
    const { songId } = req.query;
    if (!songId) return res.status(400).json({ error: 'Missing songId' });

    const meta = db.prepare('SELECT title, artist FROM metadata WHERE song_id = ?').get(songId);
    if (!meta) return res.status(404).json({ error: 'Song not found' });

    try {
        const cleanTitle = (meta.title || '').replace(/\s*\([^)]*\)/g, '').trim();
        const q = encodeURIComponent(`${meta.artist} ${cleanTitle}`);
        const searchRes = await httpsGet(`https://lrclib.net/api/search?q=${q}`);
        
        const currentLyrics = db.prepare('SELECT content FROM lyrics_cache WHERE song_id = ?').get(songId);
        const currentContent = currentLyrics ? currentLyrics.content : null;

        const candidates = (searchRes || [])
            .filter(r => r.syncedLyrics || r.plainLyrics)
            .slice(0, 15)
            .map(r => ({
                trackId: r.id,
                trackName: r.trackName,
                artistName: r.artistName,
                albumName: r.albumName,
                duration: r.duration,
                hasSynced: !!r.syncedLyrics,
                isCurrent: currentContent && (r.syncedLyrics === currentContent || r.plainLyrics === currentContent)
            }));
        res.json(candidates);
    } catch (err) {
        console.error('[Discovery] lyrics-candidates error:', err.message);
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
});

// POST /api/discovery/lyrics-save  { songId, trackId }
// Fetches full track from LRCLIB and upserts into lyrics_cache
app.post('/api/discovery/lyrics-save', async (req, res) => {
    const { songId, trackId } = req.body;
    if (!songId || !trackId) return res.status(400).json({ error: 'Missing params' });

    try {
        const track = await httpsGet(`https://lrclib.net/api/get/${trackId}`);
        if (!track) return res.status(404).json({ error: 'Track not found on LRCLIB' });

        const isSynced = !!track.syncedLyrics;
        const content = track.syncedLyrics || track.plainLyrics;
        if (!content) return res.status(404).json({ error: 'No lyrics content' });

        db.prepare(`
            INSERT INTO lyrics_cache (song_id, synced, content, source, fetched_at)
            VALUES (?, ?, ?, 'lrclib_manual', ?)
            ON CONFLICT(song_id) DO UPDATE SET
                synced=excluded.synced,
                content=excluded.content,
                source='lrclib_manual',
                fetched_at=excluded.fetched_at
        `).run(songId, isSynced ? 1 : 0, content, Date.now());

        res.json({ success: true, synced: isSynced });
    } catch (err) {
        console.error('[Discovery] lyrics-save error:', err.message);
        res.status(500).json({ error: 'Failed to save lyrics' });
    }
});

const pkg = require('./package.json');

// GET /api/about - app metadata
app.get('/api/about', (req, res) => {
    const licenseFile = path.join(__dirname, 'LICENSE');
    let licenseName = 'Unknown';
    if (fs.existsSync(licenseFile)) {
        const content = fs.readFileSync(licenseFile, 'utf8');
        if (/\bMIT\b/i.test(content)) licenseName = 'MIT';
        else if (/\bApache\b/i.test(content)) licenseName = 'Apache-2.0';
        else if (/\bGNU GENERAL PUBLIC LICENSE\b/i.test(content) || /\bGPL\b/i.test(content)) licenseName = 'GPL-3.0';
        else licenseName = 'Custom';
    }
    res.json({
        version: pkg.version || '2.4.0',
        name: pkg.name || 'Baladio',
        description: pkg.description || 'A self-hosted, privacy-first local music player.',
        license: licenseName,
        repo: 'https://github.com/rxdwan/baladio',
        creator: 'rxdwan',
        vision: 'A premium, self-hosted music experience that respects your privacy — no accounts, no streaming, no tracking. Just your music, beautifully presented.'
    });
});

// GET /api/changelog - serve raw changelog
app.get('/api/changelog', (req, res) => {
    const changelogPath = path.join(__dirname, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
        res.type('text/plain').send(fs.readFileSync(changelogPath, 'utf8'));
    } else {
        res.status(404).send('');
    }
});

// GET /api/dev/status - check if dev mode is enabled
app.get('/api/dev/status', (req, res) => {
    // Only enabled on the local server machine
    res.json({ enabled: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});