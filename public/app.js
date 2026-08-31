// --- Icons --------------------------------------------------------------------
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

// --- Network Helpers ----------------------------------------------------------
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 10000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal  
    });
    clearTimeout(id);
    return response;
}
// --- State --------------------------------------------------------------------
let allSongs        = [];
let playlists       = [];
let currentQueue    = [];
let currentQueueIndex = -1;
let currentPlaylistId = null;
let currentSong     = null;
let isPlaying       = false;
let historyLoggedForCurrentSong = false;
let _listenedSeconds  = 0;   // actual seconds of active playback for current song
let _lastTickTime     = null; // wall-clock timestamp of last timeupdate tick while playing
let upNextToastShown  = false;
let autoAdvanceTimeout = null;
let is8DActive      = false;
let reverbActive    = false;
let loopMode        = 0; // 0=off 1=loop-song 2=loop-all
let coverBustMap    = {}; // song id (UUID) -> timestamp, for cache-busting after cover upload
let playerVisible   = true;

// Temp state for create-playlist modal cover
let createCoverFile = null;

// --- Theme Toggle -------------------------------------------------------------
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
        duration: 3.0,
        decay: 2.8,
        wetGain: 0.85,
        dryGain: 0.45,
        damping: 0.72,
        preDelay: 0.035,
        mode: 'plate'   // 'plate' = smooth/lush (default), 'room' = realistic/echoey
    },
    eightD: {
        speed: 0.8,       // Speed of the audio rotating around your head
        sideSpeed: -0.6   // Side channel rotation speed (negative = opposite direction)
    },
    eq: {
        bass: 0,
        treble: 0
    }
};

let audioCtx, analyser, source, normalizationGain, masterVolumeGain, compressor;
let isAudioInitialized = false;

// 8D nodes
let hrtfPanner, preGain, postGain;
let roomConvolver, dryGain, wetGain;
let depthFilter;
let _8dRafId = null;
let _8dAngle  = 0;

// Mid/Side 8D Split nodes
let msSplitter;          // ChannelSplitter(2) to extract L and R
let midGainL, midGainR;  // +0.5 each → Mid = (L+R)/2
let sideGainL, sideGainRinv; // +0.5 and -0.5 → Side = (L-R)/2
let midBus, sideBus;     // Summing buses for mid and side
let hrtfPannerSide, postGainSide; // Second HRTF panner for side channel
let is8DSplitActive = false;
let _8dSideAngle = 0;

// Volume
const MAX_GAIN = 2.0;
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
let reverbPreDelay;          // Pre-delay before reverb convolver
let earlyReflConvolver;      // Early reflections layer
let earlyReflGain;           // Gain for early reflections
let reverbAirAbsorb;         // High-shelf filter for air absorption on wet tail
let reverbSplitter;          // ChannelSplitter to correctly feed Haas L/R delays
let reverbStereoL, reverbStereoR; // Haas stereo spread delays
let reverbMerger;            // ChannelMerger for Haas output
let _8dLastTime = null;

// --- DOM refs -----------------------------------------------------------------
const views = {
    home:     document.getElementById('view-home'),
    explore:  document.getElementById('view-explore'),
    library:  document.getElementById('view-library'),
    playlist: document.getElementById('view-playlist'),
    settings: document.getElementById('view-settings'),
    notifications: document.getElementById('view-notifications'),
    appSettings: document.getElementById('view-app-settings')
};
const appContainer  = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const playerBar     = document.getElementById('player-bar');
const btnTogglePlayer = document.getElementById('btn-toggle-player');
const audioElement  = document.getElementById('audio-element');
const canvas        = document.getElementById('visualizer');
const canvasCtx     = canvas.getContext('2d', { willReadFrequently: true });

// Lyrics & Notifications state
let currentLyrics = null;
let lyricsPosition = 'left';
let fuzzyNotificationId = null;
let fuzzySongId = null;

const btnNotifications = document.getElementById('btn-notifications');
const notifDot = document.getElementById('notif-dot');
const notifList = document.getElementById('notif-list');
const btnNotifBack = document.getElementById('btn-notif-back');
const btnClearNotifs = document.getElementById('btn-clear-notifs');

const fuzzyModal = document.getElementById('lyrics-fuzzy-modal');
const fuzzyCandidatesList = document.getElementById('fuzzy-candidates-list');
const btnFuzzyConfirm = document.getElementById('btn-fuzzy-confirm');

const btnFsLyrics = document.getElementById('btn-fs-lyrics');
const fsLyrics = document.getElementById('fs-lyrics');
const lyricsInner = document.getElementById('lyrics-inner');
const fsContent = document.getElementById('fs-content');
const fsDropzoneTop = document.getElementById('fs-dropzone-top');
const fsDropzoneSide = document.getElementById('fs-dropzone-side');

// --- Helpers ------------------------------------------------------------------
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
function getSongPlaylistTags(songId) {
    return playlists
        .filter(pl => pl.songs.includes(songId))
        .map(pl => '#' + pl.name.trim().toLowerCase().replace(/\s+/g, '-'));
}

function getCoverUrl(song) {
    const settingsRaw = localStorage.getItem('lofi-settings');
    const settings = settingsRaw ? JSON.parse(settingsRaw) : {};
    const qs = [];
    if (coverBustMap[song.id]) qs.push(`t=${coverBustMap[song.id]}`);
    if (settings.onlineCovers) qs.push('onlineOnly=1');
    const qStr = qs.length ? `?${qs.join('&')}` : '';
    return `/api/cover/${encodeURIComponent(song.id)}${qStr}`;
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

// --- Toggle Player Visibility -------------------------------------------------
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

// --- Playback State Persistence -----------------------------------------------
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
        currentSong = song;
        isPlaying = false;
        
        if (typeof fetchLyricsForCurrentSong === 'function') {
            currentLyrics = null;
            fetchLyricsForCurrentSong();
        }

        playerBar.classList.remove('hidden');
        appContainer.classList.add('has-player');
        playerVisible = true;
        btnTogglePlayer.classList.remove('hidden');
        updateTogglePlayerBtn();

        audioElement.src = `/stream/${song.id}`;
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

        // Check auto-play setting
        const settingsRaw = localStorage.getItem('lofi-settings');
        const settings = settingsRaw ? JSON.parse(settingsRaw) : {};
        if (settings.autoplay) {
            audioElement.play().then(() => {
                isPlaying = true;
                setPlayPauseIcon(true);
            }).catch(e => {
                console.warn('Auto-play prevented by browser:', e);
                setPlayPauseIcon(false);
            });
        } else {
            setPlayPauseIcon(false);
        }
    } catch(e) {
        console.error('Failed to restore playback state:', e);
    }
}

// --- Init ---------------------------------------------------------------------
function hideLoadingScreen() {
    const ls = document.getElementById('loading-screen');
    if (ls) {
        ls.classList.add('fade-out');
        setTimeout(() => ls.remove(), 600);
    }
}

// Silently fetch cover art from iTunes for songs that have none.
// Never touches songs that already have a custom/user cover.
async function fetchMissingCovers(songs) {
    if (!navigator.onLine) return;

    const settingsRaw = localStorage.getItem('lofi-settings');
    const settings = settingsRaw ? JSON.parse(settingsRaw) : {};
    
    const missing = songs.filter(s => {
        if (settings.onlineCovers) return s.coverSource !== 'itunes';
        return !s.hasCustomCover && !s.hasItunesCover;
    });
    if (missing.length === 0) return;

    // Batch in groups of 5 to avoid hammering iTunes API
    const BATCH = 5;
    let totalFetched = 0;

    for (let i = 0; i < missing.length; i += BATCH) {
        const batch = missing.slice(i, i + BATCH).map(s => ({
            id: s.id,
            title: s.title || '',
            artist: s.artist || ''
        }));

        try {
            const res = await fetchWithTimeout('/api/fetch-cover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songs: batch }),
                timeout: 60000 // generous — each song can take up to 15s
            });
            const data = await res.json();

            if (data.fetched > 0) {
                totalFetched += data.fetched;
                // Bust cache for successfully fetched songs so UI refreshes
                data.results.filter(r => r.success).forEach(r => {
                    coverBustMap[r.id] = Date.now();
                    // Update in-memory song to reflect new cover state
                    const song = allSongs.find(s => s.id === r.id);
                    if (song) { song.hasCustomCover = true; song.hasAnyCover = true; song.coverSource = 'itunes'; }
                });
                // Refresh whatever is currently visible
                refreshCoverImages();
            }
        } catch (e) {
            console.warn('[cover-fetch] batch failed:', e.message);
        }

        // Small pause between batches to be polite to the API
        if (i + BATCH < missing.length) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    if (totalFetched > 0) {
        showToast(`Found cover art for ${totalFetched} song${totalFetched !== 1 ? 's' : ''}`, 'FromBottom', 'green');
    }
}

// Refresh cover images in the UI after new covers have been fetched
function refreshCoverImages() {
    // Re-render song cards in the explore view so new covers show up
    renderExploreSongs();
    renderHome();
    // Refresh the currently playing song's cover in the player
    if (currentSong && coverBustMap[currentSong.id]) {
        const pc = document.getElementById('player-cover');
        if (pc) pc.src = getCoverUrl(currentSong);
        const fsCover = document.getElementById('fs-cover-img');
        if (fsCover) fsCover.src = getCoverUrl(currentSong);
    }
}


function initMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => { togglePlay(); });
        navigator.mediaSession.setActionHandler('pause', () => { togglePlay(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { playPrev(); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { playNext(); });
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && 'fastSeek' in audioElement) {
                audioElement.fastSeek(details.seekTime);
            } else {
                audioElement.currentTime = details.seekTime;
            }
        });
    }
}

async function init() {
    initMediaSession();
    try {
        const res = await fetch('/api/library');
        allSongs = await res.json();

        if (allSongs.length === 0) {
            hideLoadingScreen();
            welcomeScreen.classList.remove('hidden');
            appContainer.classList.add('hidden');
        } else {
            welcomeScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            await loadPlaylists();
            renderExploreSongs();
            await loadHistoryCache();
            await loadAnalyticsCache();
            renderHome();
            await restorePlaybackState();
            hideLoadingScreen();
            
            // Check Dev Status
            try {
                const devRes = await fetch('/api/dev/status');
                if (devRes.ok) {
                    const devData = await devRes.json();
                    if (devData.enabled) {
                        document.getElementById('dev-tools-card').classList.remove('hidden');
                    }
                }
            } catch (e) {
                // Ignore dev check errors
            }

            // Fire-and-forget: fetch covers in the background after app is ready
            fetchMissingCovers(allSongs);
        }
    } catch (e) {
        console.error('Failed to load library:', e);
        hideLoadingScreen();
        welcomeScreen.classList.remove('hidden');
    }
}

document.getElementById('btn-init-scan').addEventListener('click', () => location.reload());

// --- Play History -------------------------------------------------------------
const HISTORY_KEY = 'lofi-history';
const MAX_HISTORY  = 50;

let _historyCache = null;
let _analyticsCache = null;

async function loadHistoryCache() {
    if (_historyCache !== null) return;
    try {
        const res = await fetch('/api/history');
        _historyCache = await res.json();
    } catch(e) {
        console.error('History load failed:', e);
        _historyCache = [];
    }
}

async function loadAnalyticsCache() {
    try {
        const res = await fetch('/api/analytics');
        _analyticsCache = await res.json();
    } catch(e) {
        console.error('Analytics load failed:', e);
        _analyticsCache = null;
    }
}

function addToHistory(song) {
    const now = Date.now();
    const d   = new Date(now);
    const entry = {
        id:        song.id,
        filename:  song.filename, // kept for display fallback only
        title:     song.title,
        artist:    song.artist,
        duration:  song.duration || 0,
        playedAt:  now,
        hour:      d.getHours(),
        dayOfWeek: d.getDay(),
        weekNum:   getISOWeek(d),
        month:     d.getMonth(),
        year:      d.getFullYear(),
        playlists: playlists.filter(pl => pl.songs.includes(song.id)).map(pl => pl.id),
        effects: {
            speed:  parseFloat(document.getElementById('speed-input')?.value || 1),
            reverb: reverbActive,
            eightD: is8DActive,
            deep:   !!document.getElementById('btn-deep')?.classList.contains('active')
        }
    };
    // Update caches
    if (_historyCache) _historyCache.unshift(entry);
    _analyticsCache = null; // force re-fetch on next home render

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

// --- Home view ----------------------------------------------------------------
function getGreeting() {
    const h = new Date().getHours();
    if (h < 5)  return '\u{1F319} Late night session';
    if (h < 12) return '\u2600\uFE0F Good morning';
    if (h < 17) return '\u{1F3B5} Good afternoon';
    if (h < 21) return '\u{1F306} Good evening';
    return '\u{1F319} Good night';
}

async function renderHome() {
    const greetEl = document.getElementById('hero-greeting');
    if (greetEl) greetEl.textContent = getGreeting();

    const statsRow = document.getElementById('home-stats-row');
    if (!statsRow) return;
    if (!allSongs.length) { statsRow.innerHTML = ''; return; }

    // If analytics cache was invalidated (new play logged), re-fetch before rendering
    if (_analyticsCache === null) {
        await loadAnalyticsCache();
    }

    const s = _analyticsCache || {};
    const none = !s.totalPlays || s.totalPlays === 0;

    const topSong = s.topSongId ? allSongs.find(song => song.id === s.topSongId) : null;
    const topPl = s.topPlaylistId ? playlists.find(p => p.id === s.topPlaylistId) : null;

    statsRow.innerHTML = [
        { icon: Icons.flame, label: 'Top Song',         value: none ? '\u2014' : toTitleCase(topSong?.title || '\u2014'), sub: none ? 'Play some songs first' : `${s.topSongPlays} play${s.topSongPlays!==1?'s':''}`, accent: 'pink', color: '#f97316' },
        { icon: Icons.mic, label: 'Top Artist',        value: none ? '\u2014' : toTitleCase(s.topArtist || '\u2014'),      sub: none ? 'No history yet'       : `${s.topArtistPlays} play${s.topArtistPlays!==1?'s':''}`, accent: 'purple', color: '#a78bfa' },
        { icon: Icons.disc, label: 'Hottest Playlist',  value: none ? '\u2014' : toTitleCase(topPl?.name || 'None yet'),   sub: none ? 'Add songs to playlists': topPl ? 'Most played playlist' : 'Play songs in a playlist', accent: 'blue', color: '#60a5fa' },
        { icon: Icons.musicNote, label: 'Played Today',      value: `${s.todayCount ?? 0}`, sub: (s.todayCount ?? 0)===0?'Nothing yet today':`song${s.todayCount!==1?'s':''} so far`, accent: 'pink', color: '#34d399' },
        { icon: Icons.globe, label: 'Artists Explored',  value: `${s.uniqueArtists ?? 0}`, sub: 'unique artists played', accent: 'purple', color: '#4ade80' },
        { icon: Icons.calendar, label: 'Day Streak',        value: `${s.streak ?? 0}`, sub: (s.streak ?? 0)===0?'No streak yet':(s.streak ?? 0)===1?'day in a row':'days in a row', accent: 'blue', color: '#fbbf24' }
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
        .filter(h => { if (seen.has(h.id)) return false; seen.add(h.id); return true; })
        .slice(0, 12)
        .map(h => allSongs.find(s => s.id === h.id))
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
    const btnNotif = document.getElementById('btn-notifications');
    if (btnNotif) {
        btnNotif.classList.toggle('active', viewName === 'notifications');
    }
    const btnAppSet = document.getElementById('btn-app-settings');
    if (btnAppSet) {
        btnAppSet.classList.toggle('active', viewName === 'appSettings');
    }
    // Always re-render home when navigating to it so analytics are fresh
    if (viewName === 'home') {
        renderHome();
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        switchView(e.currentTarget.dataset.view);
    });
});

document.getElementById('btn-back-home').addEventListener('click', () => switchView('library'));
document.getElementById('btn-settings-back').addEventListener('click', () => switchView(settingsCallerView || 'explore'));

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

// --- Explore view 
function renderExploreSongs() {
    const container = document.getElementById('explore-songs');
    if (!container) return;
    container.innerHTML = '';
    const sorted = [...allSongs].sort((a, b) =>
        (a.title || '').trim().localeCompare((b.title || '').trim(), undefined, { sensitivity: 'base' })
    );
    sorted.forEach((song, index) => {
        container.appendChild(buildSongCard(song, index, sorted));
    });
    // Update count badge
    const badge = document.getElementById('explore-count');
    if (badge) badge.textContent = allSongs.length ? `${allSongs.length} songs` : '';
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
        const plSongs = pl.songs.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
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

    const sourceCard = container.querySelector(`.playlist-card[data-id="${sourceId}"]`);
    const targetCard = container.querySelector(`.playlist-card[data-id="${targetId}"]`);
    
    if (sourceCard && targetCard) {
        if (fromIndex < toIndex) {
            targetCard.after(sourceCard);
        } else {
            targetCard.before(sourceCard);
        }
    }

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

// --- Song Card builder --------------------------------------------------------
function buildSongCard(song, index, list) {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.dataset.songId = song.id;
    if (currentQueue[currentQueueIndex]?.id === song.id) card.classList.add('playing');
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

// --- Sidebar ------------------------------------------------------------------
function renderSidebarPlaylists() {
    return;
}

// --- Playlist view ----------------------------/* ── Playlist Reorder state ── */
let _reorderMode = false;
let _dragSrc = null;   // row element being dragged

function _buildDragHandle() {
    const h = document.createElement('div');
    h.className = 'ps-drag-handle';
    h.title = 'Drag to reorder';
    h.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="18" x2="16" y2="18"/></svg>`;
    return h;
}

/* Ghost element that visually follows the cursor */
function _createGhost(row) {
    const existing = document.getElementById('ps-drag-ghost');
    if (existing) existing.remove();
    const ghost = row.cloneNode(true);
    ghost.id = 'ps-drag-ghost';
    // Match exact width/height of the source row
    const rect = row.getBoundingClientRect();
    ghost.style.width  = rect.width  + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.style.left   = rect.left   + 'px';
    ghost.style.top    = rect.top    + 'px';
    // Remove interactive elements from ghost
    ghost.querySelectorAll('button').forEach(b => b.remove());
    document.body.appendChild(ghost);
    return ghost;
}

function _clearDragClasses() {
    document.querySelectorAll('.playlist-song-row').forEach(r => {
        r.classList.remove('dragging', 'drag-over-top', 'drag-over-bottom');
    });
}

function _enableReorderDrag(container, playlistId) {
    let ghost = null;
    let offsetX = 0, offsetY = 0;

    container.querySelectorAll('.ps-drag-handle').forEach(handle => {
        handle.addEventListener('pointerdown', e => {
            if (!_reorderMode) return;
            e.preventDefault();
            handle.setPointerCapture(e.pointerId);

            const row = handle.closest('.playlist-song-row');
            _dragSrc = row;
            row.classList.add('dragging');

            const rect = row.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            ghost = _createGhost(row);

            handle.addEventListener('pointermove', onMove);
            handle.addEventListener('pointerup',   onUp, { once: true });
        });
    });

    function onMove(e) {
        if (!ghost) return;
        ghost.style.left = (e.clientX - offsetX) + 'px';
        ghost.style.top  = (e.clientY - offsetY) + 'px';

        // Find row under ghost centre
        ghost.style.display = 'none';
        const el = document.elementFromPoint(e.clientX, e.clientY - offsetY + 20);
        ghost.style.display = '';
        const target = el && el.closest('.playlist-song-row');

        document.querySelectorAll('.playlist-song-row').forEach(r => {
            r.classList.remove('drag-over-top', 'drag-over-bottom');
        });

        if (target && target !== _dragSrc) {
            const rect = target.getBoundingClientRect();
            const mid  = rect.top + rect.height / 2;
            if (e.clientY < mid) {
                target.classList.add('drag-over-top');
            } else {
                target.classList.add('drag-over-bottom');
            }
        }
    }

    async function onUp(e) {
        if (ghost) { ghost.remove(); ghost = null; }

        // Find where we dropped
        const overTop    = container.querySelector('.drag-over-top');
        const overBottom = container.querySelector('.drag-over-bottom');
        _clearDragClasses();

        if (!_dragSrc) return;

        const rows = [...container.querySelectorAll('.playlist-song-row')];

        if (overTop && overTop !== _dragSrc) {
            overTop.parentNode.insertBefore(_dragSrc, overTop);
        } else if (overBottom && overBottom !== _dragSrc) {
            overBottom.parentNode.insertBefore(_dragSrc, overBottom.nextSibling);
        } else {
            _dragSrc = null;
            return; // dropped in same spot – nothing to do
        }
        _dragSrc = null;

        // Persist new order
        const newOrder = [...container.querySelectorAll('.playlist-song-row')]
            .map(r => r.dataset.songId);
        await fetch(`/api/playlists/${playlistId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songs: newOrder })
        });
        await loadPlaylists();
        // Re-render plSongs index so click-to-play stays in sync
        // (openPlaylist would reset reorder mode; keep it on)
        const pl = playlists.find(p => p.id === playlistId);
        if (pl) {
            const plSongs = pl.songs.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
            container.querySelectorAll('.playlist-song-row').forEach((row, idx) => {
                row.onclick = null;
                row.addEventListener('click', ev => {
                    if (!_reorderMode) playSongFromList(plSongs, idx);
                });
            });
        }
        showToast('Order saved', 'FromBottom', 'green');
    }
}

function openPlaylist(id) {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return;
    currentPlaylistId = id;
    _reorderMode = false;   // reset on every open

    document.getElementById('playlist-title').textContent = toTitleCase(pl.name);
    const plSongs = pl.songs.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
    const totalDur = plSongs.reduce((acc, s) => acc + (s.duration || 0), 0);
    document.getElementById('playlist-duration').textContent =
        `${Math.round(totalDur / 60)} min· ${plSongs.length} song${plSongs.length !== 1 ? 's' : ''}`;

    // Cover – uses custom cover if set, falls back to mosaic
    const mosaicEl = document.getElementById('playlist-cover-mosaic');
    if (mosaicEl) mosaicEl.innerHTML = getPlaylistCoverHtml(pl, plSongs);

    // Action buttons
    document.getElementById('btn-playlist-add-songs').onclick = () => openBrowseSongsModal(id);
    document.getElementById('btn-playlist-rename').onclick   = () => openRenameModal(id);
    document.getElementById('btn-playlist-delete').onclick   = () => openDeleteModal(id);
    document.getElementById('btn-playlist-cover').onclick    = () => openCoverModal(id);

    // Reorder button
    const btnReorder = document.getElementById('btn-playlist-reorder');
    btnReorder.classList.remove('active');
    btnReorder.onclick = () => {
        _reorderMode = !_reorderMode;
        btnReorder.classList.toggle('active', _reorderMode);
        container.classList.toggle('reorder-mode', _reorderMode);
        showToast(_reorderMode ? 'Drag songs to reorder' : 'Reorder mode off', 'FromBottom', _reorderMode ? 'accent' : 'gray');
    };

    // Song list
    const container = document.getElementById('playlist-songs');
    container.innerHTML = '';
    container.classList.remove('reorder-mode');

    if (plSongs.length === 0) {
        container.innerHTML = `<p style="color:var(--text-secondary);padding:1rem 0;">This playlist is empty. Go to Explore to add songs!</p>`;
    } else {
        plSongs.forEach((song, index) => {
            const row = document.createElement('div');
            row.className = 'playlist-song-row';
            row.dataset.songId = song.id;
            if (currentQueue[currentQueueIndex]?.id === song.id) row.classList.add('playing');
            row.innerHTML = `
                <img src="${getCoverUrl(song)}" onerror="this.src='/api/cover/default'">
                <span class="ps-title">${toTitleCase(song.title)}</span>
                <span class="ps-artist">${toTitleCase(song.artist)}</span>
                <span class="ps-duration">${formatTime(song.duration)}</span>
                <button class="ps-settings" title="Settings">${Icons.settings}</button>
                <button class="ps-remove" title="Remove">${Icons.remove}</button>`;
            row.prepend(_buildDragHandle());
            row.addEventListener('click', e => {
                if (_reorderMode) return;
                if (e.target.closest('.ps-remove')) removeFromPlaylist(pl.id, song.id);
                else if (e.target.closest('.ps-settings')) openSettings(song, 'playlist');
                else playSongFromList(plSongs, index);
            });
            container.appendChild(row);
        });

        _enableReorderDrag(container, id);
    }
    switchView('playlist');
}

async function removeFromPlaylist(playlistId, songId) {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;
    const newSongs = pl.songs.filter(s => s !== songId);
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
            const plSongs2 = pl2 ? pl2.songs.map(id => allSongs.find(s => s.id === id)).filter(Boolean) : [];
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
let songCoverRemoved = false;
let songRevertItunes = false;
let modalCoverAction = null; // null, 'upload', 'remove', 'revert'

// These direct event listeners are no longer used since the buttons were moved to the modal.
// Their logic is now handled by the handleModalCover* functions and the main Save button.

let settingsCallerView = 'explore';

function openSettings(song, callerView = 'explore') {
    currentEditingSong = song;
    settingsCallerView = callerView;
    songCoverRemoved = false;
    songRevertItunes = false;
    document.getElementById('settings-cover').src = getCoverUrl(song);
    document.getElementById('settings-title').value = song.title;
    document.getElementById('settings-artist').value = song.artist;
    document.getElementById('settings-cover-upload').value = '';
    document.getElementById('btn-remove-song-cover').style.display = song.hasAnyCover ? '' : 'none';
    document.getElementById('btn-revert-itunes-cover').style.display = song.coverSource === 'itunes' ? '' : 'none';
    switchView('settings');
}

// Direct change listener replaced by handleModalCoverUpload


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
    const songId = currentEditingSong.id;

    // 1. Save metadata overrides
    await fetch('/api/save-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: songId, newTitle, newArtist })
    });

    // 2. Remove existing cover if dustbin clicked
    if (songCoverRemoved) {
        await fetch(`/api/cover/${encodeURIComponent(songId)}`, { method: 'DELETE' });
        coverBustMap[songId] = Date.now();
    }
    
    // 3. Revert iTunes cover if reverted
    if (songRevertItunes) {
        await fetch(`/api/itunes-cover/${encodeURIComponent(songId)}`, { method: 'DELETE' });
        coverBustMap[songId] = Date.now();
    }

    // 4. Upload custom cover if one was selected
    if (fileInput.files.length > 0 && !songCoverRemoved && !songRevertItunes) {
        const formData = new FormData();
        formData.append('id', songId);
        formData.append('cover', fileInput.files[0]);
        await fetch('/api/upload-cover', { method: 'POST', body: formData });
        coverBustMap[songId] = Date.now();
    }

    // 3. Rename file on disk if checkbox is checked
    if (cbRename && cbRename.checked) {
        btn.textContent = 'Renaming...';
        try {
            const renameRes = await fetch('/api/rename-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: songId })
            });
            const renameData = await renameRes.json();
            if (renameData.success && !renameData.unchanged) {
                // UUID stays the same; filename updated in metadata on server
                // No coverBustMap migration needed — cover is keyed by UUID
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
    renderRecentlyPlayed(); // refresh recent cards with updated metadata

    // 5. Update player UI if this song is currently playing
    const playingSong = currentQueue[currentQueueIndex];
    if (playingSong && playingSong.id === currentEditingSong.id) {
        const updated = allSongs.find(s => s.id === songId);
        if (updated) {
            currentQueue[currentQueueIndex] = updated;
            updatePlayerUI(updated);
        }
    }

    // Reset UI state
    btn.textContent = originalText;
    btn.disabled = false;
    if (cbRename) cbRename.checked = false;

    if (songRevertItunes) {
        showToast('iTunes art reverted — auto-fetch blocked for this song', 'FromBottom', 'green', 3500);
    } else if (songCoverRemoved) {
        showToast('Cover removed', 'FromBottom', 'green', 3000);
    } else {
        showToast('Metadata saved!', 'FromBottom', 'green', 3000);
    }
    switchView(settingsCallerView || 'explore');
});



// --- Search -------------------------------------------------------------------
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
            const tags = getSongPlaylistTags(song.id);
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
                    playSongFromList(allSongs, allSongs.findIndex(s => s.id === song.id));
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

// --- Create Playlist Modal ----------------------------------------------------
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

// --- Add to Playlist Modal ----------------------------------------------------
function openAddToPlaylistModal(song) {
    // If user is actively viewing a playlist, just add it directly to that playlist
    if (!views.playlist.classList.contains('hidden') && currentPlaylistId) {
        const pl = playlists.find(p => p.id === currentPlaylistId);
        if (pl) {
            if (pl.songs.includes(song.id)) {
                showToast(`Already in "${toTitleCase(pl.name)}"`, 'FromBottom', 'gray');
            } else {
                addSongToPlaylist(currentPlaylistId, song.id).then(() => {
                    showToast(`Added to "${toTitleCase(pl.name)}"`, 'FromBottom', 'accent');
                });
            }
            return; // Skip the modal
        }
    }

    const modal = document.getElementById('add-to-playlist-modal');
    const list = document.getElementById('atp-playlist-list');
    const msg = document.getElementById('atp-msg');
    msg.classList.add('hidden');

    list.innerHTML = '';
    if (playlists.length === 0) {
        list.innerHTML = '<p style="color:var(--text-secondary);font-size:0.85rem;text-align:center;padding:16px 0;">No playlists yet. Create one first!</p>';
    } else {
        playlists.forEach(pl => {
            const alreadyIn = pl.songs.includes(song.id);
            const row = document.createElement('div');
            row.className = 'atp-row' + (alreadyIn ? ' atp-row-disabled' : '');
            const plSongs = pl.songs.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
            row.innerHTML = `
                <div class="atp-row-cover">${getPlaylistCoverHtml(pl, plSongs)}</div>
                <div class="atp-row-info">
                    <span class="atp-row-name">${toTitleCase(pl.name)}</span>
                    <span class="atp-row-count">${plSongs.length} song${plSongs.length !== 1 ? 's' : ''}</span>
                </div>
                ${alreadyIn ? '<span class="atp-already">Added</span>' : `<button class="btn-glass btn-small atp-add-btn">${Icons.plus} Add</button>`}`;
            if (!alreadyIn) {
                row.querySelector('.atp-add-btn').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await addSongToPlaylist(pl.id, song.id);
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

async function addSongToPlaylist(playlistId, songId) {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;
    if (pl.songs.includes(songId)) return; // already there
    const newSongs = [...pl.songs, songId];
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

// --- Browse Songs Modal (Add Songs from playlist page) ------------------------
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
            const alreadyIn = freshPl && freshPl.songs.includes(song.id);
            const row = document.createElement('div');
            row.className = 'browse-song-row' + (alreadyIn ? ' browse-song-added' : '');
            const browseTags = getSongPlaylistTags(song.id);
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
                    await addSongToPlaylist(playlistId, song.id);
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

// --- Player -------------------------------------------------------------------
function playSongFromList(list, index) {
    currentQueue = list;
    currentQueueIndex = index;
    loadAndPlaySong(currentQueue[currentQueueIndex]);
}

function updateMediaSession(song) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title || 'Unknown Title',
            artist: song.artist || 'Unknown Artist',
            album: 'Baladio',
            artwork: [
                { src: window.location.origin + `/api/cover/${song.id}`, sizes: '96x96', type: 'image/jpeg' },
                { src: window.location.origin + `/api/cover/${song.id}`, sizes: '128x128', type: 'image/jpeg' },
                { src: window.location.origin + `/api/cover/${song.id}`, sizes: '192x192', type: 'image/jpeg' },
                { src: window.location.origin + `/api/cover/${song.id}`, sizes: '256x256', type: 'image/jpeg' },
                { src: window.location.origin + `/api/cover/${song.id}`, sizes: '384x384', type: 'image/jpeg' },
                { src: window.location.origin + `/api/cover/${song.id}`, sizes: '512x512', type: 'image/jpeg' }
            ]
        });
    }
}

function loadAndPlaySong(song) {
    currentSong = song; // must be set before anything else (lyrics, history, etc. depend on it)
    clearTimeout(autoAdvanceTimeout);
    upNextToastShown = false;
    audioElement.playbackRate = 1; 
    document.getElementById('speed-input').value = '1.00';
    playerBar.classList.remove('hidden');
    appContainer.classList.add('has-player');
    playerVisible = true;
    btnTogglePlayer.classList.remove('hidden');
    updateTogglePlayerBtn();
    audioElement.src = `/stream/${song.id}`;
    initWebAudio();
    // Ensure AudioContext is running before play
    const doPlay = () => audioElement.play().then(() => {
        updateMediaSession(song);
    }).catch(err => console.error('Playback error:', err));
    if (audioCtx && audioCtx.state !== 'running') {
        audioCtx.resume().then(doPlay).catch(doPlay);
    } else {
        doPlay();
    }
    isPlaying = true;
    historyLoggedForCurrentSong = false;
    _listenedSeconds = 0;
    _lastTickTime    = null;
    updatePlayerUI(song);
    setPlayPauseIcon(true);
    savePlaybackState();

    if (typeof fetchLyricsForCurrentSong === 'function') {
        // Reset lyrics state silently before background fetch
        currentLyrics = null;
        fsLyrics.classList.add('hidden');
        lyricsInner.innerHTML = '';
        fetchLyricsForCurrentSong();
    }

    // Apply loudness normalization
    if (normalizationGain) {
        const offsetDb = (typeof song.lufsOffset === 'number') ? song.lufsOffset : 0;
        // Clamp to ±12 dB to prevent extreme amplification
        const clamped = Math.max(-12, Math.min(12, offsetDb));
        normalizationGain.gain.value = Math.pow(10, clamped / 20);
    }
    
    document.querySelectorAll('.song-card, .playlist-song-row').forEach(c => {
        if (c.dataset.songId === song.id) {
            c.classList.add('playing');
        } else {
            c.classList.remove('playing');
        }
    });
}
// Color Extraction Cache
const dominantColorCache = {};

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [h * 360, s, l];
}

function extractVibrantPalette(imgEl) {
    return new Promise((resolve) => {
        const key = imgEl.src;
        if (!key) return resolve({ primary: '80,40,120', secondary: '20,10,50' });
        if (dominantColorCache[key]) return resolve(dominantColorCache[key]);

        const canvas = document.createElement('canvas');
        const SIZE = 80; // downsample for speed
        canvas.width = SIZE; canvas.height = SIZE;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const process = (src) => {
            try {
                ctx.clearRect(0, 0, SIZE, SIZE);
                ctx.drawImage(src, 0, 0, SIZE, SIZE);
                const data = ctx.getImageData(0, 0, SIZE, SIZE).data;

                // Build a list of vibrant opaque pixels
                let buckets = [];
                for (let i = 0; i < data.length; i += 16) {
                    const a = data[i+3];
                    if (a < 100) continue;
                    const r = data[i], g = data[i+1], b = data[i+2];
                    const [h, s, l] = rgbToHsl(r, g, b);
                    if (s < 0.12 || l < 0.08 || l > 0.92) continue;
                    buckets.push({ r, g, b, h, s, l, score: s * (1 - Math.abs(l - 0.5) * 2) });
                }

                // Tier 2: if no vibrant pixels (grayscale art etc), relax thresholds
                if (buckets.length === 0) {
                    for (let i = 0; i < data.length; i += 16) {
                        const a = data[i+3];
                        if (a < 100) continue;
                        const r = data[i], g = data[i+1], b = data[i+2];
                        const [h, s, l] = rgbToHsl(r, g, b);
                        if (l < 0.05 || l > 0.97) continue; // only skip true black/white
                        buckets.push({ r, g, b, h, s, l, score: s * (1 - Math.abs(l - 0.5) * 2) });
                    }
                }

                // Final fallback: truly neutral dark (e.g. pure black/white art)
                if (buckets.length === 0) {
                    return resolve({ primary: '50,50,65', secondary: '20,20,30' });
                }

                // Sort by vibrance score, pick top primary
                buckets.sort((a, b) => b.score - a.score);
                const top = buckets[0];

                // Secondary = plain average of ALL non-transparent, non-black pixels
                // This captures whites/creams/grays that the saturation filter misses
                let ar = 0, ag = 0, ab = 0, ac = 0;
                for (let i = 0; i < data.length; i += 16) {
                    if (data[i+3] < 100) continue;
                    const br2 = data[i], bg2 = data[i+1], bb2 = data[i+2];
                    if (br2 < 15 && bg2 < 15 && bb2 < 15) continue; // skip true black
                    ar += br2; ag += bg2; ab += bb2; ac++;
                }
                const secondary = ac > 0
                    ? { r: Math.floor(ar / ac), g: Math.floor(ag / ac), b: Math.floor(ab / ac) }
                    : { r: Math.floor(top.r * 0.4), g: Math.floor(top.g * 0.4), b: Math.floor(top.b * 0.4) };

                const result = {
                    primary: `${top.r},${top.g},${top.b}`,
                    secondary: `${secondary.r},${secondary.g},${secondary.b}`
                };
                dominantColorCache[key] = result;
                resolve(result);
            } catch(e) {
                console.warn('Color extract error:', e);
                resolve({ primary: '80,40,120', secondary: '20,10,50' });
            }
        };

        if (imgEl.complete && imgEl.naturalWidth > 0) {
            process(imgEl);
        } else {
            const tmp = new Image();
            tmp.crossOrigin = 'Anonymous';
            tmp.onload = () => process(tmp);
            tmp.onerror = () => resolve({ primary: '80,40,120', secondary: '20,10,50' });
            tmp.src = key;
        }
    });
}

async function applyFullscreenAurora(coverUrl) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = coverUrl;

    const { primary, secondary } = await extractVibrantPalette(img);
    const fsBg = document.getElementById('fs-bg');

    // Clear old orbs
    fsBg.querySelectorAll('.fs-orb').forEach(o => o.remove());

    // Cap secondary brightness — average can come out near-white for some covers
    // Convert secondary to HSL, clamp lightness to max 55%, convert back
    const [sr, sg, sb] = secondary.split(',').map(Number);
    const [sh, ss, sl] = rgbToHsl(sr, sg, sb);
    let cappedSecondary = secondary;
    if (sl > 0.55) {
        const factor = 0.55 / sl;
        cappedSecondary = `${Math.floor(sr * factor)},${Math.floor(sg * factor)},${Math.floor(sb * factor)}`;
    }

    // 4 ambient orbs
    // Orbs must be large enough to overlap across the full screen from any corner
    const orbs = [
        // Primary — top-left, very large, strong
        { color: primary,         size: '130vmax', top: '-35%', left: '-35%', opacity: 0.70, blur: 110, anim: 'orbDrift0', dur: '24s', delay: '0s'   },
        // Secondary — bottom-right, also very large so it bleeds to center
        { color: cappedSecondary, size: '120vmax', top: '15%',  left: '15%',  opacity: 0.60, blur: 120, anim: 'orbDrift1', dur: '30s', delay: '-8s'  },
        // Primary echo — bottom-left for depth
        { color: primary,         size: '90vmax',  top: '50%',  left: '-20%', opacity: 0.35, blur: 90,  anim: 'orbDrift2', dur: '20s', delay: '-5s'  },
        // Secondary echo — top-right for depth
        { color: cappedSecondary, size: '80vmax',  top: '-20%', left: '50%',  opacity: 0.30, blur: 80,  anim: 'orbDrift3', dur: '26s', delay: '-12s' },
    ];

    orbs.forEach(def => {
        const orb = document.createElement('div');
        orb.className = 'fs-orb';
        orb.style.cssText = `
            width: ${def.size};
            aspect-ratio: 1;
            top: ${def.top};
            left: ${def.left};
            background: rgba(${def.color}, ${def.opacity});
            filter: blur(${def.blur}px);
            animation: ${def.anim} ${def.dur} ${def.delay} ease-in-out infinite alternate;
        `;
        fsBg.appendChild(orb);
    });

    const mixWhite = (str) => {
        const [r, g, b] = str.split(',').map(Number);
        return `${Math.min(255, Math.floor(r + (255-r)*0.4))},${Math.min(255, Math.floor(g + (255-g)*0.4))},${Math.min(255, Math.floor(b + (255-b)*0.4))}`;
    };
    window.fsUiPrimary = `rgb(${mixWhite(primary)})`;
    window.fsUiSecondary = `rgb(${mixWhite(secondary)})`;
    
    // Export raw colors for the play button, lightened ones for slider/visualizer
    document.documentElement.style.setProperty('--fs-primary', `rgb(${primary})`);
    document.documentElement.style.setProperty('--fs-secondary', `rgb(${secondary})`);
    document.documentElement.style.setProperty('--fs-ui-primary', window.fsUiPrimary);
    document.documentElement.style.setProperty('--fs-ui-secondary', window.fsUiSecondary);
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
    applyFullscreenAurora(coverUrl);
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
            audioElement.play().then(() => {
                if (currentQueue[currentQueueIndex]) {
                    updateMediaSession(currentQueue[currentQueueIndex]);
                }
            }).catch(err => console.error('Playback error:', err));
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

// --- Player Controls ----------------------------------------------------------

// --- Download with effects -----------------------------------------------------
// Uses OfflineAudioContext to render the full effect chain to a buffer,
// then encodes it as WAV and triggers a browser download.
// Supports: playback speed, reverb, 8D spatial audio, deep (pitch shift via speed).
async function downloadWithEffects() {
    const song = currentQueue[currentQueueIndex];
    if (!song) return;

    const btn = document.getElementById('btn-download');
    const blob = document.getElementById('cursor-blob');
    if (btn) { btn.disabled = true; btn.title = 'Rendering…'; }
    document.body.classList.add('rendering');
    showToast('Preparing your download...', 'FromBottom', 'accent', 8000);

    try {
        // Fetch the raw audio
        const resp = await fetch(`/stream/${song.id}`);
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
            convolver.buffer = buildImpulseResponse(offlineCtx, EffectConfig.reverb.duration, EffectConfig.reverb.decay, false, EffectConfig.reverb.damping);
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
        showToast('Download started!', 'FromBottom', 'accent', 2500);
    } catch(err) {
        console.error('Download failed:', err);
        alert('Download failed: ' + err.message);
    } finally {
        if (btn) { btn.disabled = false; btn.title = 'Download'; }
        document.body.classList.remove('rendering');
        if (blob) blob.style.opacity = '';
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

// Show a toast notification
// position: 'FromBottom' | 'FromRight'
// colorType: 'none' | 'red' | 'yellow' | 'green' | 'accent'
function showToast(message, position = 'FromBottom', colorType = 'none', duration = 3000) {
    const containerId = position === 'FromRight' ? 'toast-container-right' : 'toast-container-bottom';
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // For bottom toasts, we typically want only the most recent one
    if (position === 'FromBottom') container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = `toast toast-${position.toLowerCase()}`;
    
    let circleHtml = '';
    if (colorType !== 'none') {
        circleHtml = `<div class="toast-circle circle-${colorType}"></div>`;
    }
    
    toast.innerHTML = `${circleHtml}<span class="toast-msg">${message}</span>`;
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
        wire('cfg-8d-speed',      v => { EffectConfig.eightD.speed     = v; }, 'cfg-8d-speed-val',      v => v.toFixed(2));
        wire('cfg-8d-side-speed', v => { EffectConfig.eightD.sideSpeed = v; }, 'cfg-8d-side-speed-val', v => v.toFixed(2));
        wire('cfg-reverb-wet', v => { EffectConfig.reverb.wetGain = v; if (reverbActive && reverbWet) reverbWet.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05); }, 'cfg-reverb-wet-val', v => v.toFixed(2));
        wire('cfg-reverb-dry', v => { EffectConfig.reverb.dryGain = v; if (reverbActive && reverbDry) reverbDry.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05); }, 'cfg-reverb-dry-val', v => v.toFixed(2));
        wire('cfg-reverb-dur', v => {
            EffectConfig.reverb.duration = v;
            // Rebuild the convolver IR immediately so the change is audible
            if (reverbConvolver && audioCtx) {
                reverbConvolver.buffer = buildImpulseResponse(
                    audioCtx, v, EffectConfig.reverb.decay, false, EffectConfig.reverb.damping
                );
            }
        }, 'cfg-reverb-dur-val', v => v.toFixed(1) + 's');
        wire('cfg-reverb-damp', v => {
            EffectConfig.reverb.damping = v;
            // Rebuild the convolver IR immediately so the change is audible
            if (reverbConvolver && audioCtx) {
                reverbConvolver.buffer = buildImpulseResponse(
                    audioCtx, EffectConfig.reverb.duration, EffectConfig.reverb.decay, false, v
                );
            }
        }, 'cfg-reverb-damp-val', v => v.toFixed(2));
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

        // Up Next Toast Notification (show 10 seconds before end)
        if (!upNextToastShown && audioElement.duration - audioElement.currentTime <= 10) {
            upNextToastShown = true;
            if (currentQueue && currentQueueIndex + 1 < currentQueue.length) {
                const nextSong = currentQueue[currentQueueIndex + 1];
                showToast(`Up Next: ${nextSong.title || 'Unknown'} - ${nextSong.artist || 'Unknown'}`, 'FromRight', 'accent', 5000);
            }
        }

        // Industry-standard listen tracking: only accumulate time while audio is ACTIVELY playing.
        // This means page restores, seeks, and paused states never count toward the threshold.
        if (!audioElement.paused && !historyLoggedForCurrentSong) {
            if (_lastTickTime !== null) {
                const delta = (now - _lastTickTime) / 1000;
                // Cap delta to 2s to guard against tab-hidden gaps
                _listenedSeconds += Math.min(delta, 2);
            }
            _lastTickTime = now;

            if (_listenedSeconds >= 20) {
                const song = currentQueue[currentQueueIndex];
                if (song) {
                    addToHistory(song);
                    renderHome();
                }
                historyLoggedForCurrentSong = true;
            }
        } else {
            // Paused or not playing — reset tick anchor so we don't count gap time on resume
            _lastTickTime = null;
        }
    });
    seekBar.addEventListener('input', () => { audioElement.currentTime = seekBar.value; });
    audioElement.addEventListener('ended', () => {
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = setTimeout(() => {
            playNext();
        }, 1000);
    });

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
        let val = parseFloat(e.target.value);
        if (Math.abs(val - 1.0) < 0.05) {
            val = 1.0;
            volSlider.value = 1.0;
        }
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
        btnEffectReset.addEventListener('click', (e) => {
            e.stopPropagation();
            const defaults = {
                'cfg-8d-speed':      1.2,
                'cfg-8d-side-speed': -0.6,
                'cfg-reverb-wet':    0.75,
                'cfg-reverb-dry':    0.40,
                'cfg-reverb-dur':    3.0,
                'cfg-reverb-damp':   0.72,
                'cfg-bass':          0,
                'cfg-treble':        0
            };
            for (const [id, val] of Object.entries(defaults)) {
                const el = document.getElementById(id);
                if (el) {
                    el.value = val;
                    el.dispatchEvent(new Event('input',  { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    }

    // Reverb mode toggle (Plate / Room)
    const btnPlate = document.getElementById('btn-reverb-plate');
    const btnRoom  = document.getElementById('btn-reverb-room');
    function setReverbMode(mode) {
        EffectConfig.reverb.mode = mode;
        if (btnPlate) {
            btnPlate.style.background = mode === 'plate' ? 'var(--accent,#818cf8)' : 'transparent';
            btnPlate.style.color      = mode === 'plate' ? '#fff' : 'var(--text-secondary,#94a3b8)';
        }
        if (btnRoom) {
            btnRoom.style.background  = mode === 'room'  ? 'var(--accent,#818cf8)' : 'transparent';
            btnRoom.style.color       = mode === 'room'  ? '#fff' : 'var(--text-secondary,#94a3b8)';
        }
        if (reverbActive && isAudioInitialized) updateAudioRouting();
    }
    if (btnPlate) btnPlate.addEventListener('click', e => { e.stopPropagation(); setReverbMode('plate'); });
    if (btnRoom)  btnRoom.addEventListener('click',  e => { e.stopPropagation(); setReverbMode('room');  });

    // 8D
    const btn8D      = document.getElementById('btn-8d');
    const btn8DSplit = document.getElementById('btn-8d-split');
    btn8D.addEventListener('click', () => {
        is8DActive = !is8DActive;
        btn8D.classList.toggle('active',     is8DActive);
        btn8D.classList.toggle('glow-pulse', is8DActive);
        // Show/hide the split button alongside 8D
        if (btn8DSplit) btn8DSplit.style.display = is8DActive ? '' : 'none';
        // Turn off split mode when 8D is disabled
        if (!is8DActive && is8DSplitActive) {
            is8DSplitActive = false;
            if (btn8DSplit) btn8DSplit.classList.remove('active');
        }
        is8DActive ? enable8D() : disable8D();
    });
    if (btn8DSplit) {
        btn8DSplit.style.display = 'none'; // hidden until 8D is on
        btn8DSplit.addEventListener('click', () => {
            is8DSplitActive = !is8DSplitActive;
            btn8DSplit.classList.toggle('active',     is8DSplitActive);
            btn8DSplit.classList.toggle('glow-pulse', is8DSplitActive);
            if (isAudioInitialized) updateAudioRouting();
        });
    }

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
    let preFullscreenTheme = null;

    window.toggleFullscreen = function() {
        isFullscreen = !isFullscreen;
        if (isFullscreen) {
            preFullscreenTheme = document.documentElement.getAttribute('data-theme');
            if (preFullscreenTheme === 'light') document.documentElement.setAttribute('data-theme', 'dark');
            
            document.body.classList.add('fullscreen-open');
            fsView.classList.remove('hidden');
            playerBar.style.zIndex = '2001';
            if (iconExpand) iconExpand.style.display = 'none';
            if (iconCompress) iconCompress.style.display = '';
        } else {
            if (preFullscreenTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
            
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
    const tag  = e.target.tagName;
    const type = (e.target.type || '').toLowerCase();
    // Block shortcuts when user is typing in a text field
    const isTextEntry = (tag === 'TEXTAREA') ||
                        (tag === 'INPUT' && ['text','search','password','email','number','url'].includes(type));
    if (isTextEntry) return;

    if (e.code === 'Space') {
        e.preventDefault(); togglePlay();
    }
    else if (e.code === 'ArrowRight') {
        if (e.shiftKey) playNext();
        else { e.preventDefault(); audioElement.currentTime = Math.min(audioElement.duration || 0, audioElement.currentTime + 5); }
    }
    else if (e.code === 'ArrowLeft') {
        if (e.shiftKey) playPrev();
        else { e.preventDefault(); audioElement.currentTime = Math.max(0, audioElement.currentTime - 5); }
    }
    else if (e.code === 'ArrowUp') {
        e.preventDefault();
        const volSliderUp = document.getElementById('volume-slider');
        if (volSliderUp) {
            let v = parseFloat(volSliderUp.value) + 0.05;
            if (v > 2) v = 2;
            if (Math.abs(v - 1.0) < 0.05) v = 1.0;
            volSliderUp.value = v;
            applyVolume(v);
            const btnMute = document.getElementById('btn-mute');
            if (v > 0 && document.getElementById('icon-vol-up')) {
                document.getElementById('icon-vol-up').style.display = '';
                document.getElementById('icon-vol-mute').style.display = 'none';
            }
        }
    }
    else if (e.code === 'ArrowDown') {
        e.preventDefault();
        const volSliderDown = document.getElementById('volume-slider');
        if (volSliderDown) {
            let v = parseFloat(volSliderDown.value) - 0.05;
            if (v < 0) v = 0;
            if (Math.abs(v - 1.0) < 0.05) v = 1.0;
            volSliderDown.value = v;
            applyVolume(v);
            if (v === 0 && document.getElementById('icon-vol-up')) {
                document.getElementById('icon-vol-up').style.display = 'none';
                document.getElementById('icon-vol-mute').style.display = '';
            }
        }
    }
    else if (e.code === 'KeyM') {
        document.getElementById('btn-mute')?.click();
    }
    else if (e.code === 'KeyF') {
        // F key - toggle fullscreen
        document.getElementById('btn-fullscreen')?.click();
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

    normalizationGain = audioCtx.createGain();
    normalizationGain.gain.value = 1.0; // default: no adjustment

    masterVolumeGain = audioCtx.createGain();
    masterVolumeGain.gain.value = 1.0; // VOLUME KNOB

    compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = -3.0; // Starts compressing at -3dB
    compressor.knee.value = 0.0;       // Hard knee
    compressor.ratio.value = 20.0;     // High ratio to act as a limiter
    compressor.attack.value = 0.005;   // Fast attack to catch peaks
    compressor.release.value = 0.050;  // Fast release

    reverbConvolver = audioCtx.createConvolver();
    reverbConvolver.buffer = buildImpulseResponse(audioCtx, EffectConfig.reverb.duration, EffectConfig.reverb.decay, false, EffectConfig.reverb.damping);

    // Pre-delay before reverb convolver (key for perceived depth)
    reverbPreDelay = audioCtx.createDelay(0.5);
    reverbPreDelay.delayTime.value = EffectConfig.reverb.preDelay;

    // Early reflections: 8 discrete wall reflections before the diffuse tail
    earlyReflConvolver = audioCtx.createConvolver();
    earlyReflConvolver.buffer = buildEarlyReflectionsIR(audioCtx);
    earlyReflGain = audioCtx.createGain();
    earlyReflGain.gain.value = 0;

    // Air absorption: high freqs die faster (nature of real acoustics)
    reverbAirAbsorb = audioCtx.createBiquadFilter();
    reverbAirAbsorb.type = 'highshelf';
    reverbAirAbsorb.frequency.value = 4000;
    reverbAirAbsorb.gain.value = -6;

    // Haas stereo spread — FIXED: use ChannelSplitter first so merger gets mono inputs
    reverbSplitter = audioCtx.createChannelSplitter(2);
    reverbStereoL  = audioCtx.createDelay(0.1); reverbStereoL.delayTime.value = 0.008;
    reverbStereoR  = audioCtx.createDelay(0.1); reverbStereoR.delayTime.value = 0.023;
    reverbMerger   = audioCtx.createChannelMerger(2);

    reverbDry = audioCtx.createGain(); reverbDry.gain.value = 1;
    reverbWet = audioCtx.createGain(); reverbWet.gain.value = 0;

    // Mid/Side Split nodes
    msSplitter   = audioCtx.createChannelSplitter(2);
    midGainL     = audioCtx.createGain(); midGainL.gain.value     =  0.5;
    midGainR     = audioCtx.createGain(); midGainR.gain.value     =  0.5;
    sideGainL    = audioCtx.createGain(); sideGainL.gain.value    =  0.5;
    sideGainRinv = audioCtx.createGain(); sideGainRinv.gain.value = -0.5;
    midBus       = audioCtx.createGain(); midBus.gain.value       = 1.4; // slight boost for mid
    sideBus      = audioCtx.createGain(); sideBus.gain.value      = 1.8; // side is quieter, boost

    hrtfPannerSide = audioCtx.createPanner();
    hrtfPannerSide.panningModel   = 'HRTF';
    hrtfPannerSide.distanceModel  = 'inverse';
    hrtfPannerSide.refDistance    = 1;
    hrtfPannerSide.rolloffFactor  = 0.8;
    hrtfPannerSide.coneInnerAngle = 360;
    hrtfPannerSide.coneOuterAngle = 0;
    hrtfPannerSide.coneOuterGain  = 0;
    hrtfPannerSide.positionX.value = 0;
    hrtfPannerSide.positionY.value = 0;
    hrtfPannerSide.positionZ.value = 1; // starts opposite to main panner
    postGainSide = audioCtx.createGain(); postGainSide.gain.value = 1;

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
    roomConvolver.buffer = buildImpulseResponse(audioCtx, 0.6, 2.0, false, EffectConfig.reverb.damping);
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
}

function updateAudioRouting() {
    if (!isAudioInitialized) return;

    // Disconnect all nodes safely
    [source, preGain, depthFilter, dryGain, wetGain,
     roomConvolver, hrtfPanner, postGain, hrtfPannerSide, postGainSide,
     msSplitter, midBus, sideBus, midGainL, midGainR, sideGainL, sideGainRinv,
     reverbConvolver, reverbPreDelay, reverbDry, reverbWet, reverbSplitter,
     earlyReflConvolver, earlyReflGain, reverbAirAbsorb,
     reverbStereoL, reverbStereoR, reverbMerger,
     reverbOutput, bassFilter, trebleFilter, analyser]
    .forEach(n => { try { n.disconnect(); } catch(e) {} });

    const t = audioCtx.currentTime;
    const active = reverbActive;

    // ── Reverb Stage ────────────────────────────────────────────────────────
    source.connect(reverbDry);
    reverbDry.gain.setTargetAtTime(active ? EffectConfig.reverb.dryGain : 1, t, 0.05);

    if (active) {
        // Pre-delay → diffuse tail → air absorption → wet
        source.connect(reverbPreDelay);
        reverbPreDelay.delayTime.setTargetAtTime(EffectConfig.reverb.preDelay, t, 0.01);
        reverbPreDelay.connect(reverbConvolver);
        reverbConvolver.connect(reverbAirAbsorb);
        reverbAirAbsorb.connect(reverbWet);
        reverbWet.gain.setTargetAtTime(EffectConfig.reverb.wetGain, t, 0.05);

        if (EffectConfig.reverb.mode === 'room') {
            // ROOM: early reflections + Haas spread = realistic echoey space
            source.connect(earlyReflConvolver);
            earlyReflConvolver.connect(earlyReflGain);
            earlyReflGain.gain.setTargetAtTime(EffectConfig.reverb.wetGain * 0.3, t, 0.05);
            earlyReflGain.connect(reverbOutput);

            reverbWet.connect(reverbSplitter);
            reverbSplitter.connect(reverbStereoL, 0);
            reverbSplitter.connect(reverbStereoR, 1);
            reverbStereoL.connect(reverbMerger, 0, 0);
            reverbStereoR.connect(reverbMerger, 0, 1);
            reverbMerger.connect(reverbOutput);
        } else {
            // PLATE: pure smooth tail, no early reflections, no Haas
            // Works for any genre — lush, dreamy, not echoey
            earlyReflGain.gain.setTargetAtTime(0, t, 0.05);
            reverbWet.connect(reverbOutput);
        }
    } else {
        reverbWet.gain.setTargetAtTime(0, t, 0.05);
        earlyReflGain && earlyReflGain.gain.setTargetAtTime(0, t, 0.05);
    }

    reverbDry.connect(reverbOutput);

    // ── EQ Stage ────────────────────────────────────────────────────────────
    reverbOutput.connect(bassFilter);
    bassFilter.connect(trebleFilter);

    // ── 8D Stage ────────────────────────────────────────────────────────────
    if (is8DActive) {
        if (is8DSplitActive) {
            // Mid/Side Split: M=(L+R)/2 orbits one direction, S=(L-R)/2 the other
            trebleFilter.connect(msSplitter);

            // Mid bus = (L+R)/2
            msSplitter.connect(midGainL, 0);
            msSplitter.connect(midGainR, 1);
            midGainL.connect(midBus);
            midGainR.connect(midBus);

            // Side bus = (L-R)/2
            msSplitter.connect(sideGainL,    0);
            msSplitter.connect(sideGainRinv, 1);
            sideGainL.connect(sideBus);
            sideGainRinv.connect(sideBus);

            // Mid → room reverb → main HRTF panner
            midBus.connect(preGain);
            preGain.connect(depthFilter);
            depthFilter.connect(dryGain);
            depthFilter.connect(roomConvolver);
            roomConvolver.connect(wetGain);
            dryGain.connect(hrtfPanner);
            wetGain.connect(hrtfPanner);
            hrtfPanner.connect(postGain);
            postGain.connect(analyser);

            // Side → second HRTF panner (rotates independently)
            sideBus.connect(hrtfPannerSide);
            hrtfPannerSide.connect(postGainSide);
            postGainSide.connect(analyser);

        } else {
            // Normal 8D: full signal through single main HRTF panner
            trebleFilter.connect(preGain);
            preGain.connect(depthFilter);
            depthFilter.connect(dryGain);
            depthFilter.connect(roomConvolver);
            roomConvolver.connect(wetGain);
            dryGain.connect(hrtfPanner);
            wetGain.connect(hrtfPanner);
            hrtfPanner.connect(postGain);
            postGain.connect(analyser);
        }

        if (_8dRafId === null) {
            _8dAngle     = 0;
            _8dSideAngle = Math.PI; // start side panner opposite to mid
            start8DLoop();
        }
    } else {
        stop8DLoop();
        trebleFilter.connect(analyser);
    }

    analyser.connect(normalizationGain);
    normalizationGain.connect(masterVolumeGain);
    masterVolumeGain.connect(compressor);
    compressor.connect(audioCtx.destination);
}

function buildImpulseResponse(ctx, duration, decay, reverse, damping = 0.6) {
    const rate    = ctx.sampleRate;
    const length  = rate * duration;
    const impulse = ctx.createBuffer(2, length, rate);

    // Lowpass filter coefficient for warmth (higher = darker room)
    const alpha = Math.max(0, Math.min(0.99, damping));

    for (let ch = 0; ch < 2; ch++) {
        const buf = impulse.getChannelData(ch);
        let lastOut = 0;

        for (let i = 0; i < length; i++) {
            const n = reverse ? length - i : i;
            const noise = (Math.random() * 2 - 1);

            // 1-pole lowpass for natural acoustic dampening
            const filtered = (lastOut * alpha) + (noise * (1 - alpha));
            lastOut = filtered;

            // Natural exponential decay
            const env = Math.exp(-decay * (n / length) * 5.5);

            buf[i] = filtered * env;
        }
    }
    return impulse;
}

// Builds a synthetic early reflections impulse.
// Uses soft Gaussian bell curves per reflection (not hard single-sample spikes)
// so the convolution output sounds smooth and warm rather than metallic/harsh.
function buildEarlyReflectionsIR(ctx) {
    const rate   = ctx.sampleRate;
    const length = Math.floor(rate * 0.15); // 150ms window
    const ir     = ctx.createBuffer(2, length, rate);

    // Slightly asymmetric L/R timings create natural stereo width
    const reflections = [
        { tL: 0.012, tR: 0.013, g: 0.45 }, // 1st reflection
        { tL: 0.024, tR: 0.022, g: 0.32 }, // side wall
        { tL: 0.040, tR: 0.043, g: 0.22 }, // back wall
        { tL: 0.058, tR: 0.055, g: 0.14 }, // 2nd order
        { tL: 0.078, tR: 0.082, g: 0.09 }, // 2nd order
        { tL: 0.100, tR: 0.097, g: 0.05 }, // 3rd order
        { tL: 0.125, tR: 0.128, g: 0.03 }, // 3rd order
    ];

    const bufL = ir.getChannelData(0);
    const bufR = ir.getChannelData(1);
    const spread = Math.floor(rate * 0.001); // 1ms Gaussian spread per spike

    for (const ref of reflections) {
        const cL = Math.floor(ref.tL * rate);
        const cR = Math.floor(ref.tR * rate);
        // Paint a Gaussian bell curve centred on each reflection time
        for (let k = -spread; k <= spread; k++) {
            const env = Math.exp(-(k * k) / (spread * spread * 0.5));
            if (cL + k >= 0 && cL + k < length) bufL[cL + k] += ref.g * env;
            if (cR + k >= 0 && cR + k < length) bufR[cR + k] += ref.g * env;
        }
    }
    return ir;
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
    _8dStartCtxTime = audioCtx ? audioCtx.currentTime : 0;
    _8dStartAngle   = _8dAngle;
    _8dLastTime = null;

    function loop(ts) {
        if (!is8DActive) return;
        if (_8dLastTime !== null) {
            const dt = (ts - _8dLastTime) / 1000;
            _8dAngle     += EffectConfig.eightD.speed     * dt;
            _8dSideAngle += EffectConfig.eightD.sideSpeed * dt;
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

    // Side panner orbits at its own independent angle when split is active
    if (is8DSplitActive && hrtfPannerSide) {
        const sx = Math.sin(_8dSideAngle);
        const sz = -Math.cos(_8dSideAngle);
        const sy = Math.sin(_8dSideAngle * 0.3) * 0.15;
        hrtfPannerSide.positionX.setTargetAtTime(sx, t, 0.02);
        hrtfPannerSide.positionY.setTargetAtTime(sy, t, 0.02);
        hrtfPannerSide.positionZ.setTargetAtTime(sz, t, 0.02);
    }
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

// --- Visualizer ---------------------------------------------------------------
// Visualizer theme state
let vizTheme = localStorage.getItem('viz-theme') || 'standard';

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    const w = canvas.clientWidth  || canvas.offsetWidth  || canvas.parentElement?.clientWidth  || 0;
    const h = canvas.clientHeight || canvas.offsetHeight || 28;

    // Always clear to prevent Chrome compositing glitches
    if (w > 0 && h > 0) {
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        canvasCtx.clearRect(0, 0, w, h);
    }

    if (!isAudioInitialized || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray    = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Dynamic colors from fullscreen album art
    let c1 = '#818cf8', c2 = '#e879f9';
    if (document.body.classList.contains('fullscreen-open') && window.fsUiPrimary && window.fsUiSecondary) {
        c1 = window.fsUiPrimary;
        c2 = window.fsUiSecondary;
    }

    const barWidth = (w / bufferLength) * 2.5;
    let x = 0;

    switch (vizTheme) {

        // ── Standard ─────────────────────────────────────────────────
        case 'standard':
        default: {
            const grad = canvasCtx.createLinearGradient(0, h, 0, 0);
            grad.addColorStop(0, c1); grad.addColorStop(1, c2);
            canvasCtx.fillStyle = grad;
            for (let i = 0; i < bufferLength; i++) {
                const barH = (dataArray[i] / 255) * h;
                if (barH < 1) { x += barWidth + 1; continue; }
                canvasCtx.beginPath();
                if (canvasCtx.roundRect) canvasCtx.roundRect(x, h - barH, barWidth - 1, barH, [3, 3, 0, 0]);
                else canvasCtx.rect(x, h - barH, barWidth - 1, barH);
                canvasCtx.fill();
                x += barWidth + 1;
            }
            break;
        }

        // ── Oscilloscope Curvy ───────────────────────────────────────
        case 'curvy': {
            const timeData = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(timeData);

            canvasCtx.lineWidth = 3;
            canvasCtx.strokeStyle = c1;
            canvasCtx.shadowBlur = 8;
            canvasCtx.shadowColor = c1;

            canvasCtx.beginPath();
            const sliceWidth = w * 1.0 / bufferLength;
            let curX = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = timeData[i] / 128.0; 
                const y = v * h / 2;

                if (i === 0) {
                    canvasCtx.moveTo(curX, y);
                } else {
                    canvasCtx.lineTo(curX, y);
                }

                curX += sliceWidth;
            }

            canvasCtx.lineTo(w, h / 2);
            canvasCtx.stroke();
            canvasCtx.shadowBlur = 0;
            break;
        }


        // ── Minimal ──────────────────────────────────────────────────
        // Thin white stroke lines only — no fill
        case 'minimal': {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const strokeColor = isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)';
            const tickColor = isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,1)';
            canvasCtx.strokeStyle = strokeColor;
            canvasCtx.lineWidth = 1.5;
            for (let i = 0; i < bufferLength; i++) {
                const barH = (dataArray[i] / 255) * h;
                if (barH < 1) { x += barWidth + 1; continue; }
                canvasCtx.beginPath();
                canvasCtx.moveTo(x + (barWidth / 2), h);
                canvasCtx.lineTo(x + (barWidth / 2), h - barH);
                canvasCtx.stroke();
                // Bright top tick
                canvasCtx.strokeStyle = tickColor;
                canvasCtx.beginPath();
                canvasCtx.moveTo(x, h - barH);
                canvasCtx.lineTo(x + barWidth - 1, h - barH);
                canvasCtx.stroke();
                canvasCtx.strokeStyle = strokeColor;
                x += barWidth + 1;
            }
            break;
        }

        // ── Spectrum ─────────────────────────────────────────────────
        // Each bar cycles through the full rainbow
        case 'spectrum': {
            for (let i = 0; i < bufferLength; i++) {
                const barH = (dataArray[i] / 255) * h;
                if (barH < 1) { x += barWidth + 1; continue; }
                const hue = (i / bufferLength) * 360;
                canvasCtx.fillStyle = `hsl(${hue}, 100%, 60%)`;
                canvasCtx.beginPath();
                if (canvasCtx.roundRect) canvasCtx.roundRect(x, h - barH, barWidth - 1, barH, [3, 3, 0, 0]);
                else canvasCtx.rect(x, h - barH, barWidth - 1, barH);
                canvasCtx.fill();
                x += barWidth + 1;
            }
            break;
        }
    }
}

// --- Boot ---------------------------------------------------------------------
// --- Cursor blob --------------------------------------------------------------
function initCursorBlob() {
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
    // Also hide when the browser window itself loses focus (e.g. moving mouse to Chrome tabs/address bar)
    window.addEventListener('blur',  () => { blob.style.opacity = '0'; });
    window.addEventListener('focus', () => { /* keep hidden until mouse re-enters page */ });

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
}
// --- Lyrics & Notifications ---------------------------------------------------

async function fetchNotifications() {
    try {
        const res = await fetch('/api/notifications');
        const notifs = await res.json();
        renderNotifications(notifs);
        const hasUnseen = notifs.some(n => !n.seen);
        if (hasUnseen) {
            notifDot.classList.remove('hidden');
        } else {
            notifDot.classList.add('hidden');
        }
    } catch(e) { console.error('Error fetching notifications', e); }
}

function renderNotifications(notifs) {
    notifList.innerHTML = '';
    if (notifs.length === 0) {
        notifList.innerHTML = '<p style="color:var(--text-secondary); text-align:center; margin-top:40px;">No new notifications</p>';
        return;
    }
    notifs.forEach(n => {
        const div = document.createElement('div');
        div.className = 'notif-item';
        let icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>';
        
        div.innerHTML = `
            <div class="notif-item-icon">${icon}</div>
            <div class="notif-item-content">
                <div class="notif-item-title">${n.title}</div>
                <div class="notif-item-body">${n.body}</div>
                <div class="notif-item-time">${new Date(n.created_at).toLocaleString()}</div>
            </div>
        `;

        if (n.type === 'lyrics_fuzzy_match' && n.payload) {
            div.addEventListener('click', () => {
                const payload = JSON.parse(n.payload);
                fuzzyNotificationId = n.id;
                fuzzySongId = payload.songId;
                showFuzzyModal(payload.originalTitle, payload.candidates);
            });
        }
        notifList.appendChild(div);
    });
}

async function markNotificationsSeen() {
    try {
        await fetch('/api/notifications/seen', { method: 'PATCH' });
        notifDot.classList.add('hidden');
    } catch(e) {}
}

function showFuzzyModal(title, candidates) {
    document.getElementById('fuzzy-orig-title').textContent = title;
    fuzzyCandidatesList.innerHTML = '';
    selectedFuzzyCandidate = null;
    btnFuzzyConfirm.disabled = true;

    candidates.forEach(c => {
        const div = document.createElement('div');
        div.className = 'fuzzy-candidate';
        div.innerHTML = `
            <div style="flex:1;">
                <div style="font-weight:600; display:flex; justify-content:space-between;">
                    <span>${c.trackName}</span>
                    <span style="font-weight:400; color:var(--text-secondary); font-size:0.85rem;">${formatTime(c.duration)}</span>
                </div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">${c.artistName} &bull; ${c.albumName}</div>
            </div>
        `;
        div.addEventListener('click', () => {
            document.querySelectorAll('.fuzzy-candidate').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            selectedFuzzyCandidate = c;
            btnFuzzyConfirm.disabled = false;
        });
        fuzzyCandidatesList.appendChild(div);
    });
    fuzzyModal.classList.remove('hidden');
}

async function handleFuzzyConfirm() {
    if (!navigator.onLine) {
        showToast('You are offline', 'FromBottom', 'red');
        return;
    }
    if (!selectedFuzzyCandidate) return;
    const btn = btnFuzzyConfirm;
    const oldText = btn.textContent;
    btn.textContent = 'Saving...';
    try {
        const res = await fetchWithTimeout('/api/lyrics/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                songId: fuzzySongId, 
                lrclib_id: selectedFuzzyCandidate.id, 
                notificationId: fuzzyNotificationId 
            }),
            timeout: 10000
        });
        const data = await res.json();
        if (data.status === 'found') {
            showToast('Lyrics updated', 'FromBottom', 'green');
            fuzzyModal.classList.add('hidden');
            fetchNotifications(); // refresh
            if (currentSong && currentSong.id === fuzzySongId) {
                fetchLyricsForCurrentSong(); // reload in view
            }
        } else {
            showToast('Error updating lyrics', 'FromBottom', 'red');
        }
    } catch(e) {
        showToast('Error updating lyrics', 'FromBottom', 'red');
    } finally {
        btn.textContent = oldText;
    }
}

async function fetchLyricsForCurrentSong(showToastOnFail = false) {
    if (!currentSong) return;

    // Snapshot the song id so we can discard stale results if song changes
    const songIdAtFetch = currentSong.id;

    try {
        const res = await fetchWithTimeout(`/api/lyrics/${songIdAtFetch}`, { timeout: 10000 });
        const data = await res.json();

        if (!currentSong || currentSong.id !== songIdAtFetch) return;

        if (data.status === 'found') {
            currentLyrics = {
                synced: data.synced,
                lines: parseLrc(data.content)
            };
            renderLyrics();
            
            if (btnFsLyrics.classList.contains('active')) {
                fsContent.classList.add(`layout-${lyricsPosition}`);
                fsLyrics.classList.remove('hidden');
            }
        } else if (data.status === 'fuzzy_pending') {
            // Always deactivate button — lyrics aren't loaded yet
            btnFsLyrics.classList.remove('active');
            if (showToastOnFail) {
                showToast('Found multiple lyrics. Check notifications to confirm.', 'FromBottom', 'yellow');
            }
            fetchNotifications();
        } else if (data.status === 'not_found') {
            // Always deactivate button
            btnFsLyrics.classList.remove('active');
            if (showToastOnFail) {
                showToast('No lyrics found for this song.', 'FromBottom', 'yellow');
            }
            fetchNotifications();
        } else if (data.status === 'error' || !res.ok) {
            throw new Error('Server returned an error when fetching lyrics');
        }
    } catch (e) {
        console.error('Failed to fetch lyrics:', e);
        // Always deactivate button on any error (network, timeout, offline)
        btnFsLyrics.classList.remove('active');
        if (showToastOnFail) {
            const isOffline = !navigator.onLine || e.name === 'AbortError' || e instanceof TypeError;
            if (isOffline) {
                showToast('You are offline. Cannot fetch lyrics.', 'FromBottom', 'yellow');
            } else {
                showToast('Error loading lyrics.', 'FromBottom', 'red');
            }
        }
    }
}


function parseLrc(lrcString) {
    const lines = lrcString.split('\n');
    const parsed = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    const metaRegex = /^\[[a-zA-Z]+:/;
    
    for (let rawLine of lines) {
        let line = rawLine.replace(/^[\uFEFF\u200B]+/, '').trim();
        const match = line.match(timeRegex);
        if (match) {
            const m = parseInt(match[1]);
            const s = parseInt(match[2]);
            const ms = parseInt(match[3]);
            const timeInSeconds = m * 60 + s + (ms / (match[3].length === 3 ? 1000 : 100));
            const text = line.replace(timeRegex, '').trim();
            if (text) { // ignore empty lines with timestamps
                parsed.push({ time: timeInSeconds, text });
            }
        } else if (line && !metaRegex.test(line)) {
            // handle plain text, ignoring metadata tags like [ti:]
            parsed.push({ time: null, text: line });
        }
    }
    return parsed;
}

function renderLyrics() {
    lyricsInner.innerHTML = '';
    if (!currentLyrics || currentLyrics.lines.length === 0) return;

    currentLyrics.lines.forEach((line, i) => {
        const el = document.createElement('div');
        el.className = 'lyric-line';
        el.textContent = line.text;
        el.dataset.index = i;
        if (currentLyrics.synced && line.time !== null) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => {
                audioElement.currentTime = line.time;
            });
        }
        lyricsInner.appendChild(el);
    });
    updateSyncedLyrics(audioElement.currentTime);
}

function updateSyncedLyrics(currentTime) {
    const fsPlayer = document.getElementById('fullscreen-player');
    if (!currentLyrics || fsLyrics.classList.contains('hidden') || (fsPlayer && fsPlayer.classList.contains('hidden'))) return;

    let activeIndex = -1;
    if (currentLyrics.synced) {
        for (let i = 0; i < currentLyrics.lines.length; i++) {
            if (currentLyrics.lines[i].time === null) continue;
            if (currentTime >= currentLyrics.lines[i].time) {
                activeIndex = i;
            } else {
                break;
            }
        }
    } else {
        // Just highlight the first line for unsynced
        activeIndex = 0;
    }

    const isTopLayout = lyricsPosition === 'top';
    const lines = lyricsInner.querySelectorAll('.lyric-line');
    lines.forEach((el, i) => {
        // Clear all positional classes
        el.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2');

        if (i === activeIndex) {
            el.classList.add('active');
        } else if (isTopLayout) {
            const offset = i - activeIndex;
            if (offset === -2) el.classList.add('prev-2');
            else if (offset === -1) el.classList.add('prev-1');
            else if (offset === 1) el.classList.add('next-1');
            else if (offset === 2) el.classList.add('next-2');
        }
    });

    if (activeIndex !== -1 && !isTopLayout) {
        const activeEl = lines[activeIndex];
        const containerCenter = fsLyrics.clientHeight / 2;
        const scrollTarget = activeEl.offsetTop - containerCenter + (activeEl.clientHeight / 2);
        lyricsInner.style.transform = `translateY(-${scrollTarget}px)`;
    } else {
        lyricsInner.style.transform = `translateY(0)`;
    }
}

let currentDropzone = null;

fsLyrics.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'lyrics');
    setTimeout(() => fsLyrics.style.opacity = '0.4', 0);
    // Show only the zone that differs from current layout
    const isTop = fsContent.classList.contains('layout-top');
    fsDropzoneTop.classList.toggle('hidden', isTop);   // hide top if already top
    fsDropzoneSide.classList.toggle('hidden', !isTop); // hide side if already side
});

fsLyrics.addEventListener('dragend', () => {
    fsLyrics.style.opacity = '1';
    fsDropzoneTop.classList.add('hidden');
    fsDropzoneSide.classList.add('hidden');
    fsDropzoneTop.classList.remove('dragover');
    fsDropzoneSide.classList.remove('dragover');

    if (currentDropzone) {
        fsContent.classList.remove('layout-left', 'layout-right', 'layout-top');
        lyricsPosition = currentDropzone;
        fsContent.classList.add(`layout-${currentDropzone}`);
        updateSyncedLyrics(audioElement.currentTime);
        currentDropzone = null;
    }
});

const dropzones = [
    { el: fsDropzoneTop,  pos: 'top' },
    { el: fsDropzoneSide, pos: 'left' }
];

dropzones.forEach(dz => {
    dz.el.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        dz.el.classList.add('dragover');
        currentDropzone = dz.pos;
    });
    dz.el.addEventListener('dragleave', (e) => {
        // Only remove if we're truly leaving this element (not entering a child)
        if (!dz.el.contains(e.relatedTarget)) {
            dz.el.classList.remove('dragover');
            if (currentDropzone === dz.pos) currentDropzone = null;
        }
    });
    dz.el.addEventListener('drop', (e) => {
        e.preventDefault();
        dz.el.classList.remove('dragover');
        // Apply layout immediately on drop (dragend will also fire and skip since currentDropzone already set)
        fsContent.classList.remove('layout-left', 'layout-right', 'layout-top');
        lyricsPosition = dz.pos;
        fsContent.classList.add(`layout-${dz.pos}`);
        fsDropzoneTop.classList.add('hidden');
        fsDropzoneSide.classList.add('hidden');
        fsLyrics.style.opacity = '1';
        updateSyncedLyrics(audioElement.currentTime);
        currentDropzone = null; // prevent dragend from double-applying
    });
});

// Script is loaded at end of <body>, DOM is already ready — no need for DOMContentLoaded
(function initEventListeners() {
    // --- Notification & Lyrics Events ---
    btnNotifications.addEventListener('click', () => {
        let prevView = null;
        Object.entries(views).forEach(([k, v]) => {
            if (v && !v.classList.contains('hidden') && k !== 'notifications') prevView = k;
        });
        switchView('notifications');
        btnNotifBack.dataset.prev = prevView || 'home';
        markNotificationsSeen();
    });

    const btnFuzzyCancel = document.getElementById('btn-fuzzy-cancel');
    const btnFuzzyClose = document.getElementById('btn-fuzzy-close');

    btnNotifBack.addEventListener('click', () => switchView(btnNotifBack.dataset.prev || 'home'));

    const btnAppSettings = document.getElementById('btn-app-settings');
    const btnAppSettingsBack = document.getElementById('btn-app-settings-back');
    if (btnAppSettings) {
        btnAppSettings.addEventListener('click', () => {
            let prevView = null;
            Object.entries(views).forEach(([k, v]) => {
                if (v && !v.classList.contains('hidden') && k !== 'appSettings') prevView = k;
            });
            switchView('appSettings');
            if (btnAppSettingsBack) btnAppSettingsBack.dataset.prev = prevView || 'home';
        });
    }
    if (btnAppSettingsBack) {
        btnAppSettingsBack.addEventListener('click', () => switchView(btnAppSettingsBack.dataset.prev || 'home'));
    }

    btnClearNotifs.addEventListener('click', async () => {
        const items = document.querySelectorAll('.notif-item');
        items.forEach(el => el.style.opacity = '0');
        setTimeout(async () => {
            await fetch('/api/notifications', { method: 'DELETE' });
            renderNotifications([]);
        }, 300);
    });

    if (btnFuzzyCancel) btnFuzzyCancel.addEventListener('click', () => fuzzyModal.classList.add('hidden'));
    if (btnFuzzyClose) btnFuzzyClose.addEventListener('click', () => fuzzyModal.classList.add('hidden'));
    if (btnFuzzyConfirm) btnFuzzyConfirm.addEventListener('click', handleFuzzyConfirm);

    if (btnFsLyrics) {
        btnFsLyrics.addEventListener('click', () => {
            console.log('[Lyrics] btn clicked. currentSong:', currentSong, 'currentLyrics:', currentLyrics);
            if (!currentSong) {
                showToast('No song playing.', 'FromBottom', 'red');
                return;
            }
            
            // Toggle logic: if we already have a lyrics layout, remove it
            const hasLayout = fsContent.classList.contains('layout-left') || fsContent.classList.contains('layout-right') || fsContent.classList.contains('layout-top');
            console.log('[Lyrics] hasLayout:', hasLayout, 'fsContent classes:', fsContent.className);
            
            if (hasLayout) {
                fsContent.classList.remove('layout-left', 'layout-right', 'layout-top');
                fsLyrics.classList.add('hidden');
                btnFsLyrics.classList.remove('active');
            } else {
                btnFsLyrics.classList.add('active');
                
                if (!currentLyrics) {
                    fetchLyricsForCurrentSong(true);
                } else {
                    if (currentLyrics.lines && currentLyrics.lines.length > 0) {
                        fsContent.classList.add(`layout-${lyricsPosition}`);
                        fsLyrics.classList.remove('hidden');
                        renderLyrics();
                    } else {
                        showToast('No lyrics found for this song.', 'FromBottom', 'yellow');
                        btnFsLyrics.classList.remove('active');
                    }
                }
            }
        });
    }
    
    audioElement.addEventListener('timeupdate', () => {
        if (currentLyrics) updateSyncedLyrics(audioElement.currentTime);
    });

    fetchNotifications();
    setInterval(fetchNotifications, 30000);

    const btnRefreshExplore = document.getElementById('btn-refresh-explore');
    if (btnRefreshExplore) {
        btnRefreshExplore.addEventListener('click', async (e) => {
            const btn = e.currentTarget;
            btn.classList.add('spinning');
            try {
                const res = await fetch('/api/library');
                allSongs = await res.json();
                renderExploreSongs();
                showToast('Library refreshed!', 'FromBottom', 'green');
            } catch (err) {
                console.error('Failed to refresh library:', err);
                showToast('Failed to refresh library', 'FromBottom', 'red');
            } finally {
                setTimeout(() => btn.classList.remove('spinning'), 500);
            }
        });
    }

    // ── Discovery Modal ──────────────────────────────────────────────────────
    const discoveryOverlay  = document.getElementById('discovery-overlay');
    const btnDiscovery      = document.getElementById('btn-discovery');
    const btnCloseDiscovery = document.getElementById('btn-close-discovery');
    const discYtInput       = document.getElementById('disc-yt-input');
    const discYtResults     = document.getElementById('disc-yt-results');
    const discLyricsSongInput    = document.getElementById('disc-lyrics-song-input');
    const discLyricsSongDropdown = document.getElementById('disc-lyrics-song-dropdown');
    const discLyricsResults      = document.getElementById('disc-lyrics-results');

    let discSelectedSongId = null;

    function openDiscovery(section = 'download') {
        discoveryOverlay.classList.remove('hidden');
        // Force reflow before adding visible so transition fires
        requestAnimationFrame(() => {
            requestAnimationFrame(() => discoveryOverlay.classList.add('visible'));
        });
        switchDiscoverySection(section);
    }

    function closeDiscovery() {
        discoveryOverlay.classList.remove('visible');
        discoveryOverlay.addEventListener('transitionend', () => {
            discoveryOverlay.classList.add('hidden');
        }, { once: true });
    }

    function switchDiscoverySection(name) {
        document.querySelectorAll('.discovery-nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === name);
        });
        document.querySelectorAll('.discovery-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `disc-section-${name}`);
        });
        if (name === 'covers') loadCoverArtSection('no-cover');
    }

    // Open / close
    btnDiscovery?.addEventListener('click', () => openDiscovery());
    btnCloseDiscovery?.addEventListener('click', closeDiscovery);
    discoveryOverlay?.addEventListener('click', (e) => {
        if (e.target === discoveryOverlay) closeDiscovery();
    });

    // Nav switching
    document.querySelectorAll('.discovery-nav-item').forEach(btn => {
        btn.addEventListener('click', () => switchDiscoverySection(btn.dataset.section));
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !discoveryOverlay.classList.contains('hidden')) closeDiscovery();
    });

    // ── Cover Art Manager ───────────────────────────────────────────
    let _coverLibCache = null;

    async function getCoverLib() {
        if (!_coverLibCache) {
            const res = await fetch('/api/library');
            _coverLibCache = await res.json();
        }
        return _coverLibCache;
    }

    function invalidateCoverCache() { _coverLibCache = null; }

    async function loadCoverArtSection(filter) {
        const container = document.getElementById('disc-covers-results');
        document.querySelectorAll('.disc-filter-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.filter === filter);
        });
        container.innerHTML = '<p class="disc-empty-hint">Loading…</p>';
        try {
            const songs = await getCoverLib();
            let filtered;
            switch (filter) {
                case 'no-cover': filtered = songs.filter(s => !s.hasAnyCover); break;
                case 'id3': filtered = songs.filter(s => s.hasID3Cover && !s.hasCustomCover && !s.hasItunesCover); break;
                case 'itunes': filtered = songs.filter(s => s.hasItunesCover); break;
                case 'reverted': filtered = songs.filter(s => s.coverReverted); break;
                case 'custom': filtered = songs.filter(s => s.hasCustomCover); break;
                default: filtered = songs;
            }
            if (filtered.length === 0) {
                container.innerHTML = `<p class="disc-empty-hint">No songs match this filter</p>`;
                return;
            }
            container.innerHTML = '';
            for (const song of filtered) {
                container.appendChild(buildCoverRow(song, filter));
            }
        } catch (e) {
            container.innerHTML = '<p class="disc-empty-hint">Failed to load library</p>';
        }
    }

    function getCoverBadge(song) {
        if (song.hasCustomCover) return ['custom', 'User Upload'];
        if (song.hasItunesCover) return ['itunes', 'iTunes'];
        if (song.hasID3Cover)    return ['id3', 'Embedded'];
        if (song.coverReverted)  return ['reverted', 'Reverted'];
        return ['no-cover', 'No Cover'];
    }

    function buildCoverRow(song, activeFilter) {
        const row = document.createElement('div');
        row.className = 'disc-cover-row';
        row.dataset.id = song.id;

        const hasCover = song.hasCustomCover || song.hasItunesCover || song.hasID3Cover;
        const thumbHtml = hasCover
            ? `<img class="disc-cover-thumb" src="/api/cover/${song.id}?t=${Date.now()}" alt="">`
            : `<div class="disc-cover-thumb-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;

        const [badgeClass, badgeText] = getCoverBadge(song);

        let actions = `<label class="disc-cover-btn" title="Upload cover" style="cursor:pointer;">
            Upload<input type="file" accept="image/jpeg,image/png" style="display:none" onchange="discCoverUpload(this,'${song.id}')">
        </label>`;
        if (song.hasItunesCover) {
            actions += `<button class="disc-cover-btn danger" onclick="discCoverRevert('${song.id}', this)">Revert</button>`;
        }
        if (!song.hasItunesCover && !song.hasCustomCover && !song.coverReverted) {
            actions += `<button class="disc-cover-btn" onclick="discCoverFetch('${song.id}','${escHtml(song.title)}','${escHtml(song.artist)}', this)">Auto-fetch</button>`;
        }
        if (song.coverReverted) {
            actions += `<button class="disc-cover-btn" onclick="discCoverUnrevert('${song.id}', this)">Allow Auto-fetch</button>`;
        }

        row.innerHTML = `
            ${thumbHtml}
            <div class="disc-cover-info">
                <div class="disc-cover-title">${escHtml(song.title)}</div>
                <div class="disc-cover-artist">${escHtml(song.artist)}</div>
            </div>
            <span class="disc-cover-badge ${badgeClass}">${badgeText}</span>
            <div class="disc-cover-actions">${actions}</div>
        `;
        return row;
    }

    function escHtml(str) {
        return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }

    window.discCoverUpload = async function(input, songId) {
        if (!input.files || !input.files[0]) return;
        const fd = new FormData();
        fd.append('cover', input.files[0]);
        fd.append('id', songId);
        try {
            const res = await fetch('/api/upload-cover', { method: 'POST', body: fd });
            if (res.ok) {
                invalidateCoverCache();
                showToast('Cover uploaded!', 'FromBottom', 'green');
                const activeChip = document.querySelector('.disc-filter-chip.active');
                if (activeChip) loadCoverArtSection(activeChip.dataset.filter);
                coverBustMap[songId] = Date.now();
                refreshCoverImages();
            } else {
                showToast('Upload failed', 'FromBottom', 'red');
            }
        } catch (e) { showToast('Upload failed', 'FromBottom', 'red'); }
    };

    window.discCoverRevert = async function(songId, btn) {
        btn.disabled = true;
        try {
            const res = await fetch(`/api/itunes-cover/${encodeURIComponent(songId)}`, { method: 'DELETE' });
            if (res.ok) {
                invalidateCoverCache();
                showToast('Reverted — iTunes art removed, auto-fetch blocked', 'FromBottom', 'green');
                coverBustMap[songId] = Date.now();
                refreshCoverImages();
                const activeChip = document.querySelector('.disc-filter-chip.active');
                if (activeChip) loadCoverArtSection(activeChip.dataset.filter);
            } else {
                showToast('Revert failed', 'FromBottom', 'red');
                btn.disabled = false;
            }
        } catch (e) { showToast('Revert failed', 'FromBottom', 'red'); btn.disabled = false; }
    };

    window.discCoverFetch = async function(songId, title, artist, btn) {
        btn.disabled = true;
        try {
            const res = await fetch('/api/fetch-cover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songs: [{ id: songId, title, artist, forceOnline: false }] })
            });
            const data = await res.json();
            const result = data.results?.[0];
            if (result?.success) {
                invalidateCoverCache();
                showToast('Cover art fetched!', 'FromBottom', 'green');
                coverBustMap[songId] = Date.now();
                refreshCoverImages();
                const activeChip = document.querySelector('.disc-filter-chip.active');
                if (activeChip) loadCoverArtSection(activeChip.dataset.filter);
            } else {
                showToast(`No cover found (${result?.reason || 'unknown'})`, 'FromBottom', 'red');
                btn.disabled = false;
            }
        } catch (e) { showToast('Fetch failed', 'FromBottom', 'red'); btn.disabled = false; }
    };

    window.discCoverUnrevert = async function(songId, btn) {
        btn.disabled = true;
        try {
            await fetch('/api/save-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: songId, clearCoverReverted: true })
            });
            invalidateCoverCache();
            showToast('Auto-fetch re-enabled for this song', 'FromBottom', 'green');
            const activeChip = document.querySelector('.disc-filter-chip.active');
            if (activeChip) loadCoverArtSection(activeChip.dataset.filter);
        } catch (e) { showToast('Failed', 'FromBottom', 'red'); btn.disabled = false; }
    };

    document.querySelectorAll('.disc-filter-chip').forEach(chip => {
        chip.addEventListener('click', () => loadCoverArtSection(chip.dataset.filter));
    });    // ── YouTube Search ────────────────────────────────────────────────────────
    function formatDuration(secs) {
        if (!secs) return '';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    async function searchYouTube(q) {
        if (!navigator.onLine) {
            discYtResults.innerHTML = '<p class="disc-empty-hint">⚠️ No internet connection</p>';
            showToast('You are offline', 'FromBottom', 'red');
            return;
        }
        discYtResults.innerHTML = '<p class="disc-empty-hint">Searching…</p>';
        try {
            const res = await fetchWithTimeout(`/api/discovery/search?q=${encodeURIComponent(q)}`, { timeout: 15000 });
            const items = await res.json();
            if (!items.length) {
                discYtResults.innerHTML = '<p class="disc-empty-hint">No results found</p>';
                return;
            }
            discYtResults.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'yt-result';
                card.innerHTML = `
                    <img class="yt-thumb" src="${item.thumbnail}" alt="" loading="lazy" onerror="this.style.background='var(--btn-bg)'">
                    <div class="yt-info">
                        <div class="yt-title" title="${item.title}">${item.title}</div>
                        <div class="yt-meta">${item.channel}${item.duration ? ' · ' + formatDuration(item.duration) : ''}</div>
                    </div>
                    <div class="yt-actions">
                        <button class="btn-yt-open" title="Open on YouTube">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            Open
                        </button>
                        <button class="btn-yt-download" data-id="${item.id}" data-title="${item.title.replace(/"/g,'&quot;')}">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download
                        </button>
                    </div>`;

                card.querySelector('.btn-yt-open').addEventListener('click', () => {
                    window.open(`https://www.youtube.com/watch?v=${item.id}`, '_blank');
                });
                card.querySelector('.btn-yt-download').addEventListener('click', async (e) => {
                    await downloadYtTrack(item.id, item.title, e.currentTarget);
                });
                discYtResults.appendChild(card);
            });
        } catch (err) {
            let msg = 'Search failed';
            if (err.name === 'AbortError' || err.message.includes('timeout')) msg = 'Server timeout. Please try again.';
            else if (err.message === 'Failed to fetch') msg = 'Server unreachable. Please check connection.';
            
            discYtResults.innerHTML = `<p class="disc-empty-hint">${msg}</p>`;
            showToast(msg, 'FromBottom', 'red');
            console.error('[Discovery] YT search error:', err);
        }
    }

    async function downloadYtTrack(videoId, title, btn) {
        if (!navigator.onLine) {
            showToast('You are offline', 'FromBottom', 'red');
            return;
        }
        // Loading state
        btn.classList.add('loading');
        btn.innerHTML = '<div class="disc-spinner"></div>';

        try {
            const res = await fetchWithTimeout('/api/discovery/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoId, title }),
                timeout: 180000 // 3 minutes
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Download failed');

            // Done state
            btn.classList.remove('loading');
            btn.classList.add('done');
            btn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Done`;

            // Silently refresh library in background
            fetch('/api/library').then(r => r.json()).then(songs => {
                allSongs = songs;
                renderExploreSongs();
            }).catch(() => {});

            showToast(`"${data.filename.replace(/\.mp3$/i,'')}" downloaded`, 'FromRight', 'green', 4000);

        } catch (err) {
            btn.classList.remove('loading');
            btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Retry`;
            
            let msg = 'Download failed';
            if (err.name === 'AbortError' || err.message.includes('timeout')) msg = 'Download timed out. Server might be busy.';
            else if (err.message === 'Failed to fetch') msg = 'Server offline or unreachable.';
            else msg = err.message || msg;
            
            showToast(msg, 'FromBottom', 'red');
            console.error('[Discovery] download error:', err);
        }
    }

    discYtInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const q = discYtInput.value.trim();
            if (q) searchYouTube(q);
        }
    });

    // ── Lyrics Manager ────────────────────────────────────────────────────────
    discLyricsSongInput?.addEventListener('input', () => {
        const q = discLyricsSongInput.value.toLowerCase();
        const matches = allSongs.filter(s =>
            (s.title || '').toLowerCase().includes(q) ||
            (s.artist || '').toLowerCase().includes(q)
        ).slice(0, 8);

        if (!q || !matches.length) {
            discLyricsSongDropdown.classList.add('hidden');
            return;
        }
        discLyricsSongDropdown.innerHTML = '';
        matches.forEach(song => {
            const opt = document.createElement('div');
            opt.className = 'disc-song-option';
            opt.textContent = `${song.artist || 'Unknown'} - ${song.title}`;
            opt.addEventListener('click', () => {
                discSelectedSongId = song.id;
                discLyricsSongInput.value = `${song.artist || 'Unknown'} - ${song.title}`;
                discLyricsSongDropdown.classList.add('hidden');
                loadLyricsCandidates(song.id);
            });
            discLyricsSongDropdown.appendChild(opt);
        });
        discLyricsSongDropdown.classList.remove('hidden');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!discLyricsSongDropdown?.contains(e.target) && e.target !== discLyricsSongInput) {
            discLyricsSongDropdown?.classList.add('hidden');
        }
    });

    async function loadLyricsCandidates(songId) {
        if (!navigator.onLine) {
            discLyricsResults.innerHTML = '<p class="disc-empty-hint">⚠️ No internet connection</p>';
            showToast('You are offline', 'FromBottom', 'red');
            return;
        }
        discLyricsResults.innerHTML = '<p class="disc-empty-hint">Searching LRCLIB…</p>';
        try {
            const res = await fetchWithTimeout(`/api/discovery/lyrics-candidates?songId=${songId}`, { timeout: 10000 });
            const candidates = await res.json();
            if (!candidates.length) {
                discLyricsResults.innerHTML = '<p class="disc-empty-hint">No lyrics found for this song</p>';
                return;
            }
            discLyricsResults.innerHTML = '';
            candidates.forEach(c => {
                const row = document.createElement('div');
                row.className = 'lyric-candidate';
                const dur = c.duration ? formatDuration(c.duration) : '';
                const badge = c.hasSynced
                    ? '<span class="lyric-synced-badge">Synced</span>'
                    : '<span class="lyric-plain-badge">Plain</span>';
                
                const pillHtml = c.isCurrent ? '<span class="lyric-current-pill" style="font-size: 0.65rem; background: var(--accent-purple); color: #fff; padding: 2px 6px; border-radius: 12px; margin-left: 8px; vertical-align: middle;">Current</span>' : '';
                const btnContent = c.isCurrent ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px;"><polyline points="20 6 9 17 4 12"/></svg> Saved' : 'Use This';
                const btnClass = c.isCurrent ? 'btn-use-lyric done' : 'btn-use-lyric';
                
                row.innerHTML = `
                    <div class="lyric-candidate-info">
                        <div class="lyric-candidate-title">${c.trackName}${pillHtml}</div>
                        <div class="lyric-candidate-meta">${c.artistName}${c.albumName ? ' · ' + c.albumName : ''}${dur ? ' · ' + dur : ''}</div>
                    </div>
                    ${badge}
                    <button class="${btnClass}">${btnContent}</button>`;
                row.querySelector('.btn-use-lyric').addEventListener('click', async (e) => {
                    await saveLyric(songId, c.trackId, e.currentTarget, c.trackName);
                });
                discLyricsResults.appendChild(row);
            });
        } catch (err) {
            discLyricsResults.innerHTML = '<p class="disc-empty-hint">Failed to load candidates</p>';
            console.error('[Discovery] lyrics candidates error:', err);
        }
    }

    async function saveLyric(songId, trackId, btn, trackName) {
        if (!navigator.onLine) {
            showToast('You are offline', 'FromBottom', 'red');
            return;
        }
        const orig = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = 'Saving…';
        try {
            const res = await fetchWithTimeout('/api/discovery/lyrics-save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId, trackId }),
                timeout: 10000
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Save failed');

            // Reset other buttons
            const allRows = btn.closest('.disc-results').querySelectorAll('.lyric-candidate');
            allRows.forEach(r => {
                const b = r.querySelector('.btn-use-lyric');
                if (b && b !== btn) {
                    b.classList.remove('done');
                    b.innerHTML = 'Use This';
                    b.disabled = false;
                }
                const pill = r.querySelector('.lyric-current-pill');
                if (pill) pill.remove();
            });

            btn.classList.add('done');
            btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px;"><polyline points="20 6 9 17 4 12"/></svg> Saved`;
            
            const titleDiv = btn.closest('.lyric-candidate').querySelector('.lyric-candidate-title');
            if (titleDiv && !titleDiv.querySelector('.lyric-current-pill')) {
                titleDiv.insertAdjacentHTML('beforeend', '<span class="lyric-current-pill" style="font-size: 0.65rem; background: var(--accent-purple); color: #fff; padding: 2px 6px; border-radius: 12px; margin-left: 8px; vertical-align: middle;">Current</span>');
            }

            // Invalidate lyrics cache for current song if it's the same
            if (currentSong && currentSong.id === songId) {
                currentLyrics = null;
            }

            showToast(`Lyrics updated`, 'FromBottom', 'green');
        } catch (err) {
            btn.disabled = false;
            btn.innerHTML = orig;
            showToast('Failed to save lyrics', 'FromBottom', 'red');
            console.error('[Discovery] save lyric error:', err);
        }
    }
    // ─────────────────────────────────────────────────────────────────────────

    function initAppSettings() {
        const settingsRaw = localStorage.getItem('lofi-settings');
        const settings = settingsRaw ? JSON.parse(settingsRaw) : { lyricsMode: 'standard' };

        // ── Sidebar navigation ──────────────────────────────────────
        const navItems = document.querySelectorAll('.settings-nav-item');
        const panels = document.querySelectorAll('.settings-panel');

        navItems.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.panel;
                navItems.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const targetPanel = document.getElementById(target);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });

        // ── Toggles ─────────────────────────────────────────────────
        const chkAutoplay = document.getElementById('setting-autoplay');
        const chkOnline = document.getElementById('setting-online-covers');
        const rdoLyricsStd = document.getElementById('setting-lyrics-standard');

        if (chkAutoplay) {
            chkAutoplay.checked = !!settings.autoplay;
            chkAutoplay.addEventListener('change', e => {
                settings.autoplay = e.target.checked;
                localStorage.setItem('lofi-settings', JSON.stringify(settings));
            });
        }

        if (chkOnline) {
            chkOnline.checked = !!settings.onlineCovers;
            chkOnline.addEventListener('change', e => {
                settings.onlineCovers = e.target.checked;
                localStorage.setItem('lofi-settings', JSON.stringify(settings));
                refreshCoverImages();
            });
        }

        if (rdoLyricsStd) {
            rdoLyricsStd.checked = true;
        }

        // ── Visualizer Theme ─────────────────────────────────────────
        const vizRadios = document.querySelectorAll('input[name="viz-theme"]');
        // Restore saved theme
        const savedViz = localStorage.getItem('viz-theme') || 'standard';
        vizRadios.forEach(r => {
            if (r.value === savedViz) r.checked = true;
            r.addEventListener('change', e => {
                if (e.target.checked) {
                    vizTheme = e.target.value;
                    localStorage.setItem('viz-theme', vizTheme);
                }
            });
        });

        // ── Reset Analytics ──────────────────────────────────────────
        const btnResetAnalytics = document.getElementById('btn-reset-analytics');
        if (btnResetAnalytics) {
            btnResetAnalytics.addEventListener('click', () => {
                const conf = document.getElementById('delete-modal');
                const title = document.getElementById('delete-modal-title');
                const msg = document.getElementById('delete-modal-msg');
                const confirmBtn = document.getElementById('btn-delete-confirm');
                if (conf && title && msg && confirmBtn) {
                    title.textContent = 'Reset Analytics';
                    msg.textContent = 'Are you sure you want to permanently delete all play history and analytics?';
                    conf.classList.remove('hidden');
                    
                    const onConfirm = async () => {
                        confirmBtn.removeEventListener('click', onConfirm);
                        try {
                            const res = await fetchWithTimeout('/api/analytics/reset', { method: 'DELETE' });
                            if (res.ok) {
                                showToast('Analytics reset successfully', 'FromBottom', 'green');
                                _historyCache = null;
                                _analyticsCache = null;
                                loadHistoryCache();
                                loadAnalyticsCache();
                                renderHome();
                            } else throw new Error('Failed to reset');
                        } catch (e) {
                            showToast('Failed to reset analytics', 'FromBottom', 'red');
                        }
                        conf.classList.add('hidden');
                    };
                    confirmBtn.addEventListener('click', onConfirm);
                }
            });
        }

        // ── Default Cover Upload ─────────────────────────────────────
        const defaultCoverUpload = document.getElementById('setting-default-cover-upload');
        const btnResetDefaultCover = document.getElementById('btn-reset-default-cover');
        const defaultCoverPreview = document.getElementById('setting-default-cover-preview');

        if (defaultCoverUpload) {
            defaultCoverUpload.addEventListener('change', async e => {
                const file = e.target.files[0];
                if (!file) return;
                const fd = new FormData();
                fd.append('cover', file);
                try {
                    const res = await fetchWithTimeout('/api/default-cover', { method: 'POST', body: fd }, 15000);
                    if (res.ok) {
                        showToast('Default cover updated', 'FromBottom', 'green');
                        if (defaultCoverPreview) defaultCoverPreview.src = '/api/cover/default?t=' + Date.now();
                        refreshCoverImages();
                    } else throw new Error();
                } catch(err) {
                    showToast('Failed to update default cover', 'FromBottom', 'red');
                }
            });
        }

        if (btnResetDefaultCover) {
            btnResetDefaultCover.addEventListener('click', async () => {
                try {
                    const res = await fetchWithTimeout('/api/default-cover', { method: 'DELETE' });
                    if (res.ok) {
                        showToast('Restored built-in default cover', 'FromBottom', 'green');
                        if (defaultCoverPreview) defaultCoverPreview.src = '/api/cover/default?t=' + Date.now();
                        refreshCoverImages();
                    } else throw new Error();
                } catch(err) {
                    showToast('Failed to restore default cover', 'FromBottom', 'red');
                }
            });
        }

        // ── About Panel ──────────────────────────────────────────────
        async function loadAboutData() {
            try {
                const res = await fetch('/api/about');
                if (!res.ok) return;
                const data = await res.json();
                const vEl = document.getElementById('about-version');
                const vBadge = document.getElementById('about-version-badge');
                const licEl = document.getElementById('about-license');
                const repoEl = document.getElementById('about-repo-link');
                const creatorEl = document.getElementById('about-creator');
                const visionEl = document.getElementById('about-vision');

                if (vEl) vEl.textContent = data.version;
                if (vBadge) vBadge.textContent = `v${data.version}`;
                if (licEl) licEl.textContent = data.license;
                if (repoEl) { repoEl.href = data.repo; repoEl.textContent = ''; repoEl.insertAdjacentHTML('afterbegin', `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> github.com/rxdwan/baladio`); }
                if (creatorEl) creatorEl.textContent = data.creator;
                if (visionEl) visionEl.textContent = data.vision;
            } catch(e) { /* silent */ }
        }

        // Lazy-load About data when About panel is clicked
        document.querySelector('[data-panel="panel-about"]')?.addEventListener('click', () => {
            loadAboutData();
        });

        // ── Check for Update ─────────────────────────────────────────
        const btnCheckUpdate = document.getElementById('btn-check-update');
        if (btnCheckUpdate) {
            btnCheckUpdate.addEventListener('click', () => {
                showToast('Update checks are not yet implemented', 'FromBottom', 'default');
            });
        }

        // ── Changelog Modal ──────────────────────────────────────────
        const changelogModal = document.getElementById('changelog-modal');
        const changelogContent = document.getElementById('changelog-content');
        const btnChangelogClose = document.getElementById('btn-changelog-close');
        const btnViewChangelog = document.getElementById('btn-view-changelog');
        const aboutVersionBadge = document.getElementById('about-version-badge');

        window.openChangelogModal = async function() {
            if (!changelogModal || !changelogContent) return;
            changelogModal.classList.remove('hidden');
            if (!changelogContent.dataset.loaded) {
                changelogContent.innerHTML = '<span style="color: var(--text-secondary)">Loading…</span>';
                try {
                    const res = await fetch('/api/changelog');
                    const text = await res.text();
                    changelogContent.innerHTML = parseMarkdownChangelog(text);
                    changelogContent.dataset.loaded = '1';
                } catch(e) {
                    changelogContent.innerHTML = '<span style="color:var(--danger-text)">Failed to load changelog.</span>';
                }
            }
        };

        if (btnViewChangelog) btnViewChangelog.addEventListener('click', openChangelogModal);

        if (btnChangelogClose && changelogModal) {
            btnChangelogClose.addEventListener('click', () => changelogModal.classList.add('hidden'));
        }

        // Click backdrop to close
        if (changelogModal) {
            changelogModal.addEventListener('click', e => {
                if (e.target === changelogModal) changelogModal.classList.add('hidden');
            });
        }
    }

    // Markdown → Structured HTML parser for changelog (Keep-a-Changelog format)
    function parseMarkdownChangelog(md) {
        const escHtmlLocal = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const BADGE_MAP = {
            added:      ['cl-badge-added',      '+ Added'],
            fixed:      ['cl-badge-fixed',      '✕ Fixed'],
            changed:    ['cl-badge-changed',    '~ Changed'],
            deprecated: ['cl-badge-deprecated', '⚠ Deprecated'],
            removed:    ['cl-badge-removed',    '− Removed'],
            security:   ['cl-badge-security',   '⚑ Security'],
        };

        // Split into top-level release blocks (## [version] - date)
        const lines = md.split('\n');
        const releases = [];
        let currentRelease = null;
        let currentGroup = null;

        for (const rawLine of lines) {
            const line = rawLine.trimEnd();

            // Skip preamble lines before any release
            const releaseMatch = line.match(/^## \[(.+?)\]\s*-\s*(.+)$/);
            if (releaseMatch) {
                if (currentRelease) releases.push(currentRelease);
                currentRelease = { version: releaseMatch[1], date: releaseMatch[2].trim(), groups: [] };
                currentGroup = null;
                continue;
            }
            if (!currentRelease) continue;

            const groupMatch = line.match(/^### (.+)$/);
            if (groupMatch) {
                currentGroup = { name: groupMatch[1].trim().toLowerCase(), items: [] };
                currentRelease.groups.push(currentGroup);
                continue;
            }

            const itemMatch = line.match(/^- (.+)$/);
            if (itemMatch && currentGroup) {
                // Bold label: **Label**: rest
                const item = itemMatch[1].replace(/\*\*(.+?)\*\*:\s*(.+)/, '<strong>$1:</strong> $2');
                currentGroup.items.push(item);
            }
        }
        if (currentRelease) releases.push(currentRelease);

        // Build HTML
        return releases.map(rel => {
            const groupsHtml = rel.groups.map(g => {
                const [badgeClass, badgeLabel] = BADGE_MAP[g.name] || ['cl-badge-changed', g.name];
                const itemsHtml = g.items.map(i => `<li class="cl-item">${i}</li>`).join('');
                return `
                <div class="cl-group">
                    <div class="cl-group-header">
                        <span class="cl-badge ${badgeClass}">${badgeLabel}</span>
                    </div>
                    <ul class="cl-items">${itemsHtml}</ul>
                </div>`;
            }).join('');

            return `
            <div class="cl-release">
                <div class="cl-release-meta">
                    <div class="cl-version">v${escHtmlLocal(rel.version)}</div>
                    <div class="cl-date">${escHtmlLocal(rel.date)}</div>
                </div>
                <div class="cl-release-body">${groupsHtml}</div>
            </div>`;
        }).join('');
    }

    // Developer Sandbox Functions
    let devLogSource = null;
    
    window.openDeveloperModal = function() {
        document.getElementById('developer-modal').classList.remove('hidden');
        const term = document.getElementById('dev-terminal');
        term.innerHTML = '[System] Connecting to log stream...\n';
        
        if (devLogSource) devLogSource.close();
        devLogSource = new EventSource('/api/dev/logs');
        
        devLogSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const span = document.createElement('span');
            span.style.color = data.type === 'error' ? '#ff5555' : data.type === 'warn' ? '#fbbf24' : '#00ff66';
            span.textContent = `[${data.timestamp}] ${data.message}\n`;
            term.appendChild(span);
            
            // Smart scroll: only auto-scroll if user is within 60px of the bottom
            const isAtBottom = term.scrollHeight - term.scrollTop - term.clientHeight < 60;
            if (isAtBottom) {
                term.scrollTop = term.scrollHeight;
                // Hide indicator if we just auto-scrolled
                const ind = document.getElementById('dev-scroll-indicator');
                if (ind) ind.classList.remove('visible');
            } else {
                // Show "new logs" indicator
                const ind = document.getElementById('dev-scroll-indicator');
                if (ind) ind.classList.add('visible');
            }
        };
        
        devLogSource.onerror = () => {
            const span = document.createElement('span');
            span.style.color = '#ff5555';
            span.textContent = `[System] Lost connection to log stream. Retrying...\n`;
            term.appendChild(span);
        };

        // Hide indicator when user scrolls to bottom manually
        term.addEventListener('scroll', () => {
            const isAtBottom = term.scrollHeight - term.scrollTop - term.clientHeight < 60;
            const ind = document.getElementById('dev-scroll-indicator');
            if (ind) ind.classList.toggle('visible', !isAtBottom && term.childElementCount > 2);
        });
    };
    
    window.closeDeveloperModal = function() {
        document.getElementById('developer-modal').classList.add('hidden');
        if (devLogSource) {
            devLogSource.close();
            devLogSource = null;
        }
    };
    
    window.clearDevTerminal = function() {
        const term = document.getElementById('dev-terminal');
        term.innerHTML = '[System] Terminal cleared.\n';
        const ind = document.getElementById('dev-scroll-indicator');
        if (ind) ind.classList.remove('visible');
    };

    window.devScrollToBottom = function() {
        const term = document.getElementById('dev-terminal');
        term.scrollTop = term.scrollHeight;
        const ind = document.getElementById('dev-scroll-indicator');
        if (ind) ind.classList.remove('visible');
    };
    
    window.triggerTestNotification = function() {
        showToast('This is a test toast notification', 'FromBottom', 'green');
    };

    // --- Cover Art Modal Functions ---
    window.openEditCoverModal = function() {
        modalCoverAction = null;
        document.getElementById('edit-cover-modal').classList.remove('hidden');
        document.getElementById('modal-cover-preview').src = document.getElementById('settings-cover').src;
        
        // Show/hide buttons based on current state
        document.getElementById('modal-btn-remove-cover').style.display = currentEditingSong && currentEditingSong.hasAnyCover && !songCoverRemoved ? 'flex' : 'none';
        document.getElementById('modal-btn-revert-itunes').style.display = currentEditingSong && currentEditingSong.coverSource === 'itunes' && !songRevertItunes ? 'flex' : 'none';
    };

    window.handleModalCoverUpload = function(input) {
        if (input.files && input.files[0]) {
            modalCoverAction = 'upload';
            document.getElementById('modal-cover-preview').src = URL.createObjectURL(input.files[0]);
            document.getElementById('modal-btn-remove-cover').style.display = 'flex';
        }
    };

    window.handleModalCoverRemove = function() {
        modalCoverAction = 'remove';
        document.getElementById('modal-cover-preview').src = '/api/cover/default';
        document.getElementById('settings-cover-upload').value = ''; // clear any selected file
        document.getElementById('modal-btn-remove-cover').style.display = 'none';
        document.getElementById('modal-btn-revert-itunes').style.display = 'none';
    };

    window.handleModalCoverRevert = function() {
        modalCoverAction = 'revert';
        // Show what the cover will fall back to (embedded ID3 or default)
        const fallbackSrc = currentEditingSong && currentEditingSong.hasID3Cover
            ? `/api/cover/${currentEditingSong.id}?source=id3&t=${Date.now()}`
            : '/api/cover/default';
        document.getElementById('modal-cover-preview').src = fallbackSrc;
        document.getElementById('settings-cover-upload').value = '';
        // Keep the Remove Cover button visible — reverting iTunes != removing the cover
        // Only hide the Revert iTunes button itself since it's now staged
        document.getElementById('modal-btn-revert-itunes').style.display = 'none';
    };

    window.closeEditCoverModal = function(saveChanges) {
        document.getElementById('edit-cover-modal').classList.add('hidden');
        
        if (saveChanges && modalCoverAction) {
            // Apply modal state to main settings view
            if (modalCoverAction === 'upload') {
                songCoverRemoved = false;
                songRevertItunes = false;
                const fileInput = document.getElementById('settings-cover-upload');
                if(fileInput.files.length > 0) {
                    document.getElementById('settings-cover').src = URL.createObjectURL(fileInput.files[0]);
                }
            } else if (modalCoverAction === 'remove') {
                songCoverRemoved = true;
                songRevertItunes = false;
                document.getElementById('settings-cover').src = '/api/cover/default';
            } else if (modalCoverAction === 'revert') {
                songRevertItunes = true;
                songCoverRemoved = false;
                // Show the real fallback (ID3 embedded or default) not just the placeholder
                const fallbackSrc = currentEditingSong && currentEditingSong.hasID3Cover
                    ? `/api/cover/${currentEditingSong.id}?source=id3&t=${Date.now()}`
                    : '/api/cover/default';
                document.getElementById('settings-cover').src = fallbackSrc;
            }
            
            // Re-evaluate what buttons would show on main page if we weren't in a modal
            // (Since main page delete buttons are hidden, we just leave them hidden)
        } else {
            // Cancel - reset file input
            if (modalCoverAction === 'upload') {
                document.getElementById('settings-cover-upload').value = '';
            }
        }
    };

    initAppSettings();
    init();
    drawVisualizer(); // Start the loop immediately to fix Chrome canvas glitch
})();

