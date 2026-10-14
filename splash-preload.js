'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('splashBridge', {
    onStatus: (callback) => {
        ipcRenderer.on('splash:status', (_event, data) => {
            if (typeof callback === 'function') callback(data);
        });
    },
    onReady: (callback) => {
        ipcRenderer.on('splash:ready', (_event) => {
            if (typeof callback === 'function') callback();
        });
    },
    getVersion: () => ipcRenderer.invoke('app:version')
});
