const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let tray;
let uiWindow;

// 检查是否是开发模式
const DEV = process.env.NODE_ENV === 'development';

function createPetWindow() {
  mainWindow = new BrowserWindow({
    width: 180,
    height: 220,
    frame: false, // 无边框
    transparent: true, // 透明背景
    alwaysOnTop: true, // 始终在最前
    skipTaskbar: true, // 不在任务栏显示
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  const startUrl = DEV 
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'index.html')}?mode=pet`;
  
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
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
      { label: '显示控制面板', click: showUIWindow },
      { type: 'separator' },
      { label: '置顶', click: toggleAlwaysOnTop },
      { type: 'separator' },
      { label: '退出', click: () => app.quit() }
    ]);
    contextMenu.popup();
  });
}

function createUIWindow() {
  uiWindow = new BrowserWindow({
    width: 400,
    height: 800,
    minWidth: 350,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false
  });

  const startUrl = DEV 
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'index.html')}?mode=ui`;

  uiWindow.loadURL(startUrl);

  uiWindow.on('closed', () => {
    uiWindow = null;
  });

  uiWindow.on('hide', () => {
    if (tray) {
      tray.setTitle('');
    }
  });
}

function showUIWindow() {
  if (!uiWindow) {
    createUIWindow();
  }
  uiWindow.show();
  uiWindow.focus();
}

function toggleAlwaysOnTop() {
  if (mainWindow) {
    const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(!isAlwaysOnTop);
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'assets/tray-icon.png'));
  
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开小饼干', click: () => mainWindow && mainWindow.show() },
    { label: '控制面板', click: showUIWindow },
    { type: 'separator' },
    { label: '置顶', click: toggleAlwaysOnTop },
    { label: '关于', click: () => createAboutWindow() },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() }
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('double-click', showUIWindow);
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
ipcMain.on('show-ui', showUIWindow);
ipcMain.on('hide-ui', () => {
  if (uiWindow) uiWindow.hide();
});
ipcMain.on('toggle-always-on-top', toggleAlwaysOnTop);
ipcMain.on('quit-app', () => app.quit());

app.on('ready', () => {
  createPetWindow();
  createTray();

  // 恢复窗口位置，如果没有保存则放右上角
  try {
    const store = require('electron-store');
    const pos = store.get('petWindowPosition');
    if (pos && mainWindow && pos.x > 0 && pos.y > 0) {
      mainWindow.setPosition(pos.x, pos.y);
    } else {
      const { screen } = require('electron');
      const { width } = screen.getPrimaryDisplay().workAreaSize;
      mainWindow.setPosition(width - 200, 60);
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
    uiWindow = null;
  });
}
