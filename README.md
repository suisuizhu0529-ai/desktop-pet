# 🐕 桌面宠物小饼干 / desktop-pet

A small, cute cross-platform desktop pet application (Electron) — completely optional Chinese/English documentation.

一个可爱的跨平台桌面宠物应用（Electron 版），支持 macOS 和 Windows。

---

## Features / 特性

- Cross-platform: macOS and Windows
- Independent pet window + optional control panel
- Multiple pet characters and outfits
- Real-time income calculation, timers, todo list
- Auto-save to local storage
- System tray integration

- 跨平台（macOS & Windows）
- 独立宠物窗口 + 可隐藏控制面板
- 多种宠物形象与换装
- 实时工资计算、计时器、待办事项
- 自动保存（LocalStorage）
- 系统托盘集成

---

## Quick Start / 快速开始

Requirements / 环境要求

- Node.js >= 14
- npm >= 6

1) Install dependencies

```bash
npm install
```

2) Run in development mode

```bash
npm start
```

This will start the renderer dev server (if used) and open the Electron window.

3) Build / 打包

- Windows

```bash
npm run electron-build -- --win
```

- macOS

```bash
npm run electron-build -- --mac
```

Or build both (run on target platforms):

```bash
npm run electron-build
```

Generated artifacts typically under `dist/`.

---

## Usage / 使用说明

- Right-click the pet to open the quick menu
- Hover to show interaction buttons
- Drag to move the pet window
- Use the settings (⚙️) button to open the control panel

Control panel pages include: pet interactions, todo list, timers, work/income settings, general settings and data management.

Interaction examples:
- Happiness, Hunger, Energy stats (can be changed by actions such as petting, feeding, resting)

---

## Configuration / 开发与配置

- Application config: edit `package.json` → `build` section for `productName`, `appId`, mac/win specific options.

Example:

```json
{
  "build": {
    "appId": "com.yourcompany.pet",
    "productName": "Desktop Pet",
    "mac": { "category": "public.app-category.utilities" },
    "win": { "certificateFile": "path/to/cert.pfx" }
  }
}
```

- Window size: edit `main.js` → `createPetWindow()` and adjust `width` / `height`.

- Pet appearance: edit `index.html` (or the renderer code) where THEMES/FRAMES are defined.

---

## Data Persistence / 数据保存

All user data is saved locally (LocalStorage / electron-store depending on implementation):
- Pet state (name, avatar, stats)
- Todo items
- Timers
- Work/income settings

To clear local data: Settings → Data management → Clear local data.

---

## Troubleshooting / 常见问题

Problem: App won't start

```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

Problem: Pet rendering incorrectly

```bash
npm cache clean --force
npm install
npm start
```

Problem: macOS "App is damaged" gatekeeper message

```bash
# Allow the app to run
xattr -d com.apple.quarantine /Applications/Desktop\ Pet.app
```

---

## Development Dependencies / 依赖

Common dependencies used in this project:

- electron (dev)
- electron-builder (dev)
- concurrently
- wait-on
- electron-store
- electron-is-dev

Check `package.json` for the exact dependency list.

---

## Contributing

Contributions are welcome — please open an issue or a pull request with changes. Provide screenshots and steps to reproduce for UI/behavior changes.

---

## License / 许可证

MIT License

---

Version: v3.0 (Electron)
Updated: 2026-06-22
Author: Made with Kate / suisuizhu0529-ai
