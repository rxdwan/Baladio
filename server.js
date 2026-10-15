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

// Resolve ffmpeg binary path safely:
let ffmpegPath = ffmpegStatic;
if (ffmpegPath && typeof ffmpegPath === 'string' && ffmpegPath.includes('app.asar')) {
    const unpackedPath = ffmpegPath.replace('app.asar', 'app.asar.unpacked');
    if (fs.existsSync(unpackedPath)) {
        ffmpegPath = unpackedPath;
    }
}
if (ffmpegPath && fs.existsSync(ffmpegPath)) {
    if (process.platform !== 'win32') {
        try { fs.chmodSync(ffmpegPath, 0o755); } catch {}
    }
    ffmpeg.setFfmpegPath(ffmpegPath);
    // Prepend ffmpeg directory to PATH so yt-dlp and child processes can locate ffmpeg
    const ffmpegDir = path.dirname(ffmpegPath);
    process.env.PATH = ffmpegDir + path.delimiter + (process.env.PATH || '');
}

function getYtDlpExecutable() {
    if (process.env.BALADIO_USER_DATA_DIR) {
        const binName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
        const p = path.join(process.env.BALADIO_USER_DATA_DIR, 'bin', binName);
        if (fs.existsSync(p)) return p;
    }
    return 'yt-dlp';
}

function hasNodeRuntime() {
    try {
        const check = process.platform === 'win32' ? 'where' : 'which';
        require('child_process').execSync(`${check} node`, { stdio: 'ignore' });
        return true;
    } catch { return false; }
}

const app = express();

// Secure CORS: Restrict access strictly to local origins (Electron desktop app, localhost, 127.0.0.1)
const allowedOrigins = [
    /^http:\/\/localhost(:\d+)?$/,
    /^http:\/\/127\.0\.0\.1(:\d+)?$/
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (Electron desktop window, native same-origin requests)
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.some(re => re.test(origin));
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Cross-origin request blocked by Baladio security policy'));
        }
    },
    credentials: true
}));
app.use(express.json({ limit: '5mb' }));

// Cross-platform Baladio User Data (AppData) directory resolver:
// - Windows: %APPDATA%\Baladio (e.g. C:\Users\<user>\AppData\Roaming\Baladio)
// - macOS: ~/Library/Application Support/Baladio
// - Linux: ~/.config/Baladio (or $XDG_CONFIG_HOME/Baladio)
function getBaladioUserDataDir() {
    if (process.env.BALADIO_USER_DATA_DIR) {
        return process.env.BALADIO_USER_DATA_DIR;
    }
    const home = process.env.USERPROFILE || process.env.HOME || '';
    if (process.platform === 'win32') {
        const appData = process.env.APPDATA || (home ? path.join(home, 'AppData', 'Roaming') : '');
        return path.join(appData, 'Baladio');
    }
    if (process.platform === 'darwin') {
        return path.join(home, 'Library', 'Application Support', 'Baladio');
    }
    const xdgConfig = process.env.XDG_CONFIG_HOME || (home ? path.join(home, '.config') : '');
    return path.join(xdgConfig, 'Baladio');
}

function getSavedServerPort() {
    if (process.env.PORT) {
        const p = parseInt(process.env.PORT, 10);
        if (Number.isInteger(p) && p > 0 && p < 65536) return p;
    }
    const userDataDir = getBaladioUserDataDir();
    const possiblePaths = [
        path.join(userDataDir, 'server-config.json'),
        path.join(userDataDir, 'data', 'server-config.json'),
        path.join(__dirname, 'data', 'server-config.json')
    ].filter(Boolean);

    for (const file of possiblePaths) {
        try {
            if (fs.existsSync(file)) {
                const data = JSON.parse(fs.readFileSync(file, 'utf8'));
                if (data.port && Number.isInteger(data.port) && data.port > 0 && data.port < 65536) {
                    return data.port;
                }
            }
        } catch {}
    }
    return 3000;
}

let PORT = getSavedServerPort();

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

function getDefaultSongsDir() {
    if (process.env.BALADIO_SONGS_DIR) return process.env.BALADIO_SONGS_DIR;
    const home = process.env.USERPROFILE || process.env.HOME || '';
    if (process.platform === 'win32') {
        return path.join(home, 'Music', 'songs');
    }
    if (process.platform === 'darwin') {
        return path.join(home, 'Music', 'songs');
    }
    const musicDir = process.env.XDG_MUSIC_DIR || (home ? path.join(home, 'Music') : '');
    return path.join(musicDir, 'songs');
}

function getDefaultDataDir() {
    if (process.env.BALADIO_DATA_DIR) return process.env.BALADIO_DATA_DIR;
    return path.join(getBaladioUserDataDir(), 'data');
}

function getDefaultCoversDir() {
    if (process.env.BALADIO_COVERS_DIR) return process.env.BALADIO_COVERS_DIR;
    return path.join(getBaladioUserDataDir(), 'covers');
}

const USER_DATA_DIR      = getBaladioUserDataDir();
let SONGS_DIR            = getDefaultSongsDir();
const DATA_DIR           = getDefaultDataDir();
const COVERS_DIR         = getDefaultCoversDir();
const SONG_COVERS_DIR    = path.join(COVERS_DIR, 'songs');
const PLAYLIST_COVERS_DIR= path.join(COVERS_DIR, 'playlists');
const PLAYLISTS_FILE     = path.join(DATA_DIR, 'playlists.json');
const METADATA_FILE      = path.join(DATA_DIR, 'metadata.json');
const HISTORY_FILE       = path.join(DATA_DIR, 'history.json');

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Automatic migration from legacy project-local folders to AppData
function migrateLegacyData(sourceDir, targetDir) {
    if (!sourceDir || !fs.existsSync(sourceDir) || path.resolve(sourceDir) === path.resolve(targetDir)) return;
    let migratedCount = 0;
    try {
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        const files = fs.readdirSync(sourceDir);
        files.forEach(file => {
            const srcPath = path.join(sourceDir, file);
            const destPath = path.join(targetDir, file);
            const stat = fs.statSync(srcPath);
            if (stat.isFile()) {
                let shouldCopy = !fs.existsSync(destPath);
                if (!shouldCopy && file === 'baladio.db') {
                    const destStat = fs.statSync(destPath);
                    // Overwrite if destination is an empty/initial DB shell (< 64KB) and source has populated data
                    if (destStat.size < 65536 && stat.size > destStat.size) {
                        shouldCopy = true;
                        try { if (fs.existsSync(destPath + '-wal')) fs.unlinkSync(destPath + '-wal'); } catch {}
                        try { if (fs.existsSync(destPath + '-shm')) fs.unlinkSync(destPath + '-shm'); } catch {}
                    }
                }
                if (shouldCopy) {
                    fs.copyFileSync(srcPath, destPath);
                    migratedCount++;
                }
            } else if (stat.isDirectory()) {
                if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
                migrateLegacyData(srcPath, destPath);
            }
        });
    } catch (e) {
        console.warn('[Migration] Note:', e.message);
    }
    if (migratedCount > 0) {
        console.log(`[Migration] Migrated ${migratedCount} item(s) from ${sourceDir} → ${targetDir}`);
    }
}

// Migrate any legacy data or covers from project directory to OS AppData
const potentialLegacySources = [
    // 1. Direct project directory if running unbundled
    !__dirname.includes('app.asar') ? { data: path.join(__dirname, 'data'), covers: path.join(__dirname, 'covers') } : null,
    // 2. Standard user Music folder if development repository was at Music/music_player
    {
        data: path.join(process.env.USERPROFILE || process.env.HOME || '', 'Music', 'music_player', 'data'),
        covers: path.join(process.env.USERPROFILE || process.env.HOME || '', 'Music', 'music_player', 'covers')
    }
].filter(Boolean);

for (const legacy of potentialLegacySources) {
    if (fs.existsSync(legacy.data) && path.resolve(DATA_DIR) !== path.resolve(legacy.data)) {
        migrateLegacyData(legacy.data, DATA_DIR);
    }
    if (fs.existsSync(legacy.covers) && path.resolve(COVERS_DIR) !== path.resolve(legacy.covers)) {
        migrateLegacyData(legacy.covers, COVERS_DIR);
    }
}

// Cross-platform safe path containment check (case-insensitive on Windows, case-sensitive on POSIX)
function isPathWithin(targetPath, parentDir) {
    if (!targetPath || !parentDir) return false;
    const resolvedTarget = path.resolve(targetPath);
    const resolvedParent = path.resolve(parentDir);
    if (process.platform === 'win32') {
        return resolvedTarget.toLowerCase().startsWith(resolvedParent.toLowerCase());
    }
    return resolvedTarget.startsWith(resolvedParent);
}

// Ensure directories exist
[SONGS_DIR, COVERS_DIR, SONG_COVERS_DIR, PLAYLIST_COVERS_DIR, DATA_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('[BOOT] Storage paths:');
console.log('  Songs:           ', SONGS_DIR);
console.log('  Data:            ', DATA_DIR);
console.log('  Covers:          ', COVERS_DIR);
console.log('    Song covers:   ', SONG_COVERS_DIR);
console.log('    Playlist covers:', PLAYLIST_COVERS_DIR);

console.log('[BOOT] Initializing SQLite database & migrating schema...');
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
    CREATE TABLE IF NOT EXISTS audio_normalization (
        song_id     TEXT PRIMARY KEY,
        lufs_offset REAL NOT NULL,
        measured_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS app_settings (
        key   TEXT PRIMARY KEY,
        value TEXT
    );
`);

// Load persisted songs_dir from SQLite database if set
try {
    const row = db.prepare("SELECT value FROM app_settings WHERE key = 'songs_dir'").get();
    if (row && row.value && typeof row.value === 'string' && row.value.trim()) {
        const customDir = path.resolve(row.value.trim());
        if (!fs.existsSync(customDir)) {
            try { fs.mkdirSync(customDir, { recursive: true }); } catch (e) {}
        }
        if (fs.existsSync(customDir)) {
            SONGS_DIR = customDir;
            console.log('[BOOT] Loaded custom songs_dir from SQLite database:', SONGS_DIR);
        }
    }
} catch (e) {
    console.warn('[BOOT] Could not read app_settings for songs_dir:', e.message);
}

// Add lufs_offset column if it doesn't exist yet (safe to run every boot)
try { db.exec('ALTER TABLE metadata ADD COLUMN lufs_offset REAL'); } catch(e) { /* already exists */ }
try { db.exec("ALTER TABLE metadata ADD COLUMN cover_source TEXT DEFAULT NULL"); } catch(e) { /* already exists */ }
try { db.exec('ALTER TABLE metadata ADD COLUMN cover_reverted INTEGER DEFAULT 0'); } catch(e) { /* already exists */ }

// One-time migration of any existing offsets from metadata to permanent audio_normalization table
try {
    db.exec(`
        INSERT OR IGNORE INTO audio_normalization (song_id, lufs_offset, measured_at)
        SELECT song_id, lufs_offset, ${Date.now()}
        FROM metadata
        WHERE lufs_offset IS NOT NULL;
    `);
} catch(e) {}


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
            coverSource: row.cover_source || null,
            coverReverted: !!row.cover_reverted
        };
    }
    return map;
}


function saveMetadataData(data) {
    const stmt = db.prepare(`
        INSERT INTO metadata (song_id, filename, title, artist, has_custom_cover, ignore_id3_cover, cover_source, cover_reverted)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(song_id) DO UPDATE SET
            filename = excluded.filename,
            title = excluded.title,
            artist = excluded.artist,
            has_custom_cover = excluded.has_custom_cover,
            ignore_id3_cover = excluded.ignore_id3_cover,
            cover_source = excluded.cover_source,
            cover_reverted = excluded.cover_reverted
    `);
    db.transaction(() => {
        for (const [uuid, entry] of Object.entries(data)) {
            stmt.run(uuid, entry.filename, entry.title, entry.artist, entry.hasCustomCover ? 1 : 0, entry.ignoreID3Cover ? 1 : 0, entry.coverSource || null, entry.coverReverted ? 1 : 0);
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

// Configure Multer for cover uploads - strictly validates song UUID and MIME type
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(SONG_COVERS_DIR)) {
            try { fs.mkdirSync(SONG_COVERS_DIR, { recursive: true }); } catch (e) {}
        }
        cb(null, SONG_COVERS_DIR);
    },
    filename: (req, file, cb) => {
        const songId = req.body.id;
        if (!songId || !UUID_RE.test(songId)) return cb(new Error('Invalid song ID: UUID required'));
        cb(null, `${songId}.jpg`);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (_req, file, cb) => {
        if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are permitted'));
    }
});

function isValidImageFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) return false;
        const fd = fs.openSync(filePath, 'r');
        const buffer = Buffer.alloc(12);
        fs.readSync(fd, buffer, 0, 12, 0);
        fs.closeSync(fd);
        // JPEG: FF D8 FF
        const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
        // PNG: 89 50 4E 47 0D 0A 1A 0A
        const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
        // WebP: RIFF....WEBP
        const isWebp = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
        return isJpeg || isPng || isWebp;
    } catch {
        return false;
    }
}

// Persistent LUFS Normalization in SQLite (survives restarts, scans strictly once per song)
function getStoredLufsOffset(uuid) {
    if (!uuid) return null;
    try {
        const row = db.prepare('SELECT lufs_offset FROM audio_normalization WHERE song_id = ?').get(uuid);
        if (row && typeof row.lufs_offset === 'number' && isFinite(row.lufs_offset)) {
            return row.lufs_offset;
        }
    } catch {}
    return null;
}

function saveLufsOffset(uuid, offset) {
    if (!uuid || typeof offset !== 'number' || !isFinite(offset)) return;
    try {
        db.prepare(`
            INSERT INTO audio_normalization (song_id, lufs_offset, measured_at)
            VALUES (?, ?, ?)
            ON CONFLICT(song_id) DO UPDATE SET
                lufs_offset = excluded.lufs_offset,
                measured_at = excluded.measured_at
        `).run(uuid, offset, Date.now());

        // Also sync to metadata table for backward compatibility
        try {
            db.prepare('UPDATE metadata SET lufs_offset = ? WHERE song_id = ?').run(offset, uuid);
        } catch {}
    } catch (err) {
        console.error('[lufs] Failed to save offset to DB:', err.message);
    }
}

// Background LUFS scan queue - Map<uuid, filePath> so each song is only queued once
const _lufsQueue = new Map();
let _lufsWorkerRunning = false;

function scheduleLufsScan(uuid, filePath) {
    if (!uuid || !filePath) return;
    // Guaranteed one-time scan: if already stored in SQLite DB, never queue or scan again
    if (getStoredLufsOffset(uuid) !== null) return;
    if (_lufsQueue.has(uuid)) return; // already queued in-memory
    _lufsQueue.set(uuid, filePath);
    if (!_lufsWorkerRunning) runLufsWorker();
}

async function runLufsWorker() {
    _lufsWorkerRunning = true;
    while (_lufsQueue.size > 0) {
        const [uuid, filePath] = _lufsQueue.entries().next().value;
        _lufsQueue.delete(uuid);

        // Double-check persistent DB in case it was normalized in the meantime
        const existingOffset = getStoredLufsOffset(uuid);
        if (existingOffset !== null) {
            console.log(`[lufs] Skip ${uuid} - already normalized (${existingOffset.toFixed(2)} dB)`);
            continue;
        }

        try {
            const offset = await measureLufs(filePath);
            if (offset !== null) {
                saveLufsOffset(uuid, offset);
                console.log(`[lufs] Scanned & permanently normalized ${path.basename(filePath)}: offset ${offset.toFixed(2)} dB`);
            }
        } catch(e) {
            console.error('[lufs] Scan failed for', filePath, e.message);
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
                // New file added after migration - assign UUID on-the-fly
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

            // Resolve lufsOffset:
            // 1. Check persistent SQLite audio_normalization table (survives restarts, 100% durable)
            let lufsOffset = getStoredLufsOffset(uuid);

            // 2. If not stored, check if the audio file has embedded ReplayGain/LUFS tags
            if (lufsOffset === null && _lufsOffsetFromTag !== null) {
                lufsOffset = _lufsOffsetFromTag;
                saveLufsOffset(uuid, lufsOffset);
            }

            // 3. Fall back to metadata table (if present from legacy DB)
            if (lufsOffset === null) {
                const dbRow = db.prepare('SELECT lufs_offset FROM metadata WHERE song_id = ?').get(uuid);
                if (dbRow && typeof dbRow.lufs_offset === 'number' && isFinite(dbRow.lufs_offset)) {
                    lufsOffset = dbRow.lufs_offset;
                    saveLufsOffset(uuid, lufsOffset);
                }
            }

            // 4. If still not normalized, queue a single one-time background ffmpeg measurement
            if (lufsOffset === null) {
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

// GET /stream/:id - UUID-based, safely streams music file within SONGS_DIR
app.get('/stream/:id', (req, res) => {
    const id = req.params.id;
    if (!id || typeof id !== 'string' || !UUID_RE.test(id)) {
        return res.status(400).send('Invalid song ID');
    }
    const metadataData = getMetadataData();
    const songMeta = metadataData[id];

    if (!songMeta || !songMeta.filename) {
        return res.status(404).send('Song not found');
    }

    const safeFilename = path.basename(songMeta.filename);
    const filePath = path.resolve(SONGS_DIR, safeFilename);

    if (!isPathWithin(filePath, SONGS_DIR) || !fs.existsSync(filePath)) {
        return res.status(404).send('File not found on disk');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const ext = path.extname(safeFilename).toLowerCase();
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

// Helper: resolve bundled default cover image path (works in both dev and packaged ASAR builds)
function resolveBuiltInDefaultCover() {
    // Dev mode: public/assets/default_song_cover.jpg lives alongside server.js
    const devPath = path.join(__dirname, 'public', 'assets', 'default_song_cover.jpg');
    if (fs.existsSync(devPath)) return devPath;
    // Packaged Electron: server.js runs as ELECTRON_RUN_AS_NODE, so ASAR is not transparent to fs.
    // electron-builder unpacks files matching asarUnpack into app.asar.unpacked/
    const unpackedPath = devPath.replace('app.asar', 'app.asar.unpacked');
    if (unpackedPath !== devPath && fs.existsSync(unpackedPath)) return unpackedPath;
    return null;
}
const BUNDLED_DEFAULT_COVER = resolveBuiltInDefaultCover();

// Helper: send default cover image
function sendDefaultCover(res) {
    // 1. User-uploaded custom default cover (in AppData covers dir)
    const customDefaultCover = path.join(COVERS_DIR, 'custom_default_cover.jpg');
    if (fs.existsSync(customDefaultCover)) {
        return res.sendFile(customDefaultCover);
    }
    // 2. Bundled default cover shipped with the app
    if (BUNDLED_DEFAULT_COVER) {
        return res.sendFile(BUNDLED_DEFAULT_COVER);
    }
    // 3. Last resort: 1x1 transparent PNG
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
const uploadDefaultCover = multer({
    storage: defaultCoverStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are permitted'));
    }
});

// POST /api/default-cover
app.post('/api/default-cover', uploadDefaultCover.single('cover'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    if (!isValidImageFile(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch(e) {}
        return res.status(400).json({ error: 'Security violation: uploaded file is not a valid image' });
    }
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


// GET /api/cover/:id - :id validated against alphanumeric identifier
app.get('/api/cover/:id', async (req, res) => {
    const id = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!id) return sendDefaultCover(res);

    const onlineOnly = req.query.onlineOnly === '1';
    const sourceOnly = req.query.source; // 'id3', etc.

    const userCoverPath = path.join(SONG_COVERS_DIR, `${id}.jpg`);
    const itunesCoverPath = path.join(SONG_COVERS_DIR, `${id}_itunes.jpg`);

    if (onlineOnly) {
        if (fs.existsSync(itunesCoverPath)) return res.sendFile(itunesCoverPath);
        return sendDefaultCover(res);
    }

    // Normal flow: custom user cover > itunes cover > ID3 tag > default
    // If source=id3 is specified, bypass disk covers (user and itunes) to preview the raw embedded/default cover
    if (sourceOnly !== 'id3') {
        // 1. Check custom user cover
        if (fs.existsSync(userCoverPath)) return res.sendFile(userCoverPath);
        
        // 2. Check iTunes cover
        if (fs.existsSync(itunesCoverPath)) return res.sendFile(itunesCoverPath);
    }

    // 3. Look up filename from metadata
    const metadataData = getMetadataData();
    const songMeta = metadataData[id];
    if (!songMeta || !songMeta.filename) {
        return sendDefaultCover(res);
    }
    const safeFilename = path.basename(songMeta.filename);

    if (songMeta.ignoreID3Cover && sourceOnly !== 'id3') {
        return sendDefaultCover(res);
    }

    const filePath = path.resolve(SONGS_DIR, safeFilename);
    if (!isPathWithin(filePath, SONGS_DIR) || !fs.existsSync(filePath)) {
        return sendDefaultCover(res);
    }

    // 3. Try embedded cover from MP3 ID3 tags
    if (safeFilename.toLowerCase().endsWith('.mp3')) {
        try {
            const metadata = await mm.parseFile(filePath);
            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const picture = metadata.common.picture[0];
                res.set('Content-Type', picture.format);
                return res.send(picture.data);
            }
        } catch (err) {}
        return sendDefaultCover(res);
    } else if (safeFilename.toLowerCase().endsWith('.mp4')) {
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

// GET /api/settings/songs-folder
app.get('/api/settings/songs-folder', (req, res) => {
    res.json({
        songsDir: SONGS_DIR,
        defaultSongsDir: getDefaultSongsDir()
    });
});

// POST /api/settings/songs-folder - persists custom songs folder in SQLite database
app.post('/api/settings/songs-folder', (req, res) => {
    let { songsDir } = req.body;
    if (!songsDir || typeof songsDir !== 'string' || !songsDir.trim()) {
        return res.status(400).json({ error: 'Folder path is required' });
    }
    songsDir = path.resolve(songsDir.trim());
    if (!fs.existsSync(songsDir)) {
        try {
            fs.mkdirSync(songsDir, { recursive: true });
        } catch (err) {
            return res.status(400).json({ error: `Cannot access or create folder: ${err.message}` });
        }
    }
    try {
        db.prepare(`
            INSERT INTO app_settings (key, value)
            VALUES ('songs_dir', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).run(songsDir);
        SONGS_DIR = songsDir;
        console.log('[SETTINGS] Updated songs_dir in SQLite database to:', SONGS_DIR);
        res.json({ success: true, songsDir: SONGS_DIR });
    } catch (err) {
        console.error('[SETTINGS] Failed to save songs_dir to DB:', err);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/save-settings - accepts `id` (UUID) instead of `filename`
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

// POST /api/upload-cover - body now sends `id` (UUID)
app.post('/api/upload-cover', upload.single('cover'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    if (!isValidImageFile(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch(e) {}
        return res.status(400).json({ error: 'Security violation: uploaded file is not a valid image' });
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


// DELETE /api/cover/:id - :id sanitized
app.delete('/api/cover/:id', (req, res) => {
    const id = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!id) return res.status(400).json({ error: 'Invalid song ID' });
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

// DELETE /api/itunes-cover/:id - :id sanitized
app.delete('/api/itunes-cover/:id', (req, res) => {
    const id = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!id) return res.status(400).json({ error: 'Invalid song ID' });
    const metadataData = getMetadataData();
    
    const itunesCoverPath = path.join(SONG_COVERS_DIR, `${id}_itunes.jpg`);
    if (fs.existsSync(itunesCoverPath)) {
        fs.unlinkSync(itunesCoverPath);
    }

    // Permanently mark as reverted - auto-fetch will skip this song forever
    metadataData[id] = metadataData[id] || {};
    metadataData[id].coverSource = null;
    metadataData[id].coverReverted = true;
    saveMetadataData(metadataData);

    res.json({ success: true });
});

// GET /api/song-normalization/:id - get persisted LUFS offset for a song
app.get('/api/song-normalization/:id', (req, res) => {
    const id = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!id) return res.status(400).json({ error: 'Valid song ID required' });
    const offset = getStoredLufsOffset(id);
    res.json({ id, lufsOffset: offset });
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
    destination: (req, file, cb) => {
        if (!fs.existsSync(PLAYLIST_COVERS_DIR)) {
            try { fs.mkdirSync(PLAYLIST_COVERS_DIR, { recursive: true }); } catch (e) {}
        }
        cb(null, PLAYLIST_COVERS_DIR);
    },
    filename: (req, file, cb) => {
        const safeId = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
        if (!safeId) return cb(new Error('Invalid playlist ID'));
        cb(null, `playlist_${safeId}.jpg`);
    }
});
const uploadPlaylistCover = multer({
    storage: playlistCoverStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are permitted'));
    }
});

app.post('/api/playlist-cover/:id', uploadPlaylistCover.single('cover'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    if (!isValidImageFile(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch(e) {}
        return res.status(400).json({ error: 'Security violation: uploaded file is not a valid image' });
    }
    const playlistId = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!playlistId) return res.status(400).send('playlistId required');
    const playlists = getPlaylistsData();
    const pl = playlists.find(p => p.id === playlistId);
    if (pl) { pl.hasCover = true; savePlaylistsData(playlists); }
    res.json({ success: true });
});

// GET /api/playlist-cover/:id
app.get('/api/playlist-cover/:id', (req, res) => {
    const safeId = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!safeId) return sendDefaultCover(res);
    const coverPath = path.join(PLAYLIST_COVERS_DIR, `playlist_${safeId}.jpg`);
    if (fs.existsSync(coverPath)) return res.sendFile(coverPath);
    sendDefaultCover(res);
});

// DELETE /api/playlist-cover/:id
app.delete('/api/playlist-cover/:id', (req, res) => {
    const safeId = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!safeId) return res.status(400).json({ error: 'Invalid playlist ID' });
    const coverPath = path.join(PLAYLIST_COVERS_DIR, `playlist_${safeId}.jpg`);
    if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
    const playlists = getPlaylistsData();
    const pl = playlists.find(p => p.id === safeId);
    if (pl) { pl.hasCover = false; savePlaylistsData(playlists); }
    res.json({ success: true });
});

// POST /api/rename-file - renames the actual file safely within SONGS_DIR
app.post('/api/rename-file', async (req, res) => {
    const { id } = req.body;
    if (!id || typeof id !== 'string' || !UUID_RE.test(id)) return res.status(400).json({ error: 'Valid song UUID required' });

    const metadataData = getMetadataData();
    const songMeta = metadataData[id];
    if (!songMeta || !songMeta.filename) return res.status(404).json({ error: 'Song not found' });

    const filename = path.basename(songMeta.filename);
    const filePath = path.resolve(SONGS_DIR, filename);
    if (!isPathWithin(filePath, SONGS_DIR) || !fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });

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

    const sanitize = s => {
        const clean = path.basename((s || '').replace(/[\/\\?%*:|"><]/g, '-').trim());
        return clean.replace(/^\.+/, '');
    };
    const knownArtist = artist && artist.trim() && artist.trim().toLowerCase() !== 'unknown artist';
    const cleanTitle = sanitize(title) || 'track';
    const cleanArtist = sanitize(artist);
    const newBase = (knownArtist && cleanArtist)
        ? `${cleanArtist} - ${cleanTitle}${ext}`
        : `${cleanTitle}${ext}`;
    if (newBase === filename) return res.json({ success: true, newFilename: filename, unchanged: true });

    let newFilename = newBase;
    let counter = 1;
    while (fs.existsSync(path.join(SONGS_DIR, newFilename))) {
        const base = (knownArtist && cleanArtist) ? `${cleanArtist} - ${cleanTitle}` : cleanTitle;
        newFilename = `${base} (${counter++})${ext}`;
    }

    const destPath = path.resolve(SONGS_DIR, newFilename);
    if (!isPathWithin(destPath, SONGS_DIR)) {
        return res.status(400).json({ error: 'Invalid destination path' });
    }

    fs.renameSync(filePath, destPath);

    // Cover image stays named by UUID - no rename needed!
    // Just update the filename field in metadata
    metadataData[id].filename = newFilename;
    saveMetadataData(metadataData);

    // Playlists store UUIDs now - no update needed!

    // History entries use UUID - no update needed!

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

// POST /api/history - append one entry
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
    
    // Check today first
    let start = checkDay.getTime();
    let end = start + dayMs;
    let c = streakStmt.get(start, end).c;
    
    if (c > 0) {
        streak++;
    }
    
    // Now keep going backward day by day
    checkDay = new Date(start - dayMs);
    while (true) {
        start = checkDay.getTime();
        end = start + dayMs;
        c = streakStmt.get(start, end).c;
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
            headers: { 'User-Agent': 'Baladio/3.0.0 (https://github.com/rxdwan/baladio)' },
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
            headers: { 'User-Agent': 'Baladio/3.0.0 (https://github.com/rxdwan/baladio)' },
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

// POST /api/fetch-cover - fetch cover from iTunes for songs missing one
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

            // Pick best match - prioritise results where artist name matches
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

app.post('/api/lyrics/upload/:songId', express.json(), (req, res) => {
    const songId = req.params.songId;
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, error: 'No content provided' });

    try {
        db.prepare(`
            INSERT INTO lyrics_cache (song_id, synced, content, source, fetched_at)
            VALUES (?, 1, ?, 'local_upload', ?)
            ON CONFLICT(song_id) DO UPDATE SET synced=1, content=excluded.content, source='local_upload', fetched_at=excluded.fetched_at
        `).run(songId, content, Date.now());
        res.json({ success: true });
    } catch (e) {
        console.error('Lyrics upload failed:', e);
        res.status(500).json({ success: false, error: e.message });
    }
});

app.get('/api/lyrics/:songId', async (req, res) => {
    const songId = req.params.songId;
    const meta = db.prepare('SELECT title, artist FROM metadata WHERE song_id = ?').get(songId);
    if (!meta) return res.status(404).json({ status: 'not_found' });

    // 2. Cache (from a previous LRCLIB fetch or user confirmation or manual upload)
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
    let q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing query' });
    // Prevent argument injection by stripping leading CLI flags and limiting query length
    q = q.replace(/^-+/, '').slice(0, 150);

    try {
        const results = await new Promise((resolve, reject) => {
            const ytDlpCmd = getYtDlpExecutable();
            const args = [
                `ytsearch10:${q}`,
                '--dump-json',
                '--flat-playlist',
                '--no-playlist',
                '--no-warnings',
                '--ignore-errors',
            ];
            if (hasNodeRuntime()) {
                args.push('--js-runtimes', 'node');
            }
            const proc = spawn(ytDlpCmd, args);
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
                if (code !== 0 && !stdout) return reject(new Error(stderr.trim() || 'yt-dlp error'));
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
app.post('/api/discovery/download', (req, res) => {
    const { videoId, title } = req.body;
    // Strictly validate YouTube video ID format (11 base64url characters)
    if (!videoId || typeof videoId !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return res.status(400).json({ error: 'Invalid YouTube video ID format' });
    }

    res.setHeader('Content-Type', 'application/x-ndjson');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const outputTemplate = path.join(SONGS_DIR, '%(title)s.%(ext)s');

    const ytDlpCmd = getYtDlpExecutable();
    const args = [
        url,
        '-x',
        '-f', 'bestaudio/best',
        '--audio-format', 'mp3',
        '--audio-quality', '0',
        '--embed-thumbnail',
        '--add-metadata',
        '--no-playlist',
        '--no-warnings',
        '--ignore-errors',
        '--no-keep-video',
        '-o', outputTemplate,
        '--newline'
    ];

    if (ffmpegPath && fs.existsSync(ffmpegPath)) {
        args.push('--ffmpeg-location', ffmpegPath);
    }
    if (hasNodeRuntime()) {
        args.push('--js-runtimes', 'node');
    }

    const proc = spawn(ytDlpCmd, args);
    let stderr = '';
    let isFinished = false;

    // Timeout safety
    const timeoutId = setTimeout(() => {
        if (isFinished) return;
        proc.kill('SIGKILL');
        res.write(JSON.stringify({ success: false, error: 'Download timed out' }) + '\n');
        res.end();
    }, 180000);

    proc.stdout.on('data', data => {
        const text = data.toString();
        const match = text.match(/\[download\]\s+([\d\.]+)%/);
        if (match) {
            res.write(JSON.stringify({ progress: parseFloat(match[1]) }) + '\n');
        }
    });

    proc.stderr.on('data', data => stderr += data.toString());

    proc.on('close', code => {
        isFinished = true;
        clearTimeout(timeoutId);
        if (code === 0) {
            res.write(JSON.stringify({ success: true, filename: `${title}.mp3` }) + '\n');
            res.end();
        } else {
            res.write(JSON.stringify({ success: false, error: stderr.trim() || `yt-dlp exited with code ${code}` }) + '\n');
            res.end();
        }
    });

    proc.on('error', err => {
        isFinished = true;
        clearTimeout(timeoutId);
        res.write(JSON.stringify({ success: false, error: err.message }) + '\n');
        res.end();
    });
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

// GET /api/version - fast endpoint for app version (reads package.json)
app.get('/api/version', (req, res) => {
    res.json({ version: pkg.version || '3.0.0' });
});

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
        version: pkg.version || '3.0.0',
        name: pkg.name || 'Baladio',
        description: pkg.description || 'A self-hosted, privacy-first local music player.',
        license: licenseName,
        repo: 'https://github.com/rxdwan/baladio',
        creator: 'rxdwan',
        vision: 'A premium, self-hosted music experience that respects your privacy - no accounts, no streaming, no tracking. Just your music, beautifully presented.'
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
    res.json({ enabled: true });
});

// POST /api/server/shutdown - Graceful shutdown for desktop app
app.post('/api/server/shutdown', (req, res) => {
    res.json({ ok: true, message: 'Server shutting down' });
    setTimeout(() => {
        try { if (db && db.close) db.close(); } catch(e) {}
        console.log('[Server] Graceful shutdown complete.');
        process.exit(0);
    }, 200);
});

console.log('[BOOT] Mounting API endpoints & audio streaming...');

function saveServerPort(port) {
    try {
        const targetPath = path.join(USER_DATA_DIR, 'server-config.json');
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(targetPath, JSON.stringify({ port }, null, 2));
    } catch (e) {
        console.warn('[Baladio] Failed to save server port:', e.message);
    }
}

function startListening(targetPort) {
    const srv = app.listen(targetPort, () => {
        PORT = targetPort;
        console.log(`[BOOT] Baladio server ready on port ${PORT}`);
        console.log(`Server running on http://localhost:${PORT}`);
    });

    srv.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`[BOOT] Port ${targetPort} is occupied by another application. Permanently assigning next port...`);
            const nextPort = targetPort + 1;
            saveServerPort(nextPort);
            startListening(nextPort);
        } else {
            console.error('[Server Error]', err);
        }
    });
}

startListening(PORT);