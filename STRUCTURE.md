# 📁 项目文件详细说明

## 文件树结构

```
desktop-pet/
│
├── 📄 main.js                    # Electron 主进程文件
├── 📄 preload.js                 # 安全通信预加载脚本
├── 📄 index.html                 # 应用界面和逻辑
├── 📄 package.json               # 项目配置和依赖
├── 📄 package-lock.json          # 依赖版本锁定（自动生成）
│
├── 📄 README.md                  # 项目使用说明
├── 📄 STRUCTURE.md               # 本文件 - 文件结构说明
├── 📄 .gitignore                 # Git 忽略配置
│
├── 📂 scripts/                   # 构建脚本（可选）
│   ├── build-win.js
│   └── build-mac.js
│
├── 📂 public/                    # 打包后的公共资源（自动生成）
│   ├── main.js
│   ├── preload.js
│   ├── index.html
│   └── assets/
│       ├── icon.png
│       ├── icon.ico
│       └── icon.icns
│
├── 📂 build/                     # React 构建输出（自动生成）
│   └── index.html
│
├── 📂 dist/                      # 最终应用包（自动生成）
│   ├── 桌面宠物 Setup.exe        # Windows 安装程序
│   ├── 桌面宠物.exe              # Windows 便携版
│   └── 桌面宠物-3.0.0.dmg        # macOS 安装盘
│
├── 📂 node_modules/              # 依赖包（自动生成）
│
├── 🚀 start.sh                   # macOS/Linux 快速启动脚本
└── 🚀 start.bat                  # Windows 快速启动脚本
```

## 核心文件详解

### 🔧 main.js
**Electron 主进程文件**

**功能**：
- 创建和管理应用窗口
- 处理应用生命周期
- 管理系统托盘
- 处理 IPC 通信

**关键函数**：
- `createPetWindow()` - 创建宠物窗口
- `createUIWindow()` - 创建控制面板窗口
- `createTray()` - 创建系统托盘
- `showUIWindow()` - 显示/隐藏界面

**修改示例**：
```javascript
// 修改宠物窗口大小
mainWindow = new BrowserWindow({
  width: 160,   // 改这个
  height: 200,  // 改这个
});

// 修改窗口是否置顶
mainWindow.setAlwaysOnTop(true);
```

---

### 🔐 preload.js
**安全通信桥梁**

**功能**：
- 向渲染进程暴露安全 API
- 实现主进程和渲染进程的通信
- 防止恶意脚本注入

**暴露的 API**：
```javascript
window.petAPI.showUI()              // 显示 UI 窗口
window.petAPI.hideUI()              // 隐藏 UI 窗口
window.petAPI.toggleAlwaysOnTop()   // 切换置顶
window.petAPI.quitApp()             // 退出应用
window.petAPI.getMode()             // 获取运行模式
```

---

### 🎨 index.html
**应用界面和所有逻辑**

**包含内容**：
- HTML 结构（宠物窗口 + 控制面板）
- CSS 样式（两种模式：pet 和 ui）
- JavaScript 逻辑（完整应用代码）
- Canvas 像素艺术绘制

**关键部分**：
```html
<!-- 宠物窗口 -->
<div id="pet-wrap">
  <canvas id="pc"></canvas>
</div>

<!-- 控制面板 -->
<div id="panel">
  <!-- 各个功能标签页 -->
</div>
```

**两种模式**：
- `pet-mode` - 仅显示宠物窗口
- `ui-mode` - 显示完整控制面板

---

### 📦 package.json
**项目配置文件**

**重要配置**：

```json
{
  "name": "desktop-pet",           // 应用名称
  "version": "3.0.0",              // 版本号
  "main": "public/main.js",        // Electron 入口
  
  "scripts": {
    "start": "npm run electron-dev"        // 开发
    "electron-build": "npm run electron-builder"  // 构建
  },
  
  "build": {
    "appId": "com.pet.desktop",    // 应用唯一ID
    "productName": "桌面宠物",      // 应用显示名称
    
    "mac": {
      "target": ["dmg", "zip"],    // macOS 输出格式
      "icon": "assets/icon.icns"   // macOS 图标
    },
    "win": {
      "target": ["nsis", "portable"], // Windows 输出格式
      "icon": "assets/icon.ico"    // Windows 图标
    }
  }
}
```

**修改版本号**：
```json
"version": "3.0.1"  // 改这行
```

---

## 启动脚本说明

### start.sh (macOS/Linux)
```bash
chmod +x start.sh    # 首次需要给予执行权限
./start.sh           # 运行脚本
```

**功能菜单**：
1. 开发模式运行
2. 构建 Windows 版
3. 构建 macOS 版
4. 完整构建
5. 清除缓存重启

### start.bat (Windows)
```cmd
start.bat   # 直接双击或运行
```

---

## 资源文件 (assets/)

需要在项目根目录创建 `assets/` 文件夹：

```
assets/
├── icon.png          # 应用图标（256x256 PNG）
├── icon.ico          # Windows 图标（可用在线转换）
└── icon.icns         # macOS 图标（可用在线转换）
```

**获取图标方式**：

1. **在线转换工具**：
   - https://icoconvert.com/
   - https://convertio.co/png-ico/

2. **推荐格式**：
   - PNG: 256x256 像素（透明背景）
   - ICO: 256x256 像素（Windows）
   - ICNS: 1024x1024 像素（macOS）

---

## 开发工作流

### 1. 本地开发

```bash
npm start  # 启动开发服务器和 Electron
```

- 修改 `index.html` → 自动刷新
- 修改 `main.js` → 需要重启
- 实时调试和测试

### 2. 打包构建

```bash
# Windows
npm run electron-build -- --win

# macOS
npm run electron-build -- --mac

# 两个平台（需要在各自系统上运行）
npm run electron-build
```

### 3. 生成的文件

位置：`dist/` 目录

**Windows**：
- `桌面宠物 Setup.exe` - 安装程序（推荐）
- `桌面宠物.exe` - 便携版

**macOS**：
- `桌面宠物-3.0.0.dmg` - 安装盘
- `桌面宠物-3.0.0.zip` - 压缩包

---

## 常用命令

```bash
# 安装依赖
npm install

# 开发模式（带热重载）
npm start

# 仅启动 React 开发服务器
npm run react-start

# 仅启动 Electron（需要 React 已启动）
npm run electron-start

# 构建 React
npm run react-build

# 完整构建应用
npm run electron-build

# 清除缓存
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 文件修改建议

### ✅ 安全修改
- `index.html` - 界面和样式
- `main.js` - 窗口大小、图标
- `package.json` - 版本号、应用名称
- 宠物逻辑和互动

### ⚠️ 谨慎修改
- `preload.js` - 通信接口
- IPC 事件处理
- 构建配置

### ❌ 不建议修改
- Electron 版本
- 项目结构（除非了解 Electron）

---

## 常见问题

**Q: 如何自定义应用名称？**
A: 修改 `package.json` 中的 `name` 和 `productName`

**Q: 如何修改窗口大小？**
A: 修改 `main.js` 中的 `width` 和 `height`

**Q: 如何添加自定义菜单？**
A: 在 `main.js` 中修改 `contextMenu`

**Q: 应用可以一键运行吗？**
A: 可以，使用 `start.sh` (macOS) 或 `start.bat` (Windows)

---

## 项目完成清单

- [x] 核心应用代码
- [x] Electron 配置
- [x] 构建脚本
- [x] 文档说明
- [ ] 图标资源（需自行准备）
- [ ] 测试验证
- [ ] 发布到应用商店（可选）

---

更新时间：2024
版本：v3.0 Electron 版
