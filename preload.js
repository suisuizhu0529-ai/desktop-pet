const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('petAPI', {
  togglePanel: () => ipcRenderer.send('toggle-panel-req'),
  hidePanel: () => ipcRenderer.send('hide-panel-req'),
  toggleAlwaysOnTop: () => ipcRenderer.send('toggle-always-on-top'),
  quitApp: () => ipcRenderer.send('quit-app'),
  startDrag: (x, y) => ipcRenderer.send('start-drag', x, y),
  onPanelToggle: (callback) => ipcRenderer.on('toggle-panel', (e, visible) => callback(visible))
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});
