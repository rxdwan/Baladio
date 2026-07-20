console.clear(); // Clear old logs on every server restart
console.log('🎵 Lofi Beats server starting...');
const express = require('express');
const fs = require('fs');
const path = require('path');
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
const COVERS_DIR         = path.join(__dirname, 'covers');          // inside codebase
const SONG_COVERS_DIR    = path.join(COVERS_DIR, 'songs');
const PLAYLIST_COVERS_DIR= path.join(COVERS_DIR, 'playlists');
const DATA_DIR           = path.join(__dirname, 'data');
const PLAYLISTS_FILE     = path.join(DATA_DIR, 'playlists.json');
const METADATA_FILE      = path.join(DATA_DIR, 'metadata.json');
const HISTORY_FILE       = path.join(DATA_DIR, 'history.json');

// Ensure directories exist
[SONGS_DIR, COVERS_DIR, SONG_COVERS_DIR, PLAYLIST_COVERS_DIR, DATA_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Initialize files
if (!fs.existsSync(HISTORY_FILE)) fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(PLAYLISTS_FILE)) fs.writeFileSync(PLAYLISTS_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(METADATA_FILE)) fs.writeFileSync(METADATA_FILE, JSON.stringify({}, null, 2));

function getHistoryData() { try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8')); } catch(e) { return []; } }
function saveHistoryData(data) { fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2)); }

function getPlaylistsData() { try { return JSON.parse(fs.readFileSync(PLAYLISTS_FILE, 'utf-8')); } catch(e) { return []; } }
function savePlaylistsData(data) { fs.writeFileSync(PLAYLISTS_FILE, JSON.stringify(data, null, 2)); }

function getMetadataData() { try { return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8')); } catch(e) { return {}; } }
function saveMetadataData(data) { fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2)); }

app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for cover uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SONG_COVERS_DIR);
    },
    filename: (req, file, cb) => {
        const songFilename = req.body.filename;
        if (!songFilename) return cb(new Error('No filename provided'));
        cb(null, `${songFilename}.jpg`);
    }
});
const upload = multer({ storage });

// GET /api/library
app.get('/api/library', async (req, res) => {
    try {
        const files = fs.readdirSync(SONGS_DIR);
        const musicFiles = files.filter(f => f.toLowerCase().endsWith('.mp3') || f.toLowerCase().endsWith('.mp4'));
        const metadataData = getMetadataData();
        const results = [];

        for (const file of musicFiles) {
            const filePath = path.join(SONGS_DIR, file);
            const ext = path.extname(file).toLowerCase().replace('.', '');
            const stats = fs.statSync(filePath);
            
            let title = file;
            let artist = 'Unknown Artist';
            let duration = 0;
            
            try {
                const metadata = await mm.parseFile(filePath);
                title = metadata.common.title || file;
                artist = metadata.common.artist || 'Unknown Artist';
                duration = metadata.format.duration || 0;
            } catch (err) {
                console.error(`Error parsing metadata for ${file}:`, err.message);
            }

            // Override with custom metadata if exists
            if (metadataData[file]) {
                if (metadataData[file].title) title = metadataData[file].title;
                if (metadataData[file].artist) artist = metadataData[file].artist;
            }

            // Check if custom cover exists
            const customCoverPath = path.join(SONG_COVERS_DIR, `${file}.jpg`);
            const hasCustomCover = fs.existsSync(customCoverPath);

            results.push({
                filename: file,
                title,
                artist,
                duration,
                type: ext,
                hasCustomCover,
                size: stats.size
            });
        }
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scan library' });
    }
});

// GET /stream/:filename
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
    const defaultCover = path.join(COVERS_DIR, 'default_song_cover.jpg'); // in covers/ root
    if (fs.existsSync(defaultCover)) {
        return res.sendFile(defaultCover);
    }
    // If no file exists, return a 1x1 transparent PNG placeholder
    const placeholder = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    res.set('Content-Type', 'image/png');
    return res.send(placeholder);
}

// GET /api/cover/default — explicit default cover endpoint
app.get('/api/cover/default', (req, res) => {
    const theme = req.query.theme || 'dark';
    sendDefaultCover(res);
});

// GET /api/cover/:filename
app.get('/api/cover/:filename', async (req, res) => {
    const filename = req.params.filename;
    const theme = req.query.theme || 'dark';

    // 1. Check custom cover in covers/songs/
    const customCoverPath = path.join(SONG_COVERS_DIR, `${filename}.jpg`);
    if (fs.existsSync(customCoverPath)) {
        return res.sendFile(customCoverPath);
    }

    const filePath = path.join(SONGS_DIR, filename);
    if (!fs.existsSync(filePath)) {
        return sendDefaultCover(res);
    }

    // 2. Try embedded cover from MP3 ID3 tags
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
        const command = ffmpeg(filePath)
            .screenshots({
                timestamps: [0],
                size: '320x240',
                folder: SONG_COVERS_DIR,
                filename: `${filename}_temp.jpg`
            });
            
        command.on('end', () => {
            const tempCover = path.join(SONG_COVERS_DIR, `${filename}_temp.jpg`);
            if (fs.existsSync(tempCover)) {
                res.sendFile(tempCover, {}, (err) => {
                    // Cleanup temp file after sending
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

// POST /api/save-settings
app.post('/api/save-settings', (req, res) => {
    const { filename, newTitle, newArtist } = req.body;
    if (!filename) return res.status(400).send('Filename is required');

    const metadataData = getMetadataData();
    metadataData[filename] = {
        title: newTitle,
        artist: newArtist
    };
    saveMetadataData(metadataData);

    const filePath = path.join(SONGS_DIR, filename);
    if (fs.existsSync(filePath)) {
        if (filename.toLowerCase().endsWith('.mp3')) {
            const tags = { title: newTitle, artist: newArtist };
            NodeID3.update(tags, filePath);
        } else if (filename.toLowerCase().endsWith('.mp4')) {
            // MP4 metadata is stored in library.json (customMetadata) above.
            // Mutating the file with ffmpeg while it may be actively streamed
            // causes Windows file-lock errors, so we skip the file rewrite.
        }
    }

    res.json({ success: true });
});

// POST /api/upload-cover
app.post('/api/upload-cover', upload.single('cover'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    // Update library to trigger refresh on frontend
    const metadataData = getMetadataData();
    metadataData[req.body.filename] = metadataData[req.body.filename] || {};
    metadataData[req.body.filename].hasCustomCover = true;
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
    // Safety net: append any playlists not present in `order` so none get lost
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

app.post('/api/rename-file', async (req, res) => {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'filename required' });
    const filePath = path.join(SONGS_DIR, filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
    const ext = path.extname(filename);
    const metadataData = getMetadataData();
    const custom = metadataData[filename] || {};
    let title = custom.title, artist = custom.artist;
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
    const oldCover = path.join(SONG_COVERS_DIR, `${filename}.jpg`);
    const newCover = path.join(SONG_COVERS_DIR, `${newFilename}.jpg`);
    if (fs.existsSync(oldCover)) fs.renameSync(oldCover, newCover);
    if (metadataData[filename]) {
        metadataData[newFilename] = metadataData[filename];
        delete metadataData[filename];
    }
    saveMetadataData(metadataData);
    const playlists = getPlaylistsData();
    playlists.forEach(pl => {
        pl.songs = pl.songs.map(f => f === filename ? newFilename : f);
    });
    savePlaylistsData(playlists);
    // Migrate history entries so play counts are preserved after rename
    try {
        const history = getHistoryData();
        let historyChanged = false;
        history.forEach(entry => {
            if (entry.filename === filename) {
                entry.filename = newFilename;
                historyChanged = true;
            }
        });
        if (historyChanged) saveHistoryData(history);
    } catch(e) { console.warn('History migration failed:', e.message); }
    res.json({ success: true, newFilename, oldFilename: filename });
});

// GET /api/history
app.get('/api/history', (req, res) => {
    res.json(getHistoryData());
});

// POST /api/history — append one entry
app.post('/api/history', (req, res) => {
    const entry = req.body;
    if (!entry || !entry.filename) return res.status(400).json({ error: 'entry required' });
    const history = getHistoryData();
    history.unshift(entry);
    // Keep max 5000 entries server-side (no cap was too risky)
    if (history.length > 5000) history.length = 5000;
    saveHistoryData(history);
    res.json({ success: true });
});

// POST /api/history/migrate — one-time bulk import from localStorage
app.post('/api/history/migrate', (req, res) => {
    const { entries } = req.body;
    if (!Array.isArray(entries)) return res.status(400).json({ error: 'entries array required' });
    const existing = getHistoryData();
    // Deduplicate by playedAt timestamp
    const existingTimes = new Set(existing.map(e => e.playedAt));
    const fresh = entries.filter(e => e.playedAt && !existingTimes.has(e.playedAt));
    const merged = [...fresh, ...existing].sort((a, b) => b.playedAt - a.playedAt);
    if (merged.length > 5000) merged.length = 5000;
    saveHistoryData(merged);
    res.json({ success: true, imported: fresh.length, total: merged.length });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});