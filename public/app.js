// â”€â”€â”€ Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Icons = {
    playCircle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    settings:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    music:      `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    edit:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>`,
    remove:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    plus:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    check:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    flame:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    mic:        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>`,
    disc:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
    musicNote:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    globe:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    calendar:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
};

// â”€â”€â”€ State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let allSongs        = [];
let playlists       = [];
let currentQueue    = [];
let currentQueueIndex = -1;
let currentPlaylistId = null;
let isPlaying       = false;
let is8DActive      = false;
let reverbActive    = false;
let loopMode        = 0; // 0=off 1=loop-song 2=loop-all
let coverBustMap    = {}; // filename -> timestamp, for cache-busting after cover upload
let playerVisible   = true;

// Temp state for create-playlist modal cover
let createCoverFile = null;

// â”€â”€â”€ Theme Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTheme() {
    const saved = localStorage.getItem('lofi-theme') || 'dark';
    applyTheme(saved);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = '';
    } else {
        sunIcon.style.display = '';
        moonIcon.style.display = 'none';
    }
    localStorage.setItem('lofi-theme', theme);
}

document.getElementById('btn-theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

initTheme();

// Web Audio API
const EffectConfig = {
    reverb: {
        duration: 2.2, // Length of the reverb tail in seconds
        decay: 3.5,    // How quickly the reverb fades out
        wetGain: 0.85, // Volume of the echo
        dryGain: 0.45   // Volume of the original song when reverb is on
    },
    eightD: {
        speed: 0.8     // Speed of the audio rotating around your head
    },
    eq: {
        bass: 0,
        treble: 0
    }
};

let audioCtx, analyser, source, masterVolumeGain;
let isAudioInitialized = false;

// 8D nodes
let hrtfPanner, preGain, postGain;
let roomConvolver, dryGain, wetGain;
let depthFilter;
let _8dRafId = null;
let _8dAngle  = 0;

// Volume
const MAX_GAIN = 6.0;
function applyVolume(sliderVal) {
    const gain = (sliderVal / 2.0) * MAX_GAIN; // slider 0–2 → gain 0–MAX_GAIN
    if (isAudioInitialized && masterVolumeGain) {
        masterVolumeGain.gain.value = gain;
    } else {
        // Web Audio not yet started — fall back to native volume (clamped 0-1)
        audioElement.volume = Math.min(sliderVal, 1);
    }
}

// Reverb & EQ nodes
let reverbConvolver, reverbDry, reverbWet;
let reverbOutput, bassFilter, trebleFilter;
let _8dLastTime = null;

// â”€â”€â”€ DOM refs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const views = {
    home:     document.getElementById('view-home'),
    explore:  document.getElementById('view-explore'),
    library:  document.getElementById('view-library'),
    playlist: document.getElementById('view-playlist'),
    settings: document.getElementById('view-settings')
};
const appContainer  = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const playerBar     = document.getElementById('player-bar');
const btnTogglePlayer = document.getElementById('btn-toggle-player');
const audioElement  = document.getElementById('audio-element');
const canvas        = document.getElementById('visualizer');
const canvasCtx     = canvas.getContext('2d');

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function formatTime(s) {
    if (isNaN(s) || s === 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function toTitleCase(str) {
    if (!str) return str;
    return str.replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

// Returns formatted playlist tags for a song, e.g. ['#lofi', '#chill-vibes']
function getSongPlaylistTags(filename) {
    return playlists
        .filter(pl => pl.songs.includes(filename))
        .map(pl => '#' + pl.name.trim().toLowerCase().replace(/\s+/g, '-'));
}

function getCoverUrl(song) {
    const bust = coverBustMap[song.filename] ? `?t=${coverBustMap[song.filename]}` : '';
    return `/api/cover/${encodeURIComponent(song.filename)}${bust}`;
}

// Returns the cover HTML for a playlist â€” uses custom cover if set, else mosaic/default
function getPlaylistCoverHtml(pl, plSongs) {
    if (pl.hasCover) {
        // Always use Date.now() to bust browser cache after cover uploads
        return `<img src="/api/playlist-cover/${pl.id}?t=${Date.now()}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">`;
    }
    return buildMosaic(plSongs);
}

function isNameTaken(name, excludeId = null) {
    return playlists.some(p => p.name.trim().toLowerCase() === name.trim().toLowerCase() && p.id !== excludeId);
}

// â”€â”€â”€ Toggle Player Visibility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function updateTogglePlayerBtn() {
    document.getElementById('toggle-player-hide-icon').style.display = playerVisible ? '' : 'none';
    document.getElementById('toggle-player-show-icon').style.display = playerVisible ? 'none' : '';
    btnTogglePlayer.title = playerVisible ? 'Hide player' : 'Show player';
}

btnTogglePlayer.addEventListener('click', () => {
    playerVisible = !playerVisible;
    if (playerVisible) {
        playerBar.classList.remove('hidden');
        appContainer.classList.add('has-player');
    } else {
        playerBar.classList.add('hidden');
        appContainer.classList.remove('has-player');
    }
    updateTogglePlayerBtn();
});

// â”€â”€â”€ Playback State Persistence â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function savePlaybackState() {
    if (!currentQueue.length || currentQueueIndex < 0) return;
    const song = currentQueue[currentQueueIndex];
    try {
        localStorage.setItem('lofi-playback', JSON.stringify({
            filename: song.filename,
            currentTime: audioElement.currentTime,
            queueFilenames: currentQueue.map(s => s.filename),
            queueIndex: currentQueueIndex
        }));
    } catch(e) {}
}

async function restorePlaybackState() {
    const raw = localStorage.getItem('lofi-playback');
    if (!raw) return;
    try {
        const { filename, currentTime, queueFilenames, queueIndex } = JSON.parse(raw);
        const queue = (queueFilenames || []).map(f => allSongs.find(s => s.filename === f)).filter(Boolean);
        if (!queue.length) return;
        const idx = Math.min(Math.max(queueIndex || 0, 0), queue.length - 1);
        const song = queue[idx];
        if (!song) return;

        currentQueue = queue;
        currentQueueIndex = idx;
        isPlaying = false;

        playerBar.classList.remove('hidden');
        appContainer.classList.add('has-player');
        playerVisible = true;
        btnTogglePlayer.classList.remove('hidden');
        updateTogglePlayerBtn();

        audioElement.src = `/stream/${encodeURIComponent(song.filename)}`;
        audioElement.addEventListener('loadedmetadata', () => {
            const t = Math.min(currentTime || 0, audioElement.duration || 0);
            audioElement.currentTime = t;
            const seekBar = document.getElementById('seek-bar');
            seekBar.max   = audioElement.duration;
            seekBar.value = t;
            document.getElementById('time-current').textContent = formatTime(t);
            document.getElementById('time-total').textContent   = formatTime(audioElement.duration);
        }, { once: true });

        updatePlayerUI(song);
        setPlayPauseIcon(false);
    } catch(e) {
        console.error('Failed to restore playback state:', e);
    }
}

// â”€â”€â”€ Init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function init() {
    try {
        const res = await fetch('/api/library');
        allSongs = await res.json();

        if (allSongs.length === 0) {
            welcomeScreen.classList.remove('hidden');
            appContainer.classList.add('hidden');
        } else {
            welcomeScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            await loadPlaylists();
            renderExploreSongs();
            await loadHistoryCache();
            renderHome();
            await restorePlaybackState();
        }
    } catch (e) {
        console.error('Failed to load library:', e);
        welcomeScreen.classList.remove('hidden');
    }
}

document.getElementById('btn-init-scan').addEventListener('click', () => location.reload());

// â”€â”€â”€ Play History â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const HISTORY_KEY = 'lofi-history';
const MAX_HISTORY  = 50;

// Server-side history cache (loaded once, updated on each play)
let _historyCache = null;

async function loadHistoryCache() {
    if (_historyCache !== null) return;
    try {
        const res = await fetch('/api/history');
        _historyCache = await res.json();
        // One-time migrate any existing localStorage history to server
        const local = localStorage.getItem(HISTORY_KEY);
        if (local) {
            const entries = JSON.parse(local);
            if (entries.length > 0) {
                await fetch('/api/history/migrate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ entries })
                });
                localStorage.removeItem(HISTORY_KEY);
                const res2 = await fetch('/api/history');
                _historyCache = await res2.json();
                console.log('Migrated', entries.length, 'history entries to server');
            }
        }
    } catch(e) {
        console.error('History load failed:', e);
        _historyCache = [];
    }
}

function addToHistory(song) {
    const now = Date.now();
    const d   = new Date(now);
    const entry = {
        filename:  song.filename,
        title:     song.title,
        artist:    song.artist,
        duration:  song.duration || 0,
        playedAt:  now,
        hour:      d.getHours(),
        dayOfWeek: d.getDay(),
        weekNum:   getISOWeek(d),
        month:     d.getMonth(),
        year:      d.getFullYear(),
        playlists: playlists.filter(pl => pl.songs.includes(song.filename)).map(pl => pl.id),
        effects: {
            speed:  parseFloat(document.getElementById('speed-input')?.value || 1),
            reverb: reverbActive,
            eightD: is8DActive,
            deep:   !!document.getElementById('btn-deep')?.classList.contains('active')
        }
    };
    // Update cache immediately so home stats refresh without waiting for server
    if (_historyCache) _historyCache.unshift(entry);
    // Persist to server in background
    fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
    }).catch(e => console.error('History save failed:', e));
}

function getISOWeek(d) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

function getHistory() {
    return _historyCache || [];
}

// â”€â”€â”€ Home view â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function getGreeting() {
    const h = new Date().getHours();
    if (h < 5)  return '\u{1F319} Late night session';
    if (h < 12) return '\u2600\uFE0F Good morning';
    if (h < 17) return '\u{1F3B5} Good afternoon';
    if (h < 21) return '\u{1F306} Good evening';
    return '\u{1F319} Good night';
}

function computeHomeStats() {
    const history = getHistory();
    const songCounts = {};
    history.forEach(h => { songCounts[h.filename] = (songCounts[h.filename] || 0) + 1; });
    const topFilename = Object.entries(songCounts).sort((a,b) => b[1]-a[1])[0];
    const topSong = topFilename ? allSongs.find(s => s.filename === topFilename[0]) : null;

    const artistCounts = {};
    history.forEach(h => {
        const a = h.artist || (allSongs.find(s => s.filename === h.filename)?.artist) || 'Unknown Artist';
        if (a && a !== 'Unknown Artist') artistCounts[a] = (artistCounts[a] || 0) + 1;
    });
    const topArtistEntry = Object.entries(artistCounts).sort((a,b) => b[1]-a[1])[0];

    const plCounts = {};
    playlists.forEach(pl => { plCounts[pl.id] = history.filter(h => pl.songs.includes(h.filename)).length; });
    const topPlEntry = Object.entries(plCounts).sort((a,b) => b[1]-a[1])[0];
    const topPl = topPlEntry && topPlEntry[1] > 0 ? playlists.find(p => p.id === topPlEntry[0]) : null;

    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const todayCount = history.filter(h => h.playedAt >= todayStart.getTime()).length;

    const uniqueArtists = new Set(
        history.map(h => h.artist).filter(a => a && a !== 'Unknown Artist')
    ).size;

    let streak = 0;
    const dayMs = 86400000;
    let checkDay = new Date(); checkDay.setHours(0,0,0,0);
    while (true) {
        const start = checkDay.getTime(), end = start + dayMs;
        if (history.some(h => h.playedAt >= start && h.playedAt < end)) {
            streak++; checkDay = new Date(start - dayMs);
        } else break;
    }

    return { topSong, topSongPlays: topFilename?.[1] || 0,
             topArtist: topArtistEntry?.[0], topArtistPlays: topArtistEntry?.[1] || 0,
             topPl, todayCount, uniqueArtists, streak, totalPlays: history.length };
}

function renderHome() {
    const greetEl = document.getElementById('hero-greeting');
    if (greetEl) greetEl.textContent = getGreeting();

    const statsRow = document.getElementById('home-stats-row');
    if (!statsRow) return;
    if (!allSongs.length) { statsRow.innerHTML = ''; return; }

    const s = computeHomeStats();
    const none = s.totalPlays === 0;

    statsRow.innerHTML = [
        { icon: Icons.flame, label: 'Top Song',         value: none ? '\u2014' : toTitleCase(s.topSong?.title || '\u2014'), sub: none ? 'Play some songs first' : `${s.topSongPlays} play${s.topSongPlays!==1?'s':''}`, accent: 'pink', color: '#f97316' },
        { icon: Icons.mic, label: 'Top Artist',        value: none ? '\u2014' : toTitleCase(s.topArtist || '\u2014'),      sub: none ? 'No history yet'       : `${s.topArtistPlays} play${s.topArtistPlays!==1?'s':''}`, accent: 'purple', color: '#a78bfa' },
        { icon: Icons.disc, label: 'Hottest Playlist',  value: none ? '\u2014' : toTitleCase(s.topPl?.name || 'None yet'),   sub: none ? 'Add songs to playlists': s.topPl ? 'Most played playlist' : 'Play songs in a playlist', accent: 'blue', color: '#60a5fa' },
        { icon: Icons.musicNote, label: 'Played Today',      value: `${s.todayCount}`, sub: s.todayCount===0?'Nothing yet today':`song${s.todayCount!==1?'s':''} so far`, accent: 'pink', color: '#34d399' },
        { icon: Icons.globe, label: 'Artists Explored',  value: `${s.uniqueArtists}`, sub: 'unique artists played', accent: 'purple', color: '#4ade80' },
        { icon: Icons.calendar, label: 'Day Streak',        value: `${s.streak}`, sub: s.streak===0?'No streak yet':s.streak===1?'day in a row':'days in a row', accent: 'blue', color: '#fbbf24' }
    ].map(c => `<div class="home-stat-card home-stat-${c.accent}">
        <span class="stat-icon" style="color:${c.color}">${c.icon}</span>
        <span class="stat-label">${c.label}</span>
        <span class="stat-value">${c.value}</span>
        <span class="stat-sub">${c.sub}</span>
    </div>`).join('');

    const streakCard = statsRow.children[5];
    if (streakCard) {
        const val = streakCard.querySelector('.stat-value');
        if (val) val.style.color = '#fbbf24';
    }

    renderRecentlyPlayed();
}

function renderRecentlyPlayed() {
    const row = document.getElementById('home-recent-row');
    const section = document.getElementById('home-recent-section');
    if (!row) return;
    const seen = new Set();
    const recent = getHistory()
        .filter(h => { if (seen.has(h.filename)) return false; seen.add(h.filename); return true; })
        .slice(0, 12)
        .map(h => allSongs.find(s => s.filename === h.filename))
        .filter(Boolean);
    if (section) section.style.display = recent.length === 0 ? 'none' : '';
    row.innerHTML = '';
    recent.forEach((song, i) => {
        const card = document.createElement('div');
        card.className = 'recent-card';
        card.style.animationDelay = `${i * 0.04}s`;
        card.innerHTML = `
            <div class="recent-card-img">
                <img src="${getCoverUrl(song)}" loading="lazy"
                     onerror="this.src='/api/cover/default'">
                <div class="recent-play-overlay">${Icons.playCircle}</div>
            </div>
            <span class="recent-card-title">${toTitleCase(song.title)}</span>
            <span class="recent-card-artist">${toTitleCase(song.artist)}</span>`;
        card.addEventListener('click', () => playSongFromList(allSongs, allSongs.findIndex(s => s.filename === song.filename)));
        row.appendChild(card);
    });
}

async function loadPlaylists() {
    const res = await fetch('/api/playlists');
    playlists = await res.json();
    renderSidebarPlaylists();
    renderLibraryPlaylists();
}

// Navigation 
function switchView(viewName) {
    Object.values(views).forEach(v => { if (v) v.classList.add('hidden'); });
    if (views[viewName]) views[viewName].classList.remove('hidden');
    // keep nav active state in sync for top-level views
    if (['home','explore','library'].includes(viewName)) {
        document.querySelectorAll('.nav-link').forEach(l =>
            l.classList.toggle('active', l.dataset.view === viewName));
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        switchView(e.currentTarget.dataset.view);
    });
});

document.getElementById('btn-back-home').addEventListener('click', () => switchView('library'));
document.getElementById('btn-settings-back').addEventListener('click', () => switchView('explore'));

//  Mosaic helper 
function buildMosaic(plSongs) {
    if (plSongs.length >= 4) {
        return `<div class="mosaic">
            <img src="${getCoverUrl(plSongs[0])}" onerror="this.src='/api/cover/default'">
            <img src="${getCoverUrl(plSongs[1])}" onerror="this.src='/api/cover/default'">
            <img src="${getCoverUrl(plSongs[2])}" onerror="this.src='/api/cover/default'">
            <img src="${getCoverUrl(plSongs[3])}" onerror="this.src='/api/cover/default'">
        </div>`;
    } else if (plSongs.length > 0) {
        return `<img src="${getCoverUrl(plSongs[0])}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='/api/cover/default'">`;
    }
    return `<div class="mosaic-default">${Icons.music}</div>`;
}

// â”€â”€â”€ Explore view 
function renderExploreSongs() {
    const container = document.getElementById('explore-songs');
    if (!container) return;
    container.innerHTML = '';
    const sorted = [...allSongs].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );
    sorted.forEach((song) => {
        const originalIndex = allSongs.indexOf(song);
        container.appendChild(buildSongCard(song, originalIndex, allSongs));
    });
}

// Library view card grid with pointer-based drag & rearrange 
let libraryEditMode      = false;
let libraryOrderSnapshot = []; // playlist id order saved when edit mode opens
let dragSourceId         = null;
let lastDragOverId       = null;

function renderLibraryPlaylists() {
    const container = document.getElementById('library-playlists');
    if (!container) return;
    container.innerHTML = '';
    if (playlists.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary);">No playlists yet.</p>';
        return;
    }
    playlists.forEach((pl, i) => {
        const plSongs = pl.songs.map(f => allSongs.find(s => s.filename === f)).filter(Boolean);
        const card = document.createElement('div');
        card.className = 'playlist-card library-card';
        card.dataset.id = pl.id;
        card.innerHTML = `
            ${getPlaylistCoverHtml(pl, plSongs)}
            <div class="playlist-card-actions">
                <button class="playlist-card-action-btn lib-rename" data-id="${pl.id}" title="Rename">${Icons.edit}</button>
                <button class="playlist-card-action-btn lib-delete btn-danger" data-id="${pl.id}" title="Delete">${Icons.trash}</button>
            </div>
            <div class="overlay"><h4>${toTitleCase(pl.name)}</h4><p>${plSongs.length} song${plSongs.length !== 1 ? 's' : ''}</p></div>`;

        // Prevent the action buttons from triggering a drag or the open-playlist click
        const actions = card.querySelector('.playlist-card-actions');
        actions.addEventListener('mousedown', e => e.stopPropagation());
        actions.addEventListener('click', e => e.stopPropagation());

        card.querySelector('.lib-rename').addEventListener('click', e => {
            e.stopPropagation();
            openRenameModal(pl.id);
        });
        card.querySelector('.lib-delete').addEventListener('click', e => {
            e.stopPropagation();
            openDeleteModal(pl.id);
        });

        if (libraryEditMode) {
            // Show action buttons always in edit mode
            actions.style.opacity = '1';

            card.addEventListener('pointerdown', e => {
                // Don't start drag on action buttons
                if (e.target.closest('.playlist-card-actions')) return;

                e.preventDefault();
                card.setPointerCapture(e.pointerId);

                const rect = card.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;

                // Create ghost
                const ghost = card.cloneNode(true);
                ghost.className = 'library-drag-ghost';
                ghost.style.width  = rect.width + 'px';
                ghost.style.height = rect.height + 'px';
                ghost.style.left   = (e.clientX - offsetX) + 'px';
                ghost.style.top    = (e.clientY - offsetY) + 'px';
                document.body.appendChild(ghost);

                // Make original a placeholder
                card.classList.add('is-placeholder');

                dragSourceId   = pl.id;
                lastDragOverId = pl.id;

                function onPointerMove(ev) {
                    ghost.style.left = (ev.clientX - offsetX) + 'px';
                    ghost.style.top  = (ev.clientY - offsetY) + 'px';

                    // Hit-test other cards
                    const els = container.querySelectorAll('.playlist-card:not(.is-placeholder)');
                    for (const el of els) {
                        const r = el.getBoundingClientRect();
                        if (ev.clientX >= r.left && ev.clientX <= r.right &&
                            ev.clientY >= r.top  && ev.clientY <= r.bottom) {
                            const targetId = el.dataset.id;
                            if (targetId !== dragSourceId && targetId !== lastDragOverId) {
                                lastDragOverId = targetId;
                                reorderPlaylists(dragSourceId, targetId);
                            }
                            break;
                        }
                    }
                }

                function onPointerUp() {
                    document.removeEventListener('pointermove', onPointerMove);
                    document.removeEventListener('pointerup', onPointerUp);
                    ghost.remove();
                    // Remove placeholder from the source card (re-find it since re-renders may have occurred)
                    container.querySelectorAll('.playlist-card').forEach(el => {
                        el.classList.remove('is-placeholder');
                    });
                    dragSourceId   = null;
                    lastDragOverId = null;
                    persistPlaylistOrder();
                }

                document.addEventListener('pointermove', onPointerMove);
                document.addEventListener('pointerup', onPointerUp);
            });
        } else {
            card.addEventListener('click', () => openPlaylist(pl.id));
        }
        container.appendChild(card);
    });
}

// Moves the dragged playlist next to the target, re-renders, then plays a FLIP
// animation so the other cards visibly "slide" out of the way â€” Android-style.
function reorderPlaylists(sourceId, targetId) {
    const container = document.getElementById('library-playlists');
    const firstRects = new Map();
    container.querySelectorAll('.playlist-card').forEach(el => {
        firstRects.set(el.dataset.id, el.getBoundingClientRect());
    });

    const fromIndex = playlists.findIndex(p => p.id === sourceId);
    const toIndex   = playlists.findIndex(p => p.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;
    const [moved] = playlists.splice(fromIndex, 1);
    playlists.splice(toIndex, 0, moved);

    renderLibraryPlaylists();

    container.querySelectorAll('.playlist-card').forEach(el => {
        // Skip the placeholder (the dragged card)
        if (el.dataset.id === dragSourceId) { el.classList.add('is-placeholder'); return; }
        const first = firstRects.get(el.dataset.id);
        if (!first) return;
        const last = el.getBoundingClientRect();
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (dx || dy) {
            el.style.transition = 'none';
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)';
                el.style.transform = '';
            });
        }
    });
}

async function persistPlaylistOrder() {
    try {
        await fetch('/api/playlists/reorder', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: playlists.map(p => p.id) })
        });
    } catch (e) {
        console.error('Failed to save playlist order:', e);
    }
}

function setLibraryEditMode(on) {
    libraryEditMode = on;
    const cancelBtn = document.getElementById('btn-library-cancel');
    document.getElementById('library-edit-label').textContent = on ? 'Done' : 'Edit Arrangement';
    document.getElementById('library-edit-icon').innerHTML    = on ? Icons.check : Icons.edit;
    document.getElementById('btn-library-edit').classList.toggle('active', on);
    if (cancelBtn) cancelBtn.classList.toggle('hidden', !on);
    renderLibraryPlaylists();
}

document.getElementById('btn-library-edit').addEventListener('click', () => {
    if (!libraryEditMode) {
        // Entering edit mode â€” snapshot current order
        libraryOrderSnapshot = playlists.map(p => p.id);
    } else {
        // Confirming â€” persist the new order
        persistPlaylistOrder();
    }
    setLibraryEditMode(!libraryEditMode);
});

document.getElementById('btn-library-cancel').addEventListener('click', () => {
    // Restore original order without saving
    const byId = new Map(playlists.map(p => [p.id, p]));
    playlists = libraryOrderSnapshot.map(id => byId.get(id)).filter(Boolean);
    setLibraryEditMode(false);
});

// â”€â”€â”€ Song Card builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildSongCard(song, index, list) {
    const card = document.createElement('div');
    card.className = 'song-card';
    if (currentQueue[currentQueueIndex]?.filename === song.filename) card.classList.add('playing');
    card.innerHTML = `
        <div class="song-card-img-wrapper">
            <img src="${getCoverUrl(song)}" alt="Cover" loading="lazy" onerror="this.src='/api/cover/default'">
            <div class="play-overlay"><span class="icon">${Icons.playCircle}</span></div>
        </div>
        <div class="song-card-info">
            <span class="song-card-title">${toTitleCase(song.title)}</span>
            <span class="song-card-artist">${toTitleCase(song.artist)}</span>
        </div>
        <div class="song-card-actions">
            <div class="settings-icon" title="Edit">${Icons.settings}</div>
            <div class="add-to-playlist-icon" title="Add to Playlist">${Icons.plus}</div>
        </div>`;
    card.addEventListener('click', e => {
        if (e.target.closest('.settings-icon')) openSettings(song);
        else if (e.target.closest('.add-to-playlist-icon')) openAddToPlaylistModal(song);
        else playSongFromList(list, index);
    });
    return card;
}

// â”€â”€â”€ Sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderSidebarPlaylists() {
    return;
}

// â”€â”€â”€ Playlist view â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openPlaylist(id) {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return;
    currentPlaylistId = id;

    document.getElementById('playlist-title').textContent = toTitleCase(pl.name);
    const plSongs = pl.songs.map(f => allSongs.find(s => s.filename === f)).filter(Boolean);
    const totalDur = plSongs.reduce((acc, s) => acc + (s.duration || 0), 0);
    document.getElementById('playlist-duration').textContent =
        `${Math.round(totalDur / 60)} min Â· ${plSongs.length} song${plSongs.length !== 1 ? 's' : ''}`;

    // Cover â€” uses custom cover if set, falls back to mosaic
    const mosaicEl = document.getElementById('playlist-cover-mosaic');
    if (mosaicEl) mosaicEl.innerHTML = getPlaylistCoverHtml(pl, plSongs);

    // Action buttons
    document.getElementById('btn-playlist-add-songs').onclick = () => openBrowseSongsModal(id);
    document.getElementById('btn-playlist-rename').onclick = () => openRenameModal(id);
    document.getElementById('btn-playlist-delete').onclick = () => openDeleteModal(id);
    document.getElementById('btn-playlist-cover').onclick  = () => openCoverModal(id);

    // Song list
    const container = document.getElementById('playlist-songs');
    container.innerHTML = '';
    if (plSongs.length === 0) {
        container.innerHTML = `<p style="color:var(--text-secondary);padding:1rem 0;">This playlist is empty. Go to Explore to add songs!</p>`;
    } else {
        plSongs.forEach((song, index) => {
            const row = document.createElement('div');
            row.className = 'playlist-song-row';
            row.innerHTML = `
                <img src="${getCoverUrl(song)}" onerror="this.src='/api/cover/default'">
                <span class="ps-title">${toTitleCase(song.title)}</span>
                <span class="ps-artist">${toTitleCase(song.artist)}</span>
                <span class="ps-duration">${formatTime(song.duration)}</span>
                <button class="ps-remove" title="Remove">${Icons.remove}</button>`;
            row.addEventListener('click', e => {
                if (e.target.closest('.ps-remove')) removeFromPlaylist(pl.id, song.filename);
                else playSongFromList(plSongs, index);
            });
            container.appendChild(row);
        });
    }
    switchView('playlist');
}

async function removeFromPlaylist(playlistId, filename) {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;
    const newSongs = pl.songs.filter(f => f !== filename);
    await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songs: newSongs })
    });
    await loadPlaylists();
    openPlaylist(playlistId);
}

// Rename Modal 
function openRenameModal(id) {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return;
    const input = document.getElementById('rename-playlist-input');
    const err   = document.getElementById('rename-playlist-error');
    input.value = pl.name;
    err.classList.add('hidden');
    document.getElementById('rename-modal').classList.remove('hidden');
    input.focus(); input.select();

    document.getElementById('btn-rename-confirm').onclick = async () => {
        const newName = input.value.trim();
        if (!newName) return;
        if (isNameTaken(newName, id)) { err.classList.remove('hidden'); return; }
        err.classList.add('hidden');
        await fetch(`/api/playlists/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });
        document.getElementById('rename-modal').classList.add('hidden');
        await loadPlaylists();
        // refresh title if we're currently viewing this playlist
        if (currentPlaylistId === id) document.getElementById('playlist-title').textContent = toTitleCase(newName);
    };
}
document.getElementById('btn-rename-cancel').addEventListener('click', () =>
    document.getElementById('rename-modal').classList.add('hidden'));
document.getElementById('rename-playlist-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-rename-confirm').click();
    if (e.key === 'Escape') document.getElementById('rename-modal').classList.add('hidden');
});

// Delete Modal 
function openDeleteModal(id) {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return;
    document.getElementById('delete-modal-msg').textContent =
        `"${toTitleCase(pl.name)}" will be permanently deleted. This cannot be undone.`;
    document.getElementById('delete-modal').classList.remove('hidden');

    document.getElementById('btn-delete-confirm').onclick = async () => {
        await fetch(`/api/playlists/${id}`, { method: 'DELETE' });
        document.getElementById('delete-modal').classList.add('hidden');
        await loadPlaylists();
        if (currentPlaylistId === id) switchView('library');
    };
}
document.getElementById('btn-delete-cancel').addEventListener('click', () =>
    document.getElementById('delete-modal').classList.add('hidden'));

// Cover Modal
function openCoverModal(id) {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return;

    const img        = document.getElementById('cover-modal-img');
    const defaultEl  = document.getElementById('cover-modal-default');
    const removeBtn  = document.getElementById('btn-cover-remove');
    const uploadInput = document.getElementById('playlist-cover-upload-modal');
    const modal      = document.getElementById('cover-modal');

    let newCoverFile = null;
    let shouldRemove = false;

    // Show current cover or default
    if (pl.hasCover) {
        img.src = `/api/playlist-cover/${id}?t=${Date.now()}`;
        img.style.display = '';
        defaultEl.style.display = 'none';
        removeBtn.style.display = '';
    } else {
        img.style.display = 'none';
        defaultEl.style.display = '';
        removeBtn.style.display = 'none';
    }
    uploadInput.value = '';

    modal.classList.remove('hidden');

    // Upload handler
    uploadInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        newCoverFile = file;
        shouldRemove = false;
        img.src = URL.createObjectURL(file);
        img.style.display = '';
        defaultEl.style.display = 'none';
        removeBtn.style.display = '';
        uploadInput.value = '';
    };

    // Remove cover handler
    removeBtn.onclick = () => {
        shouldRemove = true;
        newCoverFile = null;
        img.style.display = 'none';
        defaultEl.style.display = '';
        removeBtn.style.display = 'none';
    };

    // Cleanup and close
    const closeAndCleanup = () => {
        modal.classList.add('hidden');
        document.getElementById('btn-save-cover-modal').onclick = null;
        document.getElementById('btn-cancel-cover-modal').onclick = null;
    };

    document.getElementById('btn-cancel-cover-modal').onclick = closeAndCleanup;

    // Save handler
    document.getElementById('btn-save-cover-modal').onclick = async () => {
        if (shouldRemove) {
            await fetch(`/api/playlist-cover/${id}`, { method: 'DELETE' });
        } else if (newCoverFile) {
            const formData = new FormData();
            formData.append('cover', newCoverFile);
            await fetch(`/api/playlist-cover/${id}`, { method: 'POST', body: formData });
        }
        await loadPlaylists();
        if (currentPlaylistId === id) {
            const pl2 = playlists.find(p => p.id === id);
            const plSongs2 = pl2 ? pl2.songs.map(f => allSongs.find(s => s.filename === f)).filter(Boolean) : [];
            const mosaicEl = document.getElementById('playlist-cover-mosaic');
            if (mosaicEl) {
                if (pl2 && pl2.hasCover) {
                    mosaicEl.innerHTML = getPlaylistCoverHtml(pl2, []);
                } else {
                    mosaicEl.innerHTML = buildMosaic(plSongs2);
                }
            }
        }
        closeAndCleanup();
    };
}
document.getElementById('btn-cover-modal-close').addEventListener('click', () =>
    document.getElementById('cover-modal').classList.add('hidden'));

// Settings / Edit Metadata
let currentEditingSong = null;
function openSettings(song) {
    currentEditingSong = song;
    document.getElementById('settings-cover').src = getCoverUrl(song);
    document.getElementById('settings-title').value = song.title;
    document.getElementById('settings-artist').value = song.artist;
    document.getElementById('settings-cover-upload').value = '';
    switchView('settings');
}

document.getElementById('settings-cover-upload').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) document.getElementById('settings-cover').src = URL.createObjectURL(file);
});

document.getElementById('btn-save-settings').addEventListener('click', async () => {
    if (!currentEditingSong) return;
    const btn = document.getElementById('btn-save-settings');
    const originalText = btn.textContent;
    btn.textContent = 'Saving...';
    btn.disabled = true;

    const newTitle  = document.getElementById('settings-title').value;
    const newArtist = document.getElementById('settings-artist').value;
    const fileInput = document.getElementById('settings-cover-upload');
    const cbRename  = document.getElementById('cb-rename-file');
    let trackedFilename = currentEditingSong.filename;

    // 1. Save metadata overrides
    await fetch('/api/save-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: trackedFilename, newTitle, newArtist })
    });

    // 2. Upload custom cover if one was selected
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('filename', trackedFilename);
        formData.append('cover', fileInput.files[0]);
        await fetch('/api/upload-cover', { method: 'POST', body: formData });
        coverBustMap[trackedFilename] = Date.now();
    }

    // 3. Rename file on disk if checkbox is checked
    if (cbRename && cbRename.checked) {
        btn.textContent = 'Renaming...';
        try {
            const renameRes = await fetch('/api/rename-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: trackedFilename })
            });
            const renameData = await renameRes.json();
            if (renameData.success && !renameData.unchanged) {
                // Transfer cover bust key to new filename
                if (coverBustMap[trackedFilename]) {
                    coverBustMap[renameData.newFilename] = coverBustMap[trackedFilename];
                    delete coverBustMap[trackedFilename];
                }
                trackedFilename = renameData.newFilename;
            }
        } catch(e) {
            console.error('Rename failed:', e);
        }
    }

    // 4. Refresh library + playlists
    const res = await fetch('/api/library');
    allSongs = await res.json();
    await loadPlaylists();
    renderExploreSongs();

    // 5. Update player UI if this song is currently playing
    const playingSong = currentQueue[currentQueueIndex];
    if (playingSong && (playingSong.filename === currentEditingSong.filename || playingSong.filename === trackedFilename)) {
        const updated = allSongs.find(s => s.filename === trackedFilename);
        if (updated) {
            currentQueue[currentQueueIndex] = updated;
            updatePlayerUI(updated);
        }
    }

    // Reset UI state
    btn.textContent = originalText;
    btn.disabled = false;
    if (cbRename) cbRename.checked = false;

    switchView('explore');
});

// â”€â”€â”€ Search â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) { searchResults.classList.add('hidden'); return; }
    const matches = allSongs.filter(s =>
        s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
    searchResults.innerHTML = '';
    if (matches.length > 0) {
        matches.slice(0, 10).forEach(song => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            const tags = getSongPlaylistTags(song.filename);
            const tagsHtml = tags.length > 0
                ? `<div class="song-tags">${tags.map(t => `<em class="song-tag">${t}</em>`).join('')}</div>`
                : '';
            div.innerHTML = `
                <img src="${getCoverUrl(song)}" onerror="this.src='/api/cover/default'">
                <div style="flex:1;min-width:0">
                    <div style="font-weight:600;font-size:.9rem">${toTitleCase(song.title)}</div>
                    <div style="font-size:.75rem;color:var(--text-secondary)">${toTitleCase(song.artist)}</div>
                    ${tagsHtml}
                </div>
                <button class="search-settings-btn" title="Edit">${Icons.settings}</button>
                <button class="search-add-btn" title="Add to Playlist">${Icons.plus}</button>`;
            div.addEventListener('click', (e) => {
                if (e.target.closest('.search-settings-btn')) {
                    e.stopPropagation();
                    openSettings(song);
                    searchResults.classList.add('hidden');
                    searchInput.value = '';
                } else if (e.target.closest('.search-add-btn')) {
                    e.stopPropagation();
                    openAddToPlaylistModal(song);
                    searchResults.classList.add('hidden');
                    searchInput.value = '';
                } else {
                    playSongFromList(allSongs, allSongs.findIndex(s => s.filename === song.filename));
                    searchResults.classList.add('hidden');
                    searchInput.value = '';
                }
            });
            searchResults.appendChild(div);
        });
        searchResults.classList.remove('hidden');
    } else {
        searchResults.classList.add('hidden');
    }
});
document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) searchResults.classList.add('hidden');
});

// â”€â”€â”€ Create Playlist Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const modalOverlay = document.getElementById('modal-overlay');
const createError  = document.getElementById('create-playlist-error');

document.getElementById('btn-new-playlist').addEventListener('click', () => {
    document.getElementById('new-playlist-name').value = '';
    createError.classList.add('hidden');
    // Reset cover preview
    createCoverFile = null;
    document.getElementById('create-cover-img').style.display = 'none';
    document.getElementById('create-cover-default').style.display = '';
    document.getElementById('btn-create-remove-cover').style.display = 'none';
    document.getElementById('create-cover-upload').value = '';
    modalOverlay.classList.remove('hidden');
    document.getElementById('new-playlist-name').focus();
});

document.getElementById('btn-cancel-playlist').addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    createCoverFile = null;
});

// Cover upload in create modal
document.getElementById('create-cover-upload').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    createCoverFile = file;
    const img = document.getElementById('create-cover-img');
    img.src = URL.createObjectURL(file);
    img.style.display = '';
    document.getElementById('create-cover-default').style.display = 'none';
    document.getElementById('btn-create-remove-cover').style.display = '';
});

document.getElementById('btn-create-remove-cover').addEventListener('click', () => {
    createCoverFile = null;
    document.getElementById('create-cover-img').style.display = 'none';
    document.getElementById('create-cover-default').style.display = '';
    document.getElementById('btn-create-remove-cover').style.display = 'none';
    document.getElementById('create-cover-upload').value = '';
});

document.getElementById('btn-create-playlist').addEventListener('click', async () => {
    const name = document.getElementById('new-playlist-name').value.trim();
    if (!name) {
        createError.textContent = "You must provide a name for the playlist.";
        createError.classList.remove('hidden');
        return;
    }
    if (isNameTaken(name)) {
        createError.textContent = "A playlist with this name already exists.";
        createError.classList.remove('hidden');
        return;
    }
    createError.classList.add('hidden');

    const res  = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    const newPl = await res.json();

    // Upload cover if one was selected
    if (createCoverFile) {
        const formData = new FormData();
        formData.append('cover', createCoverFile);
        await fetch(`/api/playlist-cover/${newPl.id}`, { method: 'POST', body: formData });
    }

    createCoverFile = null;
    await loadPlaylists();
    modalOverlay.classList.add('hidden');
});

document.getElementById('new-playlist-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-create-playlist').click();
    if (e.key === 'Escape') document.getElementById('btn-cancel-playlist').click();
});

// Close modals on backdrop click
[modalOverlay,
 document.getElementById('rename-modal'),
 document.getElementById('delete-modal'),
 document.getElementById('cover-modal'),
 document.getElementById('add-to-playlist-modal'),
 document.getElementById('browse-songs-modal')
].forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) el.classList.add('hidden'); });
});

// â”€â”€â”€ Add to Playlist Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openAddToPlaylistModal(song) {
    const modal = document.getElementById('add-to-playlist-modal');
    const list = document.getElementById('atp-playlist-list');
    const msg = document.getElementById('atp-msg');
    msg.classList.add('hidden');

    list.innerHTML = '';
    if (playlists.length === 0) {
        list.innerHTML = '<p style="color:var(--text-secondary);font-size:0.85rem;text-align:center;padding:16px 0;">No playlists yet. Create one first!</p>';
    } else {
        playlists.forEach(pl => {
            const alreadyIn = pl.songs.includes(song.filename);
            const row = document.createElement('div');
            row.className = 'atp-row' + (alreadyIn ? ' atp-row-disabled' : '');
            const plSongs = pl.songs.map(f => allSongs.find(s => s.filename === f)).filter(Boolean);
            row.innerHTML = `
                <div class="atp-row-cover">${getPlaylistCoverHtml(pl, plSongs)}</div>
                <div class="atp-row-info">
                    <span class="atp-row-name">${toTitleCase(pl.name)}</span>
                    <span class="atp-row-count">${pl.songs.length} song${pl.songs.length !== 1 ? 's' : ''}</span>
                </div>
                ${alreadyIn ? '<span class="atp-already">Added</span>' : `<button class="btn-glass btn-small atp-add-btn">${Icons.plus} Add</button>`}`;
            if (!alreadyIn) {
                row.querySelector('.atp-add-btn').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await addSongToPlaylist(pl.id, song.filename);
                    msg.textContent = `Added to "${toTitleCase(pl.name)}"`;
                    msg.classList.remove('hidden');
                    // Refresh the list
                    setTimeout(() => openAddToPlaylistModal(song), 300);
                });
            }
            list.appendChild(row);
        });
    }
    modal.classList.remove('hidden');
}

async function addSongToPlaylist(playlistId, filename) {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;
    if (pl.songs.includes(filename)) return; // already there
    const newSongs = [...pl.songs, filename];
    await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songs: newSongs })
    });
    await loadPlaylists();
    if (currentPlaylistId === playlistId) openPlaylist(playlistId);
}

document.getElementById('btn-atp-close').addEventListener('click', () =>
    document.getElementById('add-to-playlist-modal').classList.add('hidden'));

// â”€â”€â”€ Browse Songs Modal (Add Songs from playlist page) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openBrowseSongsModal(playlistId) {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;

    const modal = document.getElementById('browse-songs-modal');
    const list = document.getElementById('browse-songs-list');
    const searchInput = document.getElementById('browse-search-input');
    const msg = document.getElementById('browse-msg');
    msg.classList.add('hidden');
    searchInput.value = '';

    function renderBrowseList(filter = '') {
        list.innerHTML = '';
        // Re-read playlist to get fresh song list
        const freshPl = playlists.find(p => p.id === playlistId);
        const q = filter.toLowerCase().trim();
        const filtered = q
            ? allSongs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q))
            : allSongs;

        if (filtered.length === 0) {
            list.innerHTML = '<p style="color:var(--text-secondary);font-size:0.85rem;text-align:center;padding:24px 0;">No songs found.</p>';
            return;
        }

        filtered.forEach(song => {
            const alreadyIn = freshPl && freshPl.songs.includes(song.filename);
            const row = document.createElement('div');
            row.className = 'browse-song-row' + (alreadyIn ? ' browse-song-added' : '');
            const browseTags = getSongPlaylistTags(song.filename);
            const browseTagsHtml = browseTags.length > 0
                ? `<div class="song-tags">${browseTags.map(t => `<em class="song-tag">${t}</em>`).join('')}</div>`
                : '';
            row.innerHTML = `
                <img src="${getCoverUrl(song)}" onerror="this.src='/api/cover/default'">
                <div class="browse-song-info">
                    <span class="browse-song-title">${toTitleCase(song.title)}</span>
                    <span class="browse-song-artist">${toTitleCase(song.artist)}</span>
                    ${browseTagsHtml}
                </div>
                <span class="browse-song-duration">${formatTime(song.duration)}</span>
                ${alreadyIn
                    ? '<span class="atp-already">Added</span>'
                    : `<button class="btn-glass btn-small browse-add-btn">${Icons.plus} Add</button>`
                }`;
            if (!alreadyIn) {
                row.querySelector('.browse-add-btn').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await addSongToPlaylist(playlistId, song.filename);
                    msg.textContent = `"${toTitleCase(song.title)}" added!`;
                    msg.classList.remove('hidden');
                    setTimeout(() => msg.classList.add('hidden'), 2000);
                    renderBrowseList(searchInput.value);
                });
            }
            list.appendChild(row);
        });
    }

    renderBrowseList();
    searchInput.oninput = () => renderBrowseList(searchInput.value);
    modal.classList.remove('hidden');
    searchInput.focus();
}

document.getElementById('btn-browse-close').addEventListener('click', () => {
    document.getElementById('browse-songs-modal').classList.add('hidden');
    document.getElementById('browse-search-input').value = '';
});

// â”€â”€â”€ Player â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function playSongFromList(list, index) {
    currentQueue = list;
    currentQueueIndex = index;
    loadAndPlaySong(currentQueue[currentQueueIndex]);
}

function loadAndPlaySong(song) {
    audioElement.playbackRate = 1; 
    document.getElementById('speed-input').value = '1.00';
    playerBar.classList.remove('hidden');
    appContainer.classList.add('has-player');
    playerVisible = true;
    btnTogglePlayer.classList.remove('hidden');
    updateTogglePlayerBtn();
    audioElement.src = `/stream/${encodeURIComponent(song.filename)}`;
    initWebAudio();
    // Ensure AudioContext is running before play
    const doPlay = () => audioElement.play().catch(err => console.error('Playback error:', err));
    if (audioCtx && audioCtx.state !== 'running') {
        audioCtx.resume().then(doPlay).catch(doPlay);
    } else {
        doPlay();
    }
    isPlaying = true;
    updatePlayerUI(song);
    setPlayPauseIcon(true);
    savePlaybackState();
    addToHistory(song);
    renderHome();
    document.querySelectorAll('.song-card').forEach(c => c.classList.remove('playing'));
    document.querySelectorAll('.song-card').forEach(c => {
        if (c.querySelector('.song-card-title')?.textContent === song.title) c.classList.add('playing');
    });
}

function updatePlayerUI(song) {
    document.getElementById('player-title').textContent  = toTitleCase(song.title);
    document.getElementById('player-artist').textContent = toTitleCase(song.artist);
    const coverUrl = getCoverUrl(song);
    const pc = document.getElementById('player-cover');
    pc.src = coverUrl;
    pc.onerror = () => { pc.src = '/api/cover/default'; };
    document.getElementById('fs-title').textContent = toTitleCase(song.title);
    document.getElementById('fs-artist').textContent = toTitleCase(song.artist);
    document.getElementById('fs-cover').src = coverUrl;
    document.getElementById('fs-bg').style.backgroundImage = `url(${coverUrl})`;
}

function setPlayPauseIcon(playing) {
    document.getElementById('icon-play').style.display  = playing ? 'none' : '';
    document.getElementById('icon-pause').style.display = playing ? ''     : 'none';
}

function togglePlay() {
    if (!audioElement.src || audioElement.src === window.location.href) return;
    
    if (isPlaying) {
        audioElement.pause();
        setPlayPauseIcon(false);
        isPlaying = false;
    } else {
        initWebAudio();
        const doPlay = () => {
            audioElement.play().catch(err => console.error('Playback error:', err));
            setPlayPauseIcon(true);
            isPlaying = true;
        };
        if (audioCtx && audioCtx.state !== 'running') {
            audioCtx.resume().then(doPlay).catch(doPlay);
        } else {
            doPlay();
        }
    }
}

function playNext() {
    if (!currentQueue.length) return;
    if (loopMode === 1) { audioElement.currentTime = 0; audioElement.play(); return; }
    currentQueueIndex++;
    if (currentQueueIndex >= currentQueue.length) {
        if (loopMode !== 2) {
            currentQueueIndex = currentQueue.length - 1;
            audioElement.pause(); isPlaying = false; setPlayPauseIcon(false);
            return;
        }
        currentQueueIndex = 0;
    }
    loadAndPlaySong(currentQueue[currentQueueIndex]);
}

function playPrev() {
    if (!currentQueue.length) return;
    if (audioElement.currentTime > 3) { audioElement.currentTime = 0; return; }
    currentQueueIndex = (currentQueueIndex - 1 + currentQueue.length) % currentQueue.length;
    loadAndPlaySong(currentQueue[currentQueueIndex]);
}

// â”€â”€â”€ Player Controls â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€â”€ Download with effects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Uses OfflineAudioContext to render the full effect chain to a buffer,
// then encodes it as WAV and triggers a browser download.
// Supports: playback speed, reverb, 8D spatial audio, deep (pitch shift via speed).
async function downloadWithEffects() {
    const song = currentQueue[currentQueueIndex];
    if (!song) return;

    const btn = document.getElementById('btn-download');
    if (btn) { btn.disabled = true; btn.title = 'Renderingâ€¦'; }
    showToast('download', 'Preparing your downloadâ€¦', 8000);

    try {
        // Fetch the raw audio
        const resp = await fetch(`/stream/${encodeURIComponent(song.filename)}`);
        const arrayBuf = await resp.arrayBuffer();

        // Decode with a temporary context to get the source buffer
        const decodeCtx = new (window.AudioContext || window.webkitAudioContext)();
        const sourceBuf = await decodeCtx.decodeAudioData(arrayBuf);
        await decodeCtx.close();

        const sampleRate = sourceBuf.sampleRate;
        const numChannels = sourceBuf.numberOfChannels;
        const speedRate = parseFloat(document.getElementById('speed-input')?.value || 1);
        // OfflineAudioContext renders at 1x; we adjust duration for speed
        const durationSec = sourceBuf.duration / speedRate;
        const offlineCtx = new OfflineAudioContext(
            2, // always stereo output
            Math.ceil(durationSec * sampleRate),
            sampleRate
        );

        // Source node
        const src = offlineCtx.createBufferSource();
        src.buffer = sourceBuf;
        src.playbackRate.value = speedRate;

        let lastNode = src;

        // Reverb chain
        if (reverbActive) {
            const convolver = offlineCtx.createConvolver();
            convolver.buffer = buildImpulseResponse(offlineCtx, EffectConfig.reverb.duration, EffectConfig.reverb.decay, false);
            const dryG = offlineCtx.createGain(); dryG.gain.value = EffectConfig.reverb.dryGain;
            const wetG = offlineCtx.createGain(); wetG.gain.value = EffectConfig.reverb.wetGain;
            const merger = offlineCtx.createGain();
            lastNode.connect(dryG);   dryG.connect(merger);
            lastNode.connect(convolver); convolver.connect(wetG); wetG.connect(merger);
            lastNode = merger;
        }

        // EQ chain
        if (EffectConfig.eq.bass !== 0 || EffectConfig.eq.treble !== 0) {
            const bass = offlineCtx.createBiquadFilter();
            bass.type = 'lowshelf'; bass.frequency.value = 150; bass.gain.value = EffectConfig.eq.bass;
            const treble = offlineCtx.createBiquadFilter();
            treble.type = 'highshelf'; treble.frequency.value = 4000; treble.gain.value = EffectConfig.eq.treble;
            lastNode.connect(bass);
            bass.connect(treble);
            lastNode = treble;
        }

        // 8D HRTF chain
        if (is8DActive) {
            const pan = offlineCtx.createPanner();
            pan.panningModel  = 'HRTF';
            pan.distanceModel = 'inverse';
            pan.refDistance   = 1;
            pan.rolloffFactor = 0.8;
            pan.coneInnerAngle = 360;

            const roomConv = offlineCtx.createConvolver();
            roomConv.buffer = buildImpulseResponse(offlineCtx, 0.6, 2.0, false);
            const dryG2 = offlineCtx.createGain(); dryG2.gain.value = 0.7;
            const wetG2 = offlineCtx.createGain(); wetG2.gain.value = 0.3;
            const filt  = offlineCtx.createBiquadFilter();
            filt.type = 'lowpass'; filt.frequency.value = 20000; filt.Q.value = 0.5;

            lastNode.connect(filt);
            filt.connect(dryG2);   dryG2.connect(pan);
            filt.connect(roomConv); roomConv.connect(wetG2); wetG2.connect(pan);

            // Pre-bake the rotation as AudioParam automation
            const speed = EffectConfig.eightD.speed;
            const steps = Math.ceil(durationSec * 30); // 30 keyframes/sec
            for (let i = 0; i <= steps; i++) {
                const t = (i / steps) * durationSec;
                const angle = t * speed;
                const x = Math.sin(angle);
                const z = -Math.cos(angle);
                const y = Math.sin(angle * 0.3) * 0.15;
                const behindness = (z + 1) / 2;
                pan.positionX.linearRampToValueAtTime(x, t);
                pan.positionY.linearRampToValueAtTime(y, t);
                pan.positionZ.linearRampToValueAtTime(z, t);
                filt.frequency.linearRampToValueAtTime(18000 - behindness * 12500, t);
            }
            lastNode = pan;
        }

        lastNode.connect(offlineCtx.destination);
        src.start(0);

        const renderedBuf = await offlineCtx.startRendering();

        // Encode to MP3 via lamejs (async to avoid freezing the UI)
        const mp3Data = await encodeMP3Async(renderedBuf);
        const blob = new Blob(mp3Data, { type: 'audio/mp3' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        const safeName = (song.title || song.filename).replace(/[/\\?%*:|"<>]/g, '-');
        const suffix = [
            speedRate !== 1 ? `${speedRate}x` : '',
            is8DActive  ? '8D'    : '',
            reverbActive? 'reverb': '',
            document.getElementById('btn-deep')?.classList.contains('active') ? 'deep' : ''
        ].filter(Boolean).join('-');
        a.download = suffix ? `${safeName} (${suffix}).mp3` : `${safeName}.mp3`;
        a.href = url;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showToast('download', 'Download started!', 2500);
    } catch(err) {
        console.error('Download failed:', err);
        alert('Download failed: ' + err.message);
    } finally {
        if (btn) { btn.disabled = false; btn.title = 'Download'; }
    }
}

// Encode an AudioBuffer to MP3 using lamejs â€” async to avoid freezing the page
async function encodeMP3Async(buffer) {
    const numCh   = buffer.numberOfChannels;
    const sr      = buffer.sampleRate;
    const kbps    = 192;
    const samples = buffer.length;

    // lamejs requires Int16 input
    const toInt16 = (floatArr) => {
        const out = new Int16Array(floatArr.length);
        for (let i = 0; i < floatArr.length; i++) {
            const s = Math.max(-1, Math.min(1, floatArr[i]));
            out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return out;
    };

    const leftData  = toInt16(buffer.getChannelData(0));
    const rightData = toInt16(numCh > 1 ? buffer.getChannelData(1) : buffer.getChannelData(0));

    const encoder = new lamejs.Mp3Encoder(2, sr, kbps);
    const mp3Chunks = [];
    const chunkSize = 1152 * 32; // yield every ~32 lamejs frames to keep UI alive

    const yieldFrame = () => new Promise(resolve => setTimeout(resolve, 0));

    for (let i = 0; i < samples; i += chunkSize) {
        // Process one large batch
        for (let j = i; j < Math.min(i + chunkSize, samples); j += 1152) {
            const left  = leftData.subarray(j, j + 1152);
            const right = rightData.subarray(j, j + 1152);
            const chunk = encoder.encodeBuffer(left, right);
            if (chunk.length > 0) mp3Chunks.push(new Uint8Array(chunk));
        }
        // Yield control back to the browser between batches
        await yieldFrame();
    }
    const final = encoder.flush();
    if (final.length > 0) mp3Chunks.push(new Uint8Array(final));
    return mp3Chunks;
}

// Show a non-intrusive toast notification
// type: 'download' | 'success' | 'info' | 'error'
function showToast(type, message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-msg">${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('toast-visible'));
    });
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
}

(function setupEventListeners() {
    const btnEffectConfig = document.getElementById('btn-effect-config');
    const effectPanel = document.getElementById('effect-config-panel');
    if (btnEffectConfig && effectPanel) {
        // Initialize as collapsed instead of hidden
        if (effectPanel.classList.contains('hidden')) {
            effectPanel.classList.remove('hidden');
            effectPanel.classList.add('collapsed');
        }
        btnEffectConfig.addEventListener('click', e => {
            e.stopPropagation();
            const isHidden = effectPanel.classList.toggle('collapsed');
            btnEffectConfig.classList.toggle('active', !isHidden);
        });
        document.addEventListener('click', e => {
            if (!effectPanel.contains(e.target) && e.target !== btnEffectConfig) {
                effectPanel.classList.add('collapsed');
                btnEffectConfig.classList.remove('active');
            }
        });
        const wire = (id, fn, valId, fmt) => {
            const el = document.getElementById(id);
            const vl = document.getElementById(valId);
            if (!el) return;
            el.addEventListener('input', () => {
                fn(parseFloat(el.value));
                if (vl) vl.textContent = fmt(parseFloat(el.value));
            });
        };
        wire('cfg-8d-speed',   v => { EffectConfig.eightD.speed = v; }, 'cfg-8d-speed-val', v => v.toFixed(2));
        wire('cfg-reverb-wet', v => { EffectConfig.reverb.wetGain = v; if (reverbActive && reverbWet) reverbWet.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05); }, 'cfg-reverb-wet-val', v => v.toFixed(2));
        wire('cfg-reverb-dry', v => { EffectConfig.reverb.dryGain = v; if (reverbActive && reverbDry) reverbDry.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05); }, 'cfg-reverb-dry-val', v => v.toFixed(2));
        wire('cfg-reverb-dur', v => { EffectConfig.reverb.duration = v; }, 'cfg-reverb-dur-val', v => v.toFixed(1) + 's');
        wire('cfg-bass', v => { EffectConfig.eq.bass = v; if(bassFilter) bassFilter.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05); }, 'cfg-bass-val', v => (v > 0 ? '+' : '') + v.toFixed(1) + 'dB');
        wire('cfg-treble', v => { EffectConfig.eq.treble = v; if(trebleFilter) trebleFilter.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05); }, 'cfg-treble-val', v => (v > 0 ? '+' : '') + v.toFixed(1) + 'dB');
    }

    document.getElementById('btn-play-pause').addEventListener('click', togglePlay);

    // Download
    const btnDownload = document.getElementById('btn-download');
    if (btnDownload) btnDownload.addEventListener('click', downloadWithEffects);
    document.getElementById('btn-next').addEventListener('click', playNext);
    document.getElementById('btn-prev').addEventListener('click', playPrev);

    const seekBar     = document.getElementById('seek-bar');
    const timeCurrent = document.getElementById('time-current');
    const timeTotal   = document.getElementById('time-total');

    let _lastSaveTime = 0;
    audioElement.addEventListener('timeupdate', () => {
        if (isNaN(audioElement.duration)) return;
        seekBar.max   = audioElement.duration;
        seekBar.value = audioElement.currentTime;
        timeCurrent.textContent = formatTime(audioElement.currentTime);
        timeTotal.textContent   = formatTime(audioElement.duration);
        const now = Date.now();
        if (now - _lastSaveTime > 5000) { _lastSaveTime = now; savePlaybackState(); }
    });
    seekBar.addEventListener('input', () => { audioElement.currentTime = seekBar.value; });
    audioElement.addEventListener('ended', playNext);

    // Volume
    const volSlider = document.getElementById('volume-slider');
    const btnMute   = document.getElementById('btn-mute');

    // Set initial volume (slider starts at 1.0 = half of max range)
    volSlider.value = 1.0;
    applyVolume(1.0);

    function setMuteIcon(muted) {
        document.getElementById('icon-vol-up').style.display   = muted ? 'none' : '';
        document.getElementById('icon-vol-mute').style.display = muted ? ''     : 'none';
    }

    volSlider.addEventListener('input', e => {
        const val = parseFloat(e.target.value);
        applyVolume(val);
        setMuteIcon(val === 0);
    });

    btnMute.addEventListener('click', () => {
        const curVal = parseFloat(volSlider.value);
        if (curVal > 0) {
            volSlider.dataset.lastVol = curVal;
            volSlider.value = 0; applyVolume(0); setMuteIcon(true);
        } else {
            const v = parseFloat(volSlider.dataset.lastVol) || 1.0;
            volSlider.value = v; applyVolume(v); setMuteIcon(false);
        }
    });

    // Loop
    const btnLoop = document.getElementById('btn-loop');
    const svgAll = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`;
    const svgOne = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/><text x="9" y="14" font-size="7" fill="currentColor" stroke="none" font-weight="bold">1</text></svg>`;
    btnLoop.addEventListener('click', () => {
        loopMode = (loopMode + 1) % 3;
        btnLoop.classList.toggle('active', loopMode > 0);
        btnLoop.innerHTML = loopMode === 1 ? svgOne : svgAll;
        btnLoop.title = ['No Loop','Loop Song','Loop All'][loopMode];
    });

    // Playback Speed
    const speedInput = document.getElementById('speed-input');
    speedInput.addEventListener('input', () => {
        let v = parseFloat(speedInput.value);
        if (isNaN(v)) return;
        if (v < 0.5) v = 0.5;
        if (v > 2) v = 2;
        audioElement.playbackRate = v;
    });
    speedInput.addEventListener('wheel', (e) => {
        e.preventDefault();
        let v = parseFloat(speedInput.value) || 1;
        if (e.deltaY < 0) v += 0.05;
        else v -= 0.05;
        if (v < 0.5) v = 0.5;
        if (v > 2) v = 2;
        speedInput.value = v.toFixed(2);
        audioElement.playbackRate = v;
    });

    // Effect Config Reset
    const btnEffectReset = document.getElementById('btn-effect-reset');
    if (btnEffectReset) {
        btnEffectReset.addEventListener('click', () => {
            const defaults = {
                'cfg-8d-speed': 1.2,
                'cfg-reverb-wet': 0.75,
                'cfg-reverb-dry': 0.40,
                'cfg-reverb-dur': 2.2,
                'cfg-bass': 0,
                'cfg-treble': 0
            };
            for (const [id, val] of Object.entries(defaults)) {
                const el = document.getElementById(id);
                if (el) {
                    el.value = val;
                    el.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    // 8D
    const btn8D = document.getElementById('btn-8d');
    btn8D.addEventListener('click', () => {
        is8DActive = !is8DActive;
        btn8D.classList.toggle('active', is8DActive);
        btn8D.classList.toggle('glow-pulse', is8DActive);
        is8DActive ? enable8D() : disable8D();
    });

    // Reverb
    const btnReverb = document.getElementById('btn-reverb');
    if (btnReverb) {
        btnReverb.addEventListener('click', () => {
            reverbActive = !reverbActive;
            btnReverb.classList.toggle('active', reverbActive);
            btnReverb.classList.toggle('glow-pulse', reverbActive);
            reverbActive ? enableReverb() : disableReverb();
        });
    }

    // Deep (Pitch Shift)
    const btnDeep = document.getElementById('btn-deep');
    let isDeepActive = false;
    if (btnDeep) {
        btnDeep.addEventListener('click', () => {
            isDeepActive = !isDeepActive;
            btnDeep.classList.toggle('active', isDeepActive);
            btnDeep.classList.toggle('glow-pulse', isDeepActive);
            audioElement.preservesPitch = !isDeepActive;
            if (audioElement.mozPreservesPitch !== undefined) audioElement.mozPreservesPitch = !isDeepActive;
            if (audioElement.webkitPreservesPitch !== undefined) audioElement.webkitPreservesPitch = !isDeepActive;
        });
    }

    // Fullscreen
    const fsView = document.getElementById('fullscreen-player');
    const fsBtn = document.getElementById('btn-fullscreen');
    const iconExpand = document.getElementById('icon-fs-expand');
    const iconCompress = document.getElementById('icon-fs-compress');
    let isFullscreen = false;

    window.toggleFullscreen = function() {
        isFullscreen = !isFullscreen;
        if (isFullscreen) {
            document.body.classList.add('fullscreen-open');
            fsView.classList.remove('hidden');
            playerBar.style.zIndex = '2001';
            if (iconExpand) iconExpand.style.display = 'none';
            if (iconCompress) iconCompress.style.display = '';
        } else {
            document.body.classList.remove('fullscreen-open');
            fsView.classList.add('hidden');
            playerBar.style.zIndex = '1000';
            if (iconExpand) iconExpand.style.display = '';
            if (iconCompress) iconCompress.style.display = 'none';
        }
    };

    if (fsBtn) {
        fsBtn.addEventListener('click', toggleFullscreen);
    }
})();

// Keyboard Shortcuts
document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space')                         { e.preventDefault(); togglePlay(); }
    else if (e.code === 'ArrowRight') {
        if (e.shiftKey) playNext();
        else { e.preventDefault(); audioElement.currentTime = Math.min(audioElement.duration || 0, audioElement.currentTime + 5); }
    }
    else if (e.code === 'ArrowLeft') {
        if (e.shiftKey) playPrev();
        else { e.preventDefault(); audioElement.currentTime = Math.max(0, audioElement.currentTime - 5); }
    }
    else if (e.code === 'KeyM')   document.getElementById('btn-mute').click();
    else if (e.code === 'KeyF') {
        // F key â€” toggle fullscreen
        document.getElementById('btn-fullscreen').click();
    }
    else if (e.code === 'Escape') {
        // Esc priority: 1) exit fullscreen, 2) go back from playlist/settings
        const fsPlayer = document.getElementById('fullscreen-player');
        if (!fsPlayer.classList.contains('hidden')) {
            document.getElementById('btn-exit-fullscreen')?.click();
            return;
        }
        // Back from settings
        if (views.settings && !views.settings.classList.contains('hidden')) {
            document.getElementById('btn-settings-back')?.click();
            return;
        }
        // Back from playlist view
        if (views.playlist && !views.playlist.classList.contains('hidden')) {
            document.getElementById('btn-back-home')?.click();
        }
    }
});

// Web Audio
function initWebAudio() {
    if (isAudioInitialized) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source   = audioCtx.createMediaElementSource(audioElement);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    masterVolumeGain = audioCtx.createGain();
    masterVolumeGain.gain.value = 3.0; // ← VOLUME KNOB

    reverbConvolver = audioCtx.createConvolver();
    reverbConvolver.buffer = buildImpulseResponse(audioCtx, EffectConfig.reverb.duration, EffectConfig.reverb.decay, false);
    reverbDry = audioCtx.createGain(); reverbDry.gain.value = 1;
    reverbWet = audioCtx.createGain(); reverbWet.gain.value = 0;

    preGain  = audioCtx.createGain(); preGain.gain.value  = 1;
    postGain = audioCtx.createGain(); postGain.gain.value = 1;

    hrtfPanner = audioCtx.createPanner();
    hrtfPanner.panningModel  = 'HRTF';
    hrtfPanner.distanceModel = 'inverse';
    hrtfPanner.refDistance   = 1;
    hrtfPanner.maxDistance   = 10000;
    hrtfPanner.rolloffFactor = 0.8;
    hrtfPanner.coneInnerAngle = 360;
    hrtfPanner.coneOuterAngle = 0;
    hrtfPanner.coneOuterGain  = 0;
    hrtfPanner.positionX.value = 0;
    hrtfPanner.positionY.value = 0;
    hrtfPanner.positionZ.value = -1;

    roomConvolver = audioCtx.createConvolver();
    roomConvolver.buffer = buildImpulseResponse(audioCtx, 0.6, 2.0, false);
    dryGain = audioCtx.createGain(); dryGain.gain.value = 0.7;
    wetGain = audioCtx.createGain(); wetGain.gain.value = 0.3;

    depthFilter = audioCtx.createBiquadFilter();
    depthFilter.type = 'lowpass';
    depthFilter.frequency.value = 20000;
    depthFilter.Q.value = 0.5;

    reverbOutput = audioCtx.createGain(); reverbOutput.gain.value = 1;
    
    bassFilter = audioCtx.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 150;
    bassFilter.gain.value = EffectConfig.eq.bass;
    
    trebleFilter = audioCtx.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 4000;
    trebleFilter.gain.value = EffectConfig.eq.treble;

    isAudioInitialized = true;
    updateAudioRouting();

    // Sync gain to current slider position now that Web Audio is live
    const volSlider = document.getElementById('volume-slider');
    if (volSlider) applyVolume(parseFloat(volSlider.value));

    // Resume context — browsers may suspend it immediately on creation
    audioCtx.resume().catch(() => {});

    drawVisualizer();
}

function updateAudioRouting() {
    if (!isAudioInitialized) return;
    
    // Disconnect everything in the effect chain
    [source, preGain, depthFilter, dryGain, wetGain,
     roomConvolver, hrtfPanner, postGain,
     reverbConvolver, reverbDry, reverbWet, reverbOutput, bassFilter, trebleFilter, analyser]
    .forEach(n => { try { n.disconnect(); } catch(e) {} });

    // 1. Reverb Stage
    source.connect(reverbDry);
    source.connect(reverbConvolver);
    reverbConvolver.connect(reverbWet);
    reverbDry.connect(reverbOutput);
    reverbWet.connect(reverbOutput);

    const t = audioCtx.currentTime;
    reverbWet.gain.setTargetAtTime(reverbActive ? EffectConfig.reverb.wetGain : 0, t, 0.05);
    reverbDry.gain.setTargetAtTime(reverbActive ? EffectConfig.reverb.dryGain : 1, t, 0.05);

    // 2. EQ Stage
    reverbOutput.connect(bassFilter);
    bassFilter.connect(trebleFilter);

    // 3. 8D Stage
    if (is8DActive) {
        trebleFilter.connect(preGain);
        preGain.connect(depthFilter);
        depthFilter.connect(dryGain);
        depthFilter.connect(roomConvolver);
        roomConvolver.connect(wetGain);
        dryGain.connect(hrtfPanner);
        wetGain.connect(hrtfPanner);
        hrtfPanner.connect(postGain);
        postGain.connect(analyser);
        
        if (_8dRafId === null) {
            _8dAngle = 0;
            start8DLoop();
        }
    } else {
        stop8DLoop();
        trebleFilter.connect(analyser);
    }
    
    analyser.connect(masterVolumeGain);
    masterVolumeGain.connect(audioCtx.destination);
}

function buildImpulseResponse(ctx, duration, decay, reverse) {
    const rate    = ctx.sampleRate;
    const length  = rate * duration;
    const impulse = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
        const buf = impulse.getChannelData(ch);
        for (let i = 0; i < length; i++) {
            const n = reverse ? length - i : i;
            buf[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
        }
    }
    return impulse;
}

function enable8D() {
    if (!isAudioInitialized) initWebAudio();
    updateAudioRouting();
}

function disable8D() {
    if (!isAudioInitialized) return;
    updateAudioRouting();
}

function rebuildFlatGraph() {
    updateAudioRouting();
}

// Track when 8D loop started in AudioContext time so we can re-sync after tab switch
let _8dStartCtxTime = 0;
let _8dStartAngle   = 0;

function start8DLoop() {
    // Anchor angle to AudioContext clock so re-sync after visibility change is accurate
    _8dStartCtxTime = audioCtx ? audioCtx.currentTime : 0;
    _8dStartAngle   = _8dAngle;
    _8dLastTime = null;

    function loop(ts) {
        if (!is8DActive) return;
        if (_8dLastTime !== null) {
            const dt = (ts - _8dLastTime) / 1000;
            _8dAngle += EffectConfig.eightD.speed * dt;
        }
        _8dLastTime = ts;
        _apply8DPosition(_8dAngle, audioCtx.currentTime);
        _8dRafId = requestAnimationFrame(loop);
    }
    _8dRafId = requestAnimationFrame(loop);
}

function _apply8DPosition(angle, t) {
    const x = Math.sin(angle);
    const z = -Math.cos(angle);
    const y = Math.sin(angle * 0.3) * 0.15;
    hrtfPanner.positionX.setTargetAtTime(x, t, 0.02);
    hrtfPanner.positionY.setTargetAtTime(y, t, 0.02);
    hrtfPanner.positionZ.setTargetAtTime(z, t, 0.02);
    const behindness = (z + 1) / 2;
    depthFilter.frequency.setTargetAtTime(18000 - behindness * 12500, t, 0.08);
    postGain.gain.setTargetAtTime(1 - behindness * 0.08, t, 0.1);
}

// Pre-schedule 90 seconds of 8D rotation into the AudioContext timeline.
// AudioContext runs in a separate thread â€” unaffected by tab visibility.
// This is called when the tab goes hidden so the rotation continues smoothly.
function _preSchedule8D(seconds) {
    if (!audioCtx || !hrtfPanner || !is8DActive) return;
    const speed  = EffectConfig.eightD.speed;
    const now    = audioCtx.currentTime;
    const steps  = seconds * 15; // keyframe every ~67ms
    // Cancel any in-flight automation before scheduling new
    hrtfPanner.positionX.cancelScheduledValues(now);
    hrtfPanner.positionY.cancelScheduledValues(now);
    hrtfPanner.positionZ.cancelScheduledValues(now);
    depthFilter.frequency.cancelScheduledValues(now);
    postGain.gain.cancelScheduledValues(now);
    for (let i = 0; i <= steps; i++) {
        const dt    = i / 15;
        const t     = now + dt;
        const angle = _8dAngle + dt * speed;
        const x     = Math.sin(angle);
        const z     = -Math.cos(angle);
        const y     = Math.sin(angle * 0.3) * 0.15;
        const beh   = (z + 1) / 2;
        hrtfPanner.positionX.linearRampToValueAtTime(x, t);
        hrtfPanner.positionY.linearRampToValueAtTime(y, t);
        hrtfPanner.positionZ.linearRampToValueAtTime(z, t);
        depthFilter.frequency.linearRampToValueAtTime(18000 - beh * 12500, t);
        postGain.gain.linearRampToValueAtTime(1 - beh * 0.08, t);
    }
    // Advance our angle tracker to where it'll be when the schedule ends
    _8dAngle += seconds * speed;
}

function stop8DLoop() {
    if (_8dRafId !== null) { cancelAnimationFrame(_8dRafId); _8dRafId = null; }
    _8dLastTime = null;
}

// Handle tab visibility â€” switch between rAF and pre-scheduled AudioContext params
document.addEventListener('visibilitychange', () => {
    if (!is8DActive || !isAudioInitialized) return;
    if (document.hidden) {
        // Tab going background: stop rAF, pre-schedule 90s of rotation
        stop8DLoop();
        _preSchedule8D(90);
    } else {
        // Tab coming back: re-sync angle to where AudioContext is now
        const elapsed = audioCtx.currentTime - _8dStartCtxTime;
        _8dAngle      = _8dStartAngle + elapsed * EffectConfig.eightD.speed;
        // Cancel pre-scheduled values and resume rAF control
        const now = audioCtx.currentTime;
        hrtfPanner.positionX.cancelScheduledValues(now);
        hrtfPanner.positionY.cancelScheduledValues(now);
        hrtfPanner.positionZ.cancelScheduledValues(now);
        depthFilter.frequency.cancelScheduledValues(now);
        postGain.gain.cancelScheduledValues(now);
        start8DLoop();
    }
});

function enableReverb() {
    if (!isAudioInitialized) initWebAudio();
    updateAudioRouting();
}

function disableReverb() {
    if (!isAudioInitialized) return;
    updateAudioRouting();
}

// â”€â”€â”€ Visualizer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    if (!isAudioInitialized || !analyser) return;

    // clientWidth is 0 when the element was just made visible — fall back to offsetWidth
    const w = canvas.clientWidth  || canvas.offsetWidth  || canvas.parentElement?.clientWidth  || 0;
    const h = canvas.clientHeight || canvas.offsetHeight || 28;
    if (w === 0 || h === 0) return; // nothing to draw yet

    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray    = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.clearRect(0, 0, w, h);
    const barWidth = (w / bufferLength) * 2.5;
    let x = 0;
    const grad = canvasCtx.createLinearGradient(0, h, 0, 0);
    grad.addColorStop(0, '#818cf8'); grad.addColorStop(1, '#e879f9');
    canvasCtx.fillStyle = grad;
    for (let i = 0; i < bufferLength; i++) {
        const barH = (dataArray[i] / 255) * h;
        if (barH < 1) { x += barWidth + 1; continue; } // skip flat bars
        canvasCtx.beginPath();
        if (canvasCtx.roundRect) canvasCtx.roundRect(x, h - barH, barWidth - 1, barH, [3,3,0,0]);
        else canvasCtx.rect(x, h - barH, barWidth - 1, barH);
        canvasCtx.fill();
        x += barWidth + 1;
    }
}

// â”€â”€â”€ Boot â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”€â”€â”€ Cursor blob â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initCursorBlob() {
    const blob = document.getElementById('cursor-blob');
    if (!blob) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let hasMoved = false;
    const LERP = 0.08;

    document.addEventListener('mousemove', e => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!hasMoved) {
            hasMoved = true;
            currentX = targetX;
            currentY = targetY;
            blob.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', () => { blob.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { if (hasMoved) blob.style.opacity = '1'; });

    function animate() {
        currentX += (targetX - currentX) * LERP;
        currentY += (targetY - currentY) * LERP;
        // Position the blob so its center follows the cursor
        // Use left/top instead of transform so it doesn't fight the morph animation
        blob.style.left = (currentX - blob.offsetWidth  / 2) + 'px';
        blob.style.top  = (currentY - blob.offsetHeight / 2) + 'px';
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
})();

window.addEventListener('DOMContentLoaded', init);
