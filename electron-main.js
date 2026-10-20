'use strict';

const {
    app, BrowserWindow, shell, Menu, Tray,
    nativeImage, ipcMain, dialog, Notification, session, screen
} = require('electron');
const path  = require('path');
const { spawn } = require('child_process');
const fs_   = require('fs');
const http  = require('http');
const https = require('https');
const net   = require('net');

// --- OS Identity & Recognition (Windows AppUserModelId & Process Name) ---
const APP_ID = 'com.rxdwan.baladio';
app.setAppUserModelId(APP_ID);
app.setName('Baladio');
app.name = 'Baladio';
process.title = 'Baladio';

// Exception handlers to prevent silent crashes
process.on('uncaughtException', (err) => console.error('[Baladio Uncaught Exception]', err));
process.on('unhandledRejection', (reason) => console.error('[Baladio Unhandled Rejection]', reason));

let PORT          = parseInt(process.env.PORT || '3000', 10);
let SERVER_URL    = `http://localhost:${PORT}`;
const ICON_ICO_PATH  = path.join(__dirname, 'public', 'assets', 'logo.ico');
const ICON_PNG_PATH  = path.join(__dirname, 'public', 'assets', 'logo.png');
// On Windows, prefer .ico for crisp multi-DPI rendering; fallback to .png
const APP_ICON_PATH  = (process.platform === 'win32' && fs_.existsSync(ICON_ICO_PATH))
    ? ICON_ICO_PATH
    : ICON_PNG_PATH;
const TRAY_ICON_PATH = APP_ICON_PATH;
const IS_DEV        = process.env.NODE_ENV === 'development' || !app.isPackaged;

// Keep Web Audio alive when window is hidden (fixes 8D audio in background)
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-background-timer-throttling');

let mainWindow    = null;
let splashWindow  = null;
let tray          = null;
let serverProcess = null;
let isQuitting    = false;
let isStartupHidden = process.argv.includes('--hidden');
let closeToTray   = true; // default: closing window minimizes to tray

let currentSongsDir = null;

function getSavedSongsDir() {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        if (fs_.existsSync(file)) {
            const data = JSON.parse(fs_.readFileSync(file, 'utf8'));
            if (data.songsDir && typeof data.songsDir === 'string' && fs_.existsSync(data.songsDir)) {
                return data.songsDir;
            }
        }
    } catch {}
    return null;
}

function saveSongsDir(songsDir) {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        let config = {};
        if (fs_.existsSync(file)) {
            try { config = JSON.parse(fs_.readFileSync(file, 'utf8')); } catch {}
        }
        config.songsDir = songsDir;
        fs_.writeFileSync(file, JSON.stringify(config, null, 2));
    } catch (e) {
        console.warn('[Baladio] Failed to save songsDir to server-config.json:', e.message);
    }
}

function loadCloseToTraySetting() {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        if (fs_.existsSync(file)) {
            const data = JSON.parse(fs_.readFileSync(file, 'utf8'));
            if (typeof data.closeToTray === 'boolean') return data.closeToTray;
        }
    } catch {}
    return true; // default: minimize to tray
}

function saveCloseToTraySetting(val) {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        let config = {};
        if (fs_.existsSync(file)) {
            try { config = JSON.parse(fs_.readFileSync(file, 'utf8')); } catch {}
        }
        config.closeToTray = !!val;
        fs_.writeFileSync(file, JSON.stringify(config, null, 2));
    } catch (e) {
        console.warn('[Baladio] Failed to save closeToTray setting:', e.message);
    }
}

// Cross-platform songs directory: use configured folder if set, or OS Music/songs folder
function getSongsDir() {
    if (!currentSongsDir) {
        currentSongsDir = getSavedSongsDir();
    }
    if (currentSongsDir && fs_.existsSync(currentSongsDir)) {
        return currentSongsDir;
    }
    const dir = path.join(app.getPath('music'), 'songs');
    if (!fs_.existsSync(dir)) {
        try { fs_.mkdirSync(dir, { recursive: true }); } catch {}
    }
    return dir;
}

function setSongsDir(newDir) {
    if (newDir && typeof newDir === 'string') {
        const resolved = path.resolve(newDir);
        if (!fs_.existsSync(resolved)) {
            try { fs_.mkdirSync(resolved, { recursive: true }); } catch {}
        }
        currentSongsDir = resolved;
        saveSongsDir(resolved);
        return currentSongsDir;
    }
    return getSongsDir();
}

let currentExportDir = null;

function getSavedExportDir() {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        if (fs_.existsSync(file)) {
            const data = JSON.parse(fs_.readFileSync(file, 'utf8'));
            if (data.exportDir && typeof data.exportDir === 'string' && fs_.existsSync(data.exportDir)) {
                return data.exportDir;
            }
        }
    } catch {}
    return null;
}

function saveExportDir(exportDir) {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        let config = {};
        if (fs_.existsSync(file)) {
            try { config = JSON.parse(fs_.readFileSync(file, 'utf8')); } catch {}
        }
        config.exportDir = exportDir;
        fs_.writeFileSync(file, JSON.stringify(config, null, 2));
    } catch (e) {
        console.warn('[Baladio] Failed to save exportDir to server-config.json:', e.message);
    }
}

function getExportDir() {
    if (!currentExportDir) {
        currentExportDir = getSavedExportDir();
    }
    if (currentExportDir && fs_.existsSync(currentExportDir)) {
        return currentExportDir;
    }
    const dir = path.join(app.getPath('music'), 'baladio_exports');
    if (!fs_.existsSync(dir)) {
        try { fs_.mkdirSync(dir, { recursive: true }); } catch {}
    }
    return dir;
}

function setExportDir(newDir) {
    if (newDir && typeof newDir === 'string') {
        const resolved = path.resolve(newDir);
        if (!fs_.existsSync(resolved)) {
            try { fs_.mkdirSync(resolved, { recursive: true }); } catch {}
        }
        currentExportDir = resolved;
        saveExportDir(resolved);
        return currentExportDir;
    }
    return getExportDir();
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (_event, argv) => {
        showMainWindow();
        if (argv && argv.includes('--open-songs')) {
            const songsDir = getSongsDir();
            if (!fs_.existsSync(songsDir)) fs_.mkdirSync(songsDir, { recursive: true });
            shell.openPath(songsDir);
        }
    });
}

function windowStatePath() {
    return path.join(app.getPath('userData'), 'window-state.json');
}
function loadWindowState() {
    try {
        const state = JSON.parse(fs_.readFileSync(windowStatePath(), 'utf-8'));
        // Edge case: if user disconnected a secondary monitor, ensure window is still on a visible display
        if (state.x !== undefined && state.y !== undefined && app.isReady()) {
            const displays = screen.getAllDisplays();
            const isVisible = displays.some(d => {
                const b = d.bounds;
                return state.x >= b.x && state.x < b.x + b.width &&
                       state.y >= b.y && state.y < b.y + b.height;
            });
            if (!isVisible) {
                delete state.x;
                delete state.y;
            }
        }
        return state;
    } catch {
        return { width: 1400, height: 900 };
    }
}
function saveWindowState(win) {
    if (!win || win.isDestroyed()) return;
    try { fs_.writeFileSync(windowStatePath(), JSON.stringify({ ...win.getBounds(), maximized: win.isMaximized() })); } catch {}
}

function isServerRunning(timeout = 900) {
    return new Promise((resolve) => {
        const req = http.get(`${SERVER_URL}/api/version`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    // Verify it is genuinely Baladio by inspecting the version endpoint
                    resolve(res.statusCode === 200 && json && !!json.version);
                } catch {
                    resolve(false);
                }
            });
        });
        req.on('error', () => resolve(false));
        req.setTimeout(timeout, () => {
            req.destroy();
            resolve(false);
        });
    });
}

function getSavedPort() {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        if (fs_.existsSync(file)) {
            const data = JSON.parse(fs_.readFileSync(file, 'utf8'));
            if (data.port && Number.isInteger(data.port) && data.port > 0 && data.port < 65536) {
                return data.port;
            }
        }
    } catch {}
    return parseInt(process.env.PORT || '3000', 10);
}

function savePort(port) {
    try {
        const file = path.join(app.getPath('userData'), 'server-config.json');
        fs_.writeFileSync(file, JSON.stringify({ port }, null, 2));
    } catch (e) {
        console.warn('[Baladio] Failed to save port config:', e.message);
    }
}

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => resolve(false));
        server.once('listening', () => {
            server.close(() => resolve(true));
        });
        server.listen(port, '127.0.0.1');
    });
}

function isBaladioRunningOnPort(port, timeout = 900) {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${port}/api/version`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(res.statusCode === 200 && json && !!json.version);
                } catch {
                    resolve(false);
                }
            });
        });
        req.on('error', () => resolve(false));
        req.setTimeout(timeout, () => {
            req.destroy();
            resolve(false);
        });
    });
}

async function resolveServerPort() {
    let port = getSavedPort();

    // 1. If Baladio is already running on this port, connect directly
    if (await isBaladioRunningOnPort(port)) {
        return { port, alreadyRunning: true };
    }

    // 2. If the port is completely free, use it
    if (await isPortAvailable(port)) {
        return { port, alreadyRunning: false };
    }

    // 3. Port is occupied by another app: find next available port and save permanently for this computer
    console.warn(`[Baladio] Port ${port} is occupied by another application. Permanently finding a new port...`);
    let candidate = (port >= 3000 && port < 3100) ? port + 1 : 3001;
    while (candidate < 3200) {
        if (await isBaladioRunningOnPort(candidate)) {
            console.log(`[Baladio] Reconnected to Baladio server running on port ${candidate}`);
            savePort(candidate);
            return { port: candidate, alreadyRunning: true };
        }
        if (await isPortAvailable(candidate)) {
            console.log(`[Baladio] Permanently switching server port for this computer to: ${candidate}`);
            savePort(candidate);
            return { port: candidate, alreadyRunning: false };
        }
        candidate++;
    }

    return { port, alreadyRunning: false };
}

function pollServerReady(retries = 40) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const check = () => {
            http.get(SERVER_URL, (res) => {
                res.resume();
                resolve();
            }).on('error', () => {
                if (++attempts >= retries) return reject(new Error('Server did not start in time on port ' + PORT));
                setTimeout(check, 350);
            });
        };
        check();
    });
}

function createSplashWindow() {
    splashWindow = new BrowserWindow({
        width: 500,
        height: 350,
        frame: false,
        resizable: false,
        center: true,
        show: false,
        transparent: true,
        hasShadow: true,
        icon: fs_.existsSync(APP_ICON_PATH) ? APP_ICON_PATH : undefined,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'splash-preload.js'),
        },
    });

    splashWindow.loadFile(path.join(__dirname, 'splash.html'));
    splashWindow.once('ready-to-show', () => {
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.show();
        }
    });
}

function getYtDlpDir() {
    return path.join(app.getPath('userData'), 'bin');
}

function getYtDlpPath() {
    return path.join(getYtDlpDir(), process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');
}

function downloadBinary(sourceUrl, destPath, onProgress) {
    return new Promise((resolve, reject) => {
        const get = (currentUrl, redirects = 0) => {
            if (redirects > 5) return reject(new Error('Too many redirects'));
            const client = currentUrl.startsWith('https') ? https : http;
            client.get(currentUrl, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return get(res.headers.location, redirects + 1);
                }
                if (res.statusCode !== 200) {
                    return reject(new Error(`Failed to download: HTTP ${res.statusCode}`));
                }

                const total = parseInt(res.headers['content-length'] || '0', 10);
                let received = 0;
                const file = fs_.createWriteStream(destPath);

                res.on('data', (chunk) => {
                    received += chunk.length;
                    if (total && onProgress) {
                        onProgress(Math.round((received / total) * 100));
                    }
                });

                res.pipe(file);
                file.on('finish', () => file.close(resolve));
                file.on('error', (err) => {
                    fs_.unlink(destPath, () => {});
                    reject(err);
                });
            }).on('error', reject);
        };
        get(sourceUrl);
    });
}

async function ensureYtDlp(splashWin) {
    const binDir = getYtDlpDir();
    const binaryPath = getYtDlpPath();

    if (!fs_.existsSync(binDir)) {
        try { fs_.mkdirSync(binDir, { recursive: true }); } catch {}
    }

    // Prepend userData/bin to PATH so both Electron and server find it
    process.env.PATH = binDir + path.delimiter + (process.env.PATH || '');

    // Ensure yt-dlp has a Node.js runtime for JavaScript challenge solving
    // by creating a wrapper pointing to Electron in Node mode if system node is absent
    try {
        if (process.platform === 'win32') {
            const nodeCmd = path.join(binDir, 'node.cmd');
            if (!fs_.existsSync(nodeCmd)) {
                fs_.writeFileSync(nodeCmd, `@echo off\r\nset ELECTRON_RUN_AS_NODE=1\r\n"${process.execPath}" %*\r\n`);
            }
        } else {
            const nodeSh = path.join(binDir, 'node');
            if (!fs_.existsSync(nodeSh)) {
                fs_.writeFileSync(nodeSh, `#!/bin/sh\nexport ELECTRON_RUN_AS_NODE=1\nexec "${process.execPath}" "$@"\n`);
                fs_.chmodSync(nodeSh, 0o755);
            }
        }
    } catch {}

    if (fs_.existsSync(binaryPath)) {
        // Already downloaded: run self-update in background silently
        console.log('[Baladio] yt-dlp is present at: ' + binaryPath);
        try {
            const updater = spawn(binaryPath, ['-U'], { windowsHide: true, stdio: 'ignore' });
            updater.unref();
        } catch {}
        return;
    }

    // Check if system PATH already has yt-dlp
    try {
        const checkCmd = process.platform === 'win32' ? 'where' : 'which';
        const { execSync } = require('child_process');
        execSync(`${checkCmd} yt-dlp`, { stdio: 'ignore' });
        console.log('[Baladio] yt-dlp found in system PATH.');
        return;
    } catch {}

    // If missing everywhere, download latest official standalone binary from GitHub
    console.log('[Baladio] Downloading yt-dlp to ' + binaryPath + '...');
    if (splashWin && !splashWin.isDestroyed()) {
        splashWin.webContents.send('splash:status', {
            pct: 42,
            text: 'Fetching latest YouTube engine (yt-dlp)…'
        });
    }

    let downloadUrl;
    if (process.platform === 'win32') {
        downloadUrl = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
    } else if (process.platform === 'darwin') {
        downloadUrl = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos';
    } else {
        downloadUrl = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux';
    }

    const tmpPath = binaryPath + '.tmp';
    try {
        await downloadBinary(downloadUrl, tmpPath, (pct) => {
            if (splashWin && !splashWin.isDestroyed()) {
                const scaled = 42 + Math.round(pct * 0.38); // 42% -> 80%
                splashWin.webContents.send('splash:status', {
                    pct: scaled,
                    text: `Downloading YouTube engine (${pct}%)…`
                });
            }
        });

        fs_.renameSync(tmpPath, binaryPath);
        if (process.platform !== 'win32') {
            fs_.chmodSync(binaryPath, 0o755);
        }
        console.log('[Baladio] yt-dlp installed successfully.');
        if (splashWin && !splashWin.isDestroyed()) {
            splashWin.webContents.send('splash:status', {
                pct: 82,
                text: 'YouTube engine ready! Starting server…'
            });
        }
    } catch (err) {
        console.warn('[Baladio] Could not download yt-dlp (offline mode active):', err.message);
        try { if (fs_.existsSync(tmpPath)) fs_.unlinkSync(tmpPath); } catch {}
    }
}

// --- Desktop Shortcut Creation (First-Run Only) ---
// NSIS installer already creates shortcuts for installed builds (see package.json nsis config).
// This handles portable .exe and Linux AppImage where no installer runs.
function createDesktopShortcut() {
    const markerPath = path.join(app.getPath('userData'), '.shortcut-created');
    if (fs_.existsSync(markerPath)) return; // Already done on a previous launch

    try {
        const desktopPath = app.getPath('desktop');

        if (process.platform === 'win32') {
            const shortcutPath = path.join(desktopPath, 'Baladio.lnk');
            if (!fs_.existsSync(shortcutPath)) {
                shell.writeShortcutLink(shortcutPath, 'create', {
                    target: process.execPath,
                    description: 'Baladio Music Player',
                    icon: APP_ICON_PATH,
                    iconIndex: 0,
                    appUserModelId: APP_ID
                });
            }
        } else if (process.platform === 'linux') {
            const desktopEntry = [
                '[Desktop Entry]',
                'Name=Baladio',
                'Comment=A self-hosted, privacy-first desktop music player',
                'Exec="' + process.execPath + '"',
                'Icon=' + APP_ICON_PATH,
                'Type=Application',
                'Categories=Audio;Music;Player;',
                'Terminal=false',
                'StartupWMClass=baladio',
                ''
            ].join('\n');
            const shortcutPath = path.join(desktopPath, 'Baladio.desktop');
            if (!fs_.existsSync(shortcutPath)) {
                fs_.writeFileSync(shortcutPath, desktopEntry);
                fs_.chmodSync(shortcutPath, 0o755);
            }
        }
        // macOS: .dmg installer handles /Applications placement; no desktop shortcut convention

        fs_.writeFileSync(markerPath, new Date().toISOString());
        console.log('[Baladio] Desktop shortcut created.');
    } catch (err) {
        console.warn('[Baladio] Could not create desktop shortcut:', err.message);
    }
}

function startServerDetached(splashWin) {
    return new Promise((resolve, reject) => {
        const serverPath = path.join(__dirname, 'server.js');
        if (!fs_.existsSync(serverPath)) return reject(new Error('server.js not found at: ' + serverPath));

        const userDataDir = app.getPath('userData');
        const logFile = path.join(userDataDir, 'server.log');
        let out = 'ignore';
        try {
            out = fs_.openSync(logFile, 'a');
        } catch {}

        try {
            const binDir = getYtDlpDir();
            const dataDir = path.join(userDataDir, 'data');
            const coversDir = path.join(userDataDir, 'covers');
            const songsDir = getSongsDir();

            const stdio = splashWin ? ['ignore', 'pipe', out] : ['ignore', out, out];
            // When packaged, __dirname is inside resources/app.asar which is a file, not a directory.
            // Using app.asar as cwd causes OS error ENOTDIR / 'The directory name is invalid'.
            const serverCwd = app.isPackaged ? path.dirname(process.execPath) : __dirname;

            serverProcess = spawn(process.execPath, [serverPath], {
                detached: !splashWin,
                stdio: stdio,
                cwd: serverCwd,
                env: {
                    ...process.env,
                    ELECTRON_RUN_AS_NODE: '1',
                    PORT: String(PORT),
                    ELECTRON: '1',
                    BALADIO_USER_DATA_DIR: userDataDir,
                    BALADIO_DATA_DIR: dataDir,
                    BALADIO_COVERS_DIR: coversDir,
                    BALADIO_SONGS_DIR: songsDir,
                    PATH: binDir + path.delimiter + (process.env.PATH || ''),
                },
                windowsHide: true,
            });

            serverProcess.once('error', (err) => {
                console.error('[Baladio] Failed to spawn server process:', err);
                try { fs_.appendFileSync(logFile, `\n[Baladio Spawn Error] ${err.stack || err.message}\n`); } catch {}
                reject(new Error(`Failed to launch server: ${err.message}`));
            });

            serverProcess.once('exit', (code, signal) => {
                if (code !== null && code !== 0) {
                    const exitMsg = `Server process exited prematurely with code ${code} (signal: ${signal})`;
                    console.error('[Baladio] ' + exitMsg);
                    try { fs_.appendFileSync(logFile, `\n[Baladio Server Exit] ${exitMsg}\n`); } catch {}
                    reject(new Error(exitMsg));
                }
            });

            if (splashWin && serverProcess.stdout) {
                serverProcess.stdout.on('data', (buf) => {
                    const str = buf.toString();
                    try { fs_.appendFileSync(logFile, str); } catch {}
                    if (str.includes('[BOOT] Initializing SQLite')) {
                        if (splashWin && !splashWin.isDestroyed()) splashWin.webContents.send('splash:status', { pct: 86, text: 'Initializing local database & schema…' });
                    } else if (str.includes('[BOOT] Loading playlists') || str.includes('Migration complete')) {
                        if (splashWin && !splashWin.isDestroyed()) splashWin.webContents.send('splash:status', { pct: 92, text: 'Loading library and playlist data…' });
                    } else if (str.includes('[BOOT] Mounting API endpoints')) {
                        if (splashWin && !splashWin.isDestroyed()) splashWin.webContents.send('splash:status', { pct: 96, text: 'Mounting local audio streams…' });
                    } else if (str.includes('[BOOT] Baladio server ready') || str.includes('Server running on')) {
                        if (splashWin && !splashWin.isDestroyed()) splashWin.webContents.send('splash:status', { pct: 100, text: 'Server ready! Launching Baladio…' });
                    }
                });
            }

            if (!splashWin) {
                serverProcess.unref();
            }
        } catch (err) {
            return reject(err);
        }

        pollServerReady().then(resolve).catch(reject);
    });
}

async function stopServer() {
    // 1. Send graceful shutdown request to the server
    try {
        await new Promise((resolve) => {
            const req = http.request({
                hostname: '127.0.0.1',
                port: PORT,
                path: '/api/server/shutdown',
                method: 'POST',
                timeout: 1200
            }, (res) => {
                res.resume();
                resolve();
            });
            req.on('error', () => resolve());
            req.on('timeout', () => { req.destroy(); resolve(); });
            req.end();
        });
    } catch {}

    // 2. Terminate serverProcess directly if we hold the handle
    if (serverProcess) {
        try {
            if (process.platform === 'win32') {
                const { execSync } = require('child_process');
                execSync(`taskkill /pid ${serverProcess.pid} /f /t`, { stdio: 'ignore' });
            } else {
                serverProcess.kill('SIGKILL');
            }
        } catch {}
        serverProcess = null;
    }

    // 3. Ensure any stray process on PORT is terminated (handles detached or zombie processes)
    if (process.platform === 'win32') {
        try {
            const { execSync } = require('child_process');
            const out = execSync(`netstat -ano -p tcp | findstr :${PORT}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
            const lines = out.trim().split('\n');
            for (const line of lines) {
                if (line.includes('LISTENING')) {
                    const parts = line.trim().split(/\s+/);
                    const pid = parts[parts.length - 1];
                    if (pid && pid !== '0' && pid !== String(process.pid)) {
                        execSync(`taskkill /pid ${pid} /f /t`, { stdio: 'ignore' });
                    }
                }
            }
        } catch {}
    }

    // 4. Poll until the port is genuinely free
    for (let i = 0; i < 30; i++) {
        const available = await isPortAvailable(PORT);
        if (available) break;
        await new Promise(r => setTimeout(r, 100));
    }

    return true;
}

async function restartServer() {
    await stopServer();
    await new Promise(r => setTimeout(r, 400));
    await startServerDetached();
    return true;
}

function safeOpenExternal(u) {
    try {
        if (typeof u === 'string') {
            const parsed = new URL(u);
            // Allow only safe web and mail protocols to prevent OS protocol-handler exploitation
            if (['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
                shell.openExternal(u);
            }
        }
    } catch {}
}

function showMainWindow() {
    if (!mainWindow || mainWindow.isDestroyed()) {
        isStartupHidden = false;
        createWindow();
        return;
    }
    if (isStartupHidden) {
        isStartupHidden = false;
        const saved = loadWindowState();
        if (saved.maximized) mainWindow.maximize();
    }
    if (mainWindow.isMinimized()) mainWindow.restore();
    if (!mainWindow.isVisible()) mainWindow.show();
    mainWindow.focus();
    if (process.platform === 'darwin' && app.dock) app.dock.show();
}

function createWindow() {
    const saved = loadWindowState();
    const opts = {
        width:     saved.width  || 1400,
        height:    saved.height || 900,
        x:         saved.x,
        y:         saved.y,
        minWidth:  960,
        minHeight: 640,
        icon:      fs_.existsSync(APP_ICON_PATH) ? APP_ICON_PATH : undefined,
        title:     'Baladio',
        backgroundColor: '#0d0f1a',
        frame:     false,
        hasShadow: true,
        show:      false,
        webPreferences: {
            nodeIntegration:  false,
            contextIsolation: true,
            spellcheck:       false,
            preload:          path.join(__dirname, 'electron-preload.js'),
        },
    };

    mainWindow = new BrowserWindow(opts);
    if (saved.maximized && !isStartupHidden) mainWindow.maximize();

    mainWindow.loadURL(SERVER_URL);

    mainWindow.once('ready-to-show', () => {
        if (isStartupHidden) {
            console.log('[Baladio] Launched at system startup. Running minimized in system tray.');
            if (process.platform === 'darwin' && app.dock) app.dock.hide();
        } else {
            if (saved.maximized) mainWindow.maximize();
            mainWindow.show();
            mainWindow.focus();
        }
        if (IS_DEV) mainWindow.webContents.openDevTools({ mode: 'detach' });
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
            splashWindow = null;
        }
    });

    // Disable Ctrl+R, Ctrl+Shift+R, and F5 refresh since Baladio is a desktop app
    mainWindow.webContents.on('before-input-event', (event, input) => {
        const isR = input.key && input.key.toLowerCase() === 'r';
        const isReload = (input.control || input.meta) && isR;
        const isF5 = input.key === 'F5';
        if (isReload || isF5) {
            event.preventDefault();
        }
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        safeOpenExternal(url);
        return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith(SERVER_URL)) {
            event.preventDefault();
            safeOpenExternal(url);
        }
    });

    mainWindow.on('close', (e) => {
        saveWindowState(mainWindow);
        if (!isQuitting) {
            if (closeToTray) {
                // Minimize to system tray instead of quitting
                e.preventDefault();
                mainWindow.hide();
                if (process.platform === 'darwin') app.dock.hide();
            } else {
                // Fully quit: stop server, destroy tray, exit process
                e.preventDefault();
                isQuitting = true;
                mainWindow.hide();
                if (tray) { tray.destroy(); tray = null; }
                stopServer().catch(() => {}).finally(() => app.exit(0));
            }
        }
    });

    mainWindow.on('resize',   () => saveWindowState(mainWindow));
    mainWindow.on('move',     () => saveWindowState(mainWindow));
    mainWindow.on('maximize', () => saveWindowState(mainWindow));

    buildAppMenu();
}

function createTray() {
    let trayIcon;
    if (fs_.existsSync(TRAY_ICON_PATH)) {
        if (TRAY_ICON_PATH.endsWith('.ico')) {
            trayIcon = nativeImage.createFromPath(TRAY_ICON_PATH);
        } else {
            trayIcon = nativeImage.createFromPath(TRAY_ICON_PATH).resize({ width: 16, height: 16 });
        }
    } else if (fs_.existsSync(APP_ICON_PATH)) {
        trayIcon = nativeImage.createFromPath(APP_ICON_PATH).resize({ width: 16, height: 16 });
    } else {
        trayIcon = nativeImage.createEmpty();
    }

    tray = new Tray(trayIcon);
    tray.setToolTip('Baladio');

    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Show Baladio',
            click: () => showMainWindow()
        },
        { label: 'Open in Browser', click: () => shell.openExternal(SERVER_URL) },
        { type: 'separator' },
        {
            label: 'Quit Baladio',
            click: () => {
                isQuitting = true;
                if (tray) { tray.destroy(); tray = null; }
                stopServer().catch(() => {}).finally(() => app.exit(0));
            }
        }
    ]));

    tray.on('click', () => {
        if (!mainWindow || mainWindow.isDestroyed() || !mainWindow.isVisible()) {
            showMainWindow();
        } else {
            mainWindow.focus();
        }
    });

    tray.on('double-click', () => {
        showMainWindow();
    });
}

function buildAppMenu() {
    const isMac    = process.platform === 'darwin';
    const songsDir = getSongsDir();

    const template = [
        ...(isMac ? [{ label: app.name, submenu: [
            { role: 'about' }, { type: 'separator' }, { role: 'services' }, { type: 'separator' },
            { role: 'hide' }, { role: 'hideOthers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }
        ]}] : []),
        { label: 'File', submenu: [
            {
                label: 'Open Songs Folder',
                accelerator: 'CmdOrCtrl+Shift+O',
                click: () => {
                    const current = getSongsDir();
                    if (!fs_.existsSync(current)) fs_.mkdirSync(current, { recursive: true });
                    shell.openPath(current);
                }
            },
            { type: 'separator' },
            isMac
                ? { role: 'close' }
                : { label: 'Minimize to Tray', click: () => mainWindow && mainWindow.hide() },
            {
                label: 'Quit Baladio',
                accelerator: isMac ? 'Cmd+Q' : 'Alt+F4',
                click: () => { isQuitting = true; app.quit(); }
            }
        ]},
        { label: 'Edit', submenu: [
            { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
            { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }
        ]},
        { label: 'View', submenu: [
            ...(IS_DEV ? [{ role: 'toggleDevTools' }, { type: 'separator' }] : []),
            { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
            { type: 'separator' }, { role: 'togglefullscreen' }
        ]},
        { label: 'Window', submenu: [
            { role: 'minimize' }, { role: 'zoom' },
            ...(isMac ? [{ type: 'separator' }, { role: 'front' }] : [])
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// --- Software Updater Subsystem ---
const GITHUB_REPO = 'rxdwan/Baladio';
let downloadedUpdatePath = null;

/**
 * Read the local build commit SHA embedded at CI build time.
 * Falls back to 'dev' during development or if the file is missing.
 */
function getLocalBuildCommitSha() {
    try {
        const buildInfoPath = path.join(__dirname, 'public', 'build-info.json');
        if (fs_.existsSync(buildInfoPath)) {
            const info = JSON.parse(fs_.readFileSync(buildInfoPath, 'utf-8'));
            return (info.commitSha || 'dev').trim();
        }
    } catch (e) {
        console.warn('[Baladio Updater] Could not read build-info.json:', e.message);
    }
    return 'dev';
}

/**
 * Fetch the commit SHA that a given tag points to via the GitHub Git Refs API.
 * Works for both lightweight and annotated tags.
 * Returns the commit SHA string, or null on failure.
 */
function fetchTagCommitSha(tagName) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${GITHUB_REPO}/git/ref/tags/${tagName.replace(/^v/, '')}`,
            method: 'GET',
            headers: {
                'User-Agent': 'Baladio-Desktop/' + app.getVersion(),
                'Accept': 'application/vnd.github.v3+json'
            },
            timeout: 5000
        };

        // Try without 'v' prefix first, then with
        const tryFetch = (refPath) => {
            const opts = { ...options, path: `/repos/${GITHUB_REPO}/git/ref/tags/${refPath}` };
            const req = https.get(opts, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        if (res.statusCode === 200) {
                            const ref = JSON.parse(data);
                            // For annotated tags, object.type is 'tag' and we need to dereference.
                            // For lightweight tags, object.type is 'commit' and sha is directly usable.
                            if (ref.object && ref.object.type === 'tag') {
                                // Dereference annotated tag to get the commit SHA
                                const derefOpts = {
                                    hostname: 'api.github.com',
                                    path: `/repos/${GITHUB_REPO}/git/tags/${ref.object.sha}`,
                                    method: 'GET',
                                    headers: opts.headers,
                                    timeout: 5000
                                };
                                const derefReq = https.get(derefOpts, (derefRes) => {
                                    let derefData = '';
                                    derefRes.on('data', chunk => derefData += chunk);
                                    derefRes.on('end', () => {
                                        try {
                                            const tagObj = JSON.parse(derefData);
                                            resolve(tagObj.object ? tagObj.object.sha : ref.object.sha);
                                        } catch (_) {
                                            resolve(ref.object.sha);
                                        }
                                    });
                                });
                                derefReq.on('error', () => resolve(ref.object.sha));
                                derefReq.on('timeout', () => { derefReq.destroy(); resolve(ref.object.sha); });
                            } else {
                                resolve(ref.object ? ref.object.sha : null);
                            }
                        } else {
                            resolve(null);
                        }
                    } catch (_) {
                        resolve(null);
                    }
                });
            });
            req.on('error', () => resolve(null));
            req.on('timeout', () => { req.destroy(); resolve(null); });
        };

        // GitHub tags can be stored with or without 'v' prefix
        const cleanTag = tagName.replace(/^v/, '');
        // Try with 'v' prefix first (most common for Baladio), then without
        const optsV = { ...options, path: `/repos/${GITHUB_REPO}/git/ref/tags/v${cleanTag}` };
        const reqV = https.get(optsV, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const ref = JSON.parse(data);
                        if (ref.object && ref.object.type === 'tag') {
                            const derefOpts = {
                                hostname: 'api.github.com',
                                path: `/repos/${GITHUB_REPO}/git/tags/${ref.object.sha}`,
                                method: 'GET',
                                headers: options.headers,
                                timeout: 5000
                            };
                            const derefReq = https.get(derefOpts, (derefRes) => {
                                let derefData = '';
                                derefRes.on('data', chunk => derefData += chunk);
                                derefRes.on('end', () => {
                                    try {
                                        const tagObj = JSON.parse(derefData);
                                        resolve(tagObj.object ? tagObj.object.sha : ref.object.sha);
                                    } catch (_) {
                                        resolve(ref.object.sha);
                                    }
                                });
                            });
                            derefReq.on('error', () => resolve(ref.object.sha));
                            derefReq.on('timeout', () => { derefReq.destroy(); resolve(ref.object.sha); });
                        } else {
                            resolve(ref.object ? ref.object.sha : null);
                        }
                    } else {
                        // Fallback: try without 'v' prefix
                        tryFetch(cleanTag);
                    }
                } catch (_) {
                    tryFetch(cleanTag);
                }
            });
        });
        reqV.on('error', () => tryFetch(cleanTag));
        reqV.on('timeout', () => { reqV.destroy(); tryFetch(cleanTag); });
    });
}

function getUpdatesDir() {
    const dir = path.join(app.getPath('userData'), 'updates');
    if (!fs_.existsSync(dir)) fs_.mkdirSync(dir, { recursive: true });
    return dir;
}

function cleanUpdatesDir() {
    try {
        const dir = path.join(app.getPath('userData'), 'updates');
        if (fs_.existsSync(dir)) {
            fs_.rmSync(dir, { recursive: true, force: true });
            fs_.mkdirSync(dir, { recursive: true });
        }
    } catch (e) {
        console.warn('[Baladio Updater] Failed to clean updates dir:', e.message);
    }
}

function isNewerVersion(latest, current) {
    if (!latest || !current) return false;
    const cleanL = latest.replace(/^v/, '').trim();
    const cleanC = current.replace(/^v/, '').trim();
    const lParts = cleanL.split('.').map(n => parseInt(n, 10) || 0);
    const cParts = cleanC.split('.').map(n => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(lParts.length, cParts.length); i++) {
        const l = lParts[i] || 0;
        const c = cParts[i] || 0;
        if (l > c) return true;
        if (l < c) return false;
    }
    return false;
}

function registerIpc() {
    ipcMain.handle('dialog:open-folder', async () => {
        const current = getSongsDir();
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory', 'createDirectory'],
            defaultPath: (current && fs_.existsSync(current)) ? current : app.getPath('music'),
            title: 'Select Songs Folder'
        });
        return (result.canceled || !result.filePaths || !result.filePaths.length) ? null : result.filePaths[0];
    });

    ipcMain.on('shell:show-item', (_e, p) => {
        if (typeof p === 'string' && fs_.existsSync(p)) {
            shell.showItemInFolder(p);
        }
    });
    ipcMain.on('shell:open-external', (_e, u) => {
        safeOpenExternal(u);
    });

    ipcMain.on('window:minimize', () => mainWindow && mainWindow.minimize());
    ipcMain.on('window:maximize', () => {
        if (!mainWindow) return;
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    });
    ipcMain.on('window:hide',  () => mainWindow && mainWindow.hide());
    ipcMain.on('window:close', () => mainWindow && mainWindow.close());
    ipcMain.on('window:quit',  () => {
        isQuitting = true;
        if (tray) { tray.destroy(); tray = null; }
        stopServer().catch(() => {}).finally(() => app.exit(0));
    });
    ipcMain.handle('window:is-maximized', () => mainWindow ? mainWindow.isMaximized() : false);

    ipcMain.on('notify', (_e, { title, body }) => {
        if (Notification.isSupported()) {
            new Notification({
                title,
                body,
                icon: fs_.existsSync(APP_ICON_PATH) ? APP_ICON_PATH : undefined
            }).show();
        }
    });

    // Server controls
    ipcMain.handle('server:status',  async () => isServerRunning());
    ipcMain.handle('server:stop',    async () => stopServer());
    ipcMain.handle('server:start',   async () => {
        const running = await isServerRunning();
        if (!running) await startServerDetached();
        return true;
    });
    ipcMain.handle('server:restart', async () => restartServer());

    // Software Updater Controls
    ipcMain.handle('updater:check', async () => {
        return new Promise((resolve) => {
            const options = {
                hostname: 'api.github.com',
                path: `/repos/${GITHUB_REPO}/releases/latest`,
                method: 'GET',
                headers: {
                    'User-Agent': 'Baladio-Desktop/' + app.getVersion(),
                    'Accept': 'application/vnd.github.v3+json'
                },
                timeout: 7000
            };

            const req = https.get(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', async () => {
                    try {
                        if (res.statusCode === 200) {
                            const release = JSON.parse(data);
                            const latestVersion = (release.tag_name || '').replace(/^v/, '');
                            const currentVersion = app.getVersion();
                            let hasUpdate = isNewerVersion(latestVersion, currentVersion);

                            // --- Commit SHA comparison (detects same-tag rebuilds) ---
                            const localCommitSha = getLocalBuildCommitSha();
                            let remoteCommitSha = release.target_commitish || null;

                            // If versions match and local SHA is a real build (not 'dev'),
                            // fetch the precise tag commit SHA for comparison
                            if (!hasUpdate && localCommitSha !== 'dev' && release.tag_name) {
                                try {
                                    const tagSha = await fetchTagCommitSha(release.tag_name);
                                    if (tagSha) remoteCommitSha = tagSha;
                                    if (tagSha && tagSha !== localCommitSha) {
                                        hasUpdate = true; // Same version tag, different commit
                                    }
                                } catch (shaErr) {
                                    console.warn('[Baladio Updater] SHA check failed, falling back to version-only:', shaErr.message);
                                }
                            }

                            let asset = null;
                            const assets = release.assets || [];
                            if (process.platform === 'win32') {
                                asset = assets.find(a => a.name.startsWith('Baladio-win-') && !a.name.includes('portable') && a.name.endsWith('.exe'))
                                     || assets.find(a => a.name.startsWith('Baladio-win-') && a.name.endsWith('.exe'))
                                     || assets.find(a => a.name.endsWith('.exe'));
                            } else if (process.platform === 'darwin') {
                                asset = assets.find(a => a.name.startsWith('Baladio-mac-') && a.name.endsWith('.dmg'))
                                     || assets.find(a => a.name.endsWith('.dmg'))
                                     || assets.find(a => a.name.endsWith('.zip'));
                            } else if (process.platform === 'linux') {
                                asset = assets.find(a => a.name.startsWith('Baladio-linux-') && a.name.endsWith('.AppImage'))
                                     || assets.find(a => a.name.endsWith('.AppImage'))
                                     || assets.find(a => a.name.endsWith('.deb'))
                                     || assets.find(a => a.name.endsWith('.tar.gz'));
                            }
                            if (!asset) {
                                asset = assets.find(a => 
                                    a.name.endsWith('.exe') || a.name.endsWith('.zip') || a.name.endsWith('.AppImage') || a.name.endsWith('.dmg')
                                );
                            }
                            const downloadUrl = asset ? asset.browser_download_url : (release.zipball_url || release.html_url);
                            const assetSize = asset ? asset.size : 0;
                            const osTag = process.platform === 'win32' ? 'win' : process.platform === 'darwin' ? 'mac' : 'linux';
                            const osExt = process.platform === 'win32' ? 'exe' : process.platform === 'darwin' ? 'dmg' : 'AppImage';

                            resolve({
                                success: true,
                                hasUpdate,
                                currentVersion,
                                latestVersion,
                                tagName: release.tag_name,
                                name: release.name || release.tag_name,
                                notes: release.body || '',
                                publishedAt: release.published_at,
                                downloadUrl,
                                assetName: asset ? asset.name : `Baladio-${osTag}-${latestVersion}.${osExt}`,
                                assetSize,
                                localCommitSha,
                                remoteCommitSha
                            });
                        } else if (res.statusCode === 404) {
                            resolve({
                                success: true,
                                hasUpdate: false,
                                currentVersion: app.getVersion(),
                                message: 'No releases found on GitHub repository yet.'
                            });
                        } else {
                            resolve({
                                success: false,
                                currentVersion: app.getVersion(),
                                message: `GitHub API returned HTTP ${res.statusCode}`
                            });
                        }
                    } catch (e) {
                        resolve({ success: false, currentVersion: app.getVersion(), message: e.message });
                    }
                });
            });

            req.on('error', (err) => resolve({ success: false, currentVersion: app.getVersion(), message: err.message }));
            req.on('timeout', () => {
                req.destroy();
                resolve({ success: false, currentVersion: app.getVersion(), message: 'Connection timed out' });
            });
        });
    });

    ipcMain.handle('updater:download', async (_event, { downloadUrl, assetName }) => {
        return new Promise((resolve, reject) => {
            if (!downloadUrl) return reject(new Error('No download URL provided'));

            const isTrustedHost = (hostname) => {
                if (!hostname) return false;
                const h = hostname.toLowerCase();
                return h === 'github.com' ||
                       h.endsWith('.github.com') ||
                       h === 'githubusercontent.com' ||
                       h.endsWith('.githubusercontent.com') ||
                       h.endsWith('.amazonaws.com');
            };

            try {
                const parsedUrl = new URL(downloadUrl);
                if (!isTrustedHost(parsedUrl.hostname)) {
                    return reject(new Error('Security violation: Update download rejected from untrusted host: ' + parsedUrl.hostname));
                }
            } catch (e) {
                return reject(new Error('Invalid update download URL'));
            }

            const updatesDir = getUpdatesDir();
            // Prevent path traversal in assetName: enforce flat filename and sanitize
            const safeName = path.basename(assetName || 'update-package.bin').replace(/[^a-zA-Z0-9._-]/g, '_');
            const targetPath = path.join(updatesDir, safeName);
            downloadedUpdatePath = targetPath;

            const downloadFile = (currentUrl, redirects = 0) => {
                if (redirects > 5) return reject(new Error('Too many redirects'));
                const client = currentUrl.startsWith('https') ? https : http;

                client.get(currentUrl, {
                    headers: { 'User-Agent': 'Baladio-Desktop/' + app.getVersion() }
                }, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        try {
                            const redirectedUrl = new URL(res.headers.location, currentUrl);
                            if (redirectedUrl.protocol !== 'https:') {
                                return reject(new Error('Insecure protocol in update redirect'));
                            }
                            if (!isTrustedHost(redirectedUrl.hostname)) {
                                return reject(new Error('Redirected update download to untrusted host: ' + redirectedUrl.hostname));
                            }
                            return downloadFile(redirectedUrl.href, redirects + 1);
                        } catch (e) {
                            return reject(new Error('Invalid redirect URL in update download: ' + e.message));
                        }
                    }
                    if (res.statusCode !== 200) {
                        return reject(new Error(`Download failed: HTTP ${res.statusCode}`));
                    }

                    const total = parseInt(res.headers['content-length'] || '0', 10);
                    let received = 0;
                    const file = fs_.createWriteStream(targetPath);

                    res.on('data', (chunk) => {
                        received += chunk.length;
                        const pct = total > 0 ? Math.round((received / total) * 100) : 0;
                        if (mainWindow && !mainWindow.isDestroyed()) {
                            mainWindow.webContents.send('updater:progress', {
                                percent: pct,
                                received,
                                total
                            });
                        }
                    });

                    res.pipe(file);
                    file.on('finish', () => {
                        file.close(() => {
                            if (mainWindow && !mainWindow.isDestroyed()) {
                                mainWindow.webContents.send('updater:downloaded', {
                                    path: targetPath,
                                    filename: safeName
                                });
                            }
                            resolve({ success: true, path: targetPath });
                        });
                    });

                    file.on('error', (err) => {
                        try { fs_.unlinkSync(targetPath); } catch {}
                        reject(err);
                    });
                }).on('error', reject);
            };

            downloadFile(downloadUrl);
        });
    });

    ipcMain.handle('updater:install', async () => {
        const updateFile = downloadedUpdatePath;
        const updatesDir = getUpdatesDir();
        if (updateFile && fs_.existsSync(updateFile) && path.resolve(updateFile).startsWith(path.resolve(updatesDir))) {
            try {
                if (process.platform === 'win32' && updateFile.endsWith('.exe')) {
                    const { spawn } = require('child_process');
                    spawn(updateFile, ['/S'], { detached: true, stdio: 'ignore' }).unref();
                } else {
                    shell.openPath(updateFile);
                }
            } catch (e) {
                console.error('[Baladio Updater] Failed to launch installer:', e);
            }
        }

        setTimeout(() => {
            app.relaunch();
            app.exit(0);
        }, 1200);
        return true;
    });

    ipcMain.handle('app:server-url',        () => SERVER_URL);
    ipcMain.handle('app:songs-dir',         () => getSongsDir());
    ipcMain.handle('app:set-songs-dir',     (_e, newDir) => setSongsDir(newDir));
    ipcMain.handle('app:open-songs-folder', () => {
        const songsDir = getSongsDir();
        if (!fs_.existsSync(songsDir)) fs_.mkdirSync(songsDir, { recursive: true });
        shell.openPath(songsDir);
        return songsDir;
    });
    ipcMain.handle('app:version',           () => app.getVersion());

    // Export directory & file saving
    ipcMain.handle('app:export-dir',         () => getExportDir());
    ipcMain.handle('app:set-export-dir',     (_e, newDir) => setExportDir(newDir));
    ipcMain.handle('app:open-export-folder', () => {
        const exportDir = getExportDir();
        if (!fs_.existsSync(exportDir)) fs_.mkdirSync(exportDir, { recursive: true });
        shell.openPath(exportDir);
        return exportDir;
    });
    ipcMain.handle('app:save-export', async (_e, { filename, data }) => {
        try {
            const exportDir = getExportDir();
            if (!fs_.existsSync(exportDir)) fs_.mkdirSync(exportDir, { recursive: true });
            const safeName = (filename || 'export.mp3').replace(/[/\\?%*:|"<>]/g, '-');
            let targetPath = path.join(exportDir, safeName);
            if (fs_.existsSync(targetPath)) {
                const ext = path.extname(safeName);
                const base = path.basename(safeName, ext);
                let c = 1;
                while (fs_.existsSync(targetPath)) {
                    targetPath = path.join(exportDir, `${base} (${c})${ext}`);
                    c++;
                }
            }
            const buffer = Buffer.isBuffer(data) ? data : (data instanceof Uint8Array ? Buffer.from(data) : Buffer.from(data, 'base64'));
            fs_.writeFileSync(targetPath, buffer);
            console.log('[Baladio] Export saved successfully to:', targetPath);
            return { success: true, filePath: targetPath, filename: path.basename(targetPath), exportDir };
        } catch (err) {
            console.error('[Baladio] Failed to save export file:', err);
            throw err;
        }
    });

    // Launch on OS startup (cross-platform via Electron login items)
    ipcMain.handle('app:get-login-item', () => {
        const settings = app.getLoginItemSettings();
        return { openAtLogin: settings.openAtLogin };
    });
    ipcMain.handle('app:set-login-item', (_e, { openAtLogin }) => {
        app.setLoginItemSettings({
            openAtLogin: !!openAtLogin,
            args: ['--hidden']
        });
        return { openAtLogin: !!openAtLogin };
    });

    // Close-to-tray preference
    ipcMain.handle('app:get-close-to-tray', () => ({ closeToTray }));
    ipcMain.handle('app:set-close-to-tray', (_e, { enabled }) => {
        closeToTray = !!enabled;
        saveCloseToTraySetting(closeToTray);
        return { closeToTray };
    });
}

app.whenReady().then(async () => {
    cleanUpdatesDir();
    closeToTray = loadCloseToTraySetting();
    if (!isStartupHidden && typeof app.getLoginItemSettings === 'function') {
        isStartupHidden = app.getLoginItemSettings().wasOpenedAtLogin;
    }
    session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => {
        cb(['media', 'mediaKeySystem', 'pointerLock', 'notifications'].includes(permission));
    });

    // Dynamically resolve port: checks saved port, tests availability, and auto-migrates if port is occupied by another app
    const resolved = await resolveServerPort();
    PORT = resolved.port;
    SERVER_URL = `http://localhost:${PORT}`;
    const alreadyRunning = resolved.alreadyRunning;

    registerIpc();

    if (!alreadyRunning) {
        // Server is not running yet: show the progress screen only if not launched silently in background tray
        if (!isStartupHidden) {
            createSplashWindow();
        }

        try {
            await ensureYtDlp(splashWindow);
            await startServerDetached(splashWindow);
            console.log('[Baladio] Background server ready at ' + SERVER_URL);

            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.webContents.send('splash:ready');
                // Brief pause so the user sees the 100% completion glow
                await new Promise((r) => setTimeout(r, 450));
            }
        } catch (err) {
            console.error('[Baladio] Server failed to start:', err.message);
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
                splashWindow = null;
            }
            dialog.showErrorBox('Baladio - Server Error',
                'Could not start the music server:\n\n' + err.message + '\n\nMake sure port ' + PORT + ' is available.');
            app.quit();
            return;
        }
    } else {
        console.log('[Baladio] Server is already running at ' + SERVER_URL + ' - connecting directly.');
        ensureYtDlp().catch(() => {});
    }

    createTray();
    createWindow();
    createDesktopShortcut();

    if (process.platform === 'win32') {
        try {
            app.setJumpList([
                {
                    type: 'tasks',
                    items: [
                        {
                            type: 'task',
                            title: 'Open Songs Folder',
                            description: 'Open your local songs folder in Explorer',
                            program: process.execPath,
                            args: '--open-songs',
                            iconPath: APP_ICON_PATH,
                            iconIndex: 0
                        }
                    ]
                }
            ]);
        } catch {}
    }

    if (process.argv.includes('--open-songs')) {
        const songsDir = getSongsDir();
        if (!fs_.existsSync(songsDir)) fs_.mkdirSync(songsDir, { recursive: true });
        shell.openPath(songsDir);
    }

    app.on('activate', () => {
        showMainWindow();
    });
});

app.on('window-all-closed', (e) => { if (!isQuitting) e.preventDefault(); });
app.on('before-quit', () => {
    isQuitting = true;
    stopServer().catch(() => {});
});
