'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // File system
    openFolder:      ()   => ipcRenderer.invoke('dialog:open-folder'),
    showItemInFolder: (p)  => ipcRenderer.send('shell:show-item', p),
    openExternal:    (url) => ipcRenderer.send('shell:open-external', url),

    // Window controls
    minimize:     () => ipcRenderer.send('window:minimize'),
    maximize:     () => ipcRenderer.send('window:maximize'),
    hideWindow:   () => ipcRenderer.send('window:hide'),
    quit:         () => ipcRenderer.send('window:quit'),
    isMaximized:  () => ipcRenderer.invoke('window:is-maximized'),

    // Native OS notification
    notify: (title, body) => ipcRenderer.send('notify', { title, body }),

    // Server control
    stopServer:      () => ipcRenderer.invoke('server:stop'),
    startServer:     () => ipcRenderer.invoke('server:start'),
    restartServer:   () => ipcRenderer.invoke('server:restart'),
    getServerStatus: () => ipcRenderer.invoke('server:status'),

    // App info
    getServerUrl:    () => ipcRenderer.invoke('app:server-url'),
    getSongsDir:     () => ipcRenderer.invoke('app:songs-dir'),
    setSongsDir:     (dir) => ipcRenderer.invoke('app:set-songs-dir', dir),
    openSongsFolder: () => ipcRenderer.invoke('app:open-songs-folder'),
    getVersion:      () => ipcRenderer.invoke('app:version'),

    // Software Updater
    checkForUpdates:    () => ipcRenderer.invoke('updater:check'),
    downloadUpdate:     (opts) => ipcRenderer.invoke('updater:download', opts),
    installUpdate:      () => ipcRenderer.invoke('updater:install'),
    onUpdateProgress:   (cb) => ipcRenderer.on('updater:progress', (_e, data) => cb(data)),
    onUpdateDownloaded: (cb) => ipcRenderer.on('updater:downloaded', (_e, data) => cb(data)),

    // Env flags (synchronous, safe to read before async)
    platform:   process.platform,
    isElectron: true,

    // OS startup / login item
    getAutoLaunch:  () => ipcRenderer.invoke('app:get-login-item'),
    setAutoLaunch:  (enabled) => ipcRenderer.invoke('app:set-login-item', { openAtLogin: enabled }),
});
