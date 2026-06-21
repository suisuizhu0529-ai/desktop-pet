const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let tray;
let panelVisible = false;
let isQuitting = false;

// 检查是否是开发模式
const DEV = process.env.NODE_ENV === 'development';

app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-http-cache');

function createPetWindow() {
  const userDataPath = app.getPath('userData');
  mainWindow = new BrowserWindow({
    width: 200,
    height: 350,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      session: {
        cachePath: path.join(userDataPath, 'cache')
      }
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  const startUrl = DEV 
    ? 'http://localhost:3000?mode=pet'
    : `file://${path.join(__dirname, 'index.html')}?mode=pet`;
  
  mainWindow.loadURL(startUrl);

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  // 保存窗口位置
  mainWindow.on('move', () => {
    if (mainWindow) {
      const [x, y] = mainWindow.getPosition();
      try {
        require('electron-store').set('petWindowPosition', { x, y });
      } catch (e) {}
    }
  });

  // 右键菜单
  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault();
    const contextMenu = Menu.buildFromTemplate([
      { label: panelVisible ? '隐藏控制面板' : '显示控制面板', click: togglePanel },
      { type: 'separator' },
      { label: '置顶', type: 'checkbox', checked: mainWindow.isAlwaysOnTop(), click: toggleAlwaysOnTop },
      { type: 'separator' },
      { label: '退出', click: () => { isQuitting = true; app.quit(); } }
    ]);
    contextMenu.popup();
  });
}

function togglePanel() {
  panelVisible = !panelVisible;
  if (!mainWindow) return;
  if (panelVisible) {
    mainWindow.setMinimumSize(580, 700);
    mainWindow.setBounds({ width: 580, height: 800 }, true);
  } else {
    mainWindow.setResizable(true);
    mainWindow.setMinimumSize(180, 320);
    mainWindow.setBounds({ width: 200, height: 350 }, true);
    mainWindow.setResizable(false);
  }
  mainWindow.webContents.send('toggle-panel', panelVisible);
}

function toggleAlwaysOnTop() {
  if (mainWindow) {
    const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(!isAlwaysOnTop);
    // 更新托盘菜单的置顶状态
    if (tray) {
      const contextMenu = Menu.buildFromTemplate([
        { label: '打开小饼干', click: () => mainWindow && mainWindow.show() },
        { label: '控制面板', click: togglePanel },
        { type: 'separator' },
        { label: '置顶', type: 'checkbox', checked: !isAlwaysOnTop, click: toggleAlwaysOnTop },
        { label: '关于', click: () => createAboutWindow() },
        { type: 'separator' },
        { label: '退出', click: () => { isQuitting = true; app.quit(); } }
      ]);
      tray.setContextMenu(contextMenu);
    }
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'assets/tray-icon.png'));
  
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开小饼干', click: () => mainWindow && mainWindow.show() },
    { label: '控制面板', click: togglePanel },
    { type: 'separator' },
    { label: '置顶', type: 'checkbox', checked: mainWindow && mainWindow.isAlwaysOnTop(), click: toggleAlwaysOnTop },
    { label: '关于', click: () => createAboutWindow() },
    { type: 'separator' },
    { label: '退出', click: () => { isQuitting = true; app.quit(); } }
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('double-click', togglePanel);
}

function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    width: 400,
    height: 300,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          margin: 0; padding: 40px; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #f5f5f5;
          text-align: center;
        }
        h1 { color: #333; margin: 0 0 10px 0; }
        p { color: #666; margin: 8px 0; }
        .button { 
          margin-top: 20px; 
          padding: 10px 20px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .button:hover { background: #6d28d9; }
      </style>
    </head>
    <body>
      <h1>🐕 桌面宠物小饼干</h1>
      <p>版本 v3.0</p>
      <p style="margin-top: 20px; color: #999; font-size: 12px;">
        一个可爱的桌面宠物应用<br>
        用HTML/CSS/JS + Electron构建
      </p>
      <button class="button" onclick="window.close()">关闭</button>
    </body>
    </html>
  `;

  aboutWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  aboutWindow.show();
}

// IPC通信
ipcMain.on('toggle-panel-req', () => togglePanel());
ipcMain.on('hide-panel-req', () => {
  if (panelVisible) togglePanel();
});
ipcMain.on('toggle-always-on-top', toggleAlwaysOnTop);
ipcMain.on('quit-app', () => app.quit());

// 鼠标拖动窗口
ipcMain.on('start-drag', (event, x, y) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    const [wx, wy] = win.getPosition();
    win.setPosition(wx + x, wy + y);
  }
});

app.on('ready', () => {
  createPetWindow();
  createTray();

  // 恢复窗口位置
  try {
    const store = require('electron-store');
    const pos = store.get('petWindowPosition');
    if (pos && mainWindow) {
      mainWindow.setPosition(pos.x, pos.y);
    }
  } catch (e) {}
});

app.on('window-all-closed', () => {
  // macOS: 应用停留在dock
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createPetWindow();
  }
  if (mainWindow) {
    mainWindow.show();
  }
});

// macOS specific
if (process.platform === 'darwin') {
  app.on('before-quit', () => {
    mainWindow = null;
  });
}
