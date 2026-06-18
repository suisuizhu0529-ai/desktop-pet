const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('petAPI', {
  showUI: () => ipcRenderer.send('show-ui'),
  hideUI: () => ipcRenderer.send('hide-ui'),
  toggleAlwaysOnTop: () => ipcRenderer.send('toggle-always-on-top'),
  quitApp: () => ipcRenderer.send('quit-app'),
  getMode: () => {
    const url = new URL(window.location);
    return url.searchParams.get('mode') || 'pet';
  }
});

// 暴露Node版本信息
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});
