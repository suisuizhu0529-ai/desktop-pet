<<<<<<< HEAD
# 🐕 桌面宠物小饼干 - Electron 版

完全跨平台的可爱桌面宠物应用，支持 macOS 和 Windows。

## 📋 项目文件结构

```
desktop-pet/
├── main.js              # Electron 主进程
├── preload.js           # 安全通信层
├── package.json         # 项目配置
├── index.html           # 应用界面
├── build-win.js         # Windows 构建脚本（可选）
├── build-mac.js         # macOS 构建脚本（可选）
├── .gitignore           # Git 忽略文件
├── README.md            # 项目说明
└── assets/              # 图标资源
    ├── icon.png         # 应用图标 (256x256)
    ├── icon.ico         # Windows 图标
    └── icon.icns        # macOS 图标
```

## 🚀 快速开始

### 环境要求
- **Node.js**: v14.0 以上
- **npm**: v6.0 以上 
- **Git**: 用于版本管理（可选）

### 1️⃣ 安装依赖

```bash
npm install
```

### 2️⃣ 开发模式运行

```bash
npm start
```

这会同时启动：
- React 开发服务器（端口 3000）
- Electron 应用窗口

### 3️⃣ 打包构建

#### Windows 平台

```bash
npm run electron-build -- --win
```

生成文件：
- `dist/桌面宠物 Setup.exe` - 安装程序
- `dist/桌面宠物 3.0.0.exe` - 便携版

#### macOS 平台

```bash
npm run electron-build -- --mac
```

生成文件：
- `dist/桌面宠物-3.0.0.dmg` - 安装盘镜像
- `dist/桌面宠物-3.0.0.zip` - 压缩包

#### 同时构建两个平台（需要在各自系统上）

```bash
npm run electron-build
```

## 🎮 使用说明

### 宠物窗口模式
- **右键点击宠物** - 打开快捷菜单
- **悬停宠物** - 显示互动按钮
- **拖拽宠物** - 移动窗口位置
- **⚙️ 按钮** - 打开控制面板

### 控制面板功能

| 标签 | 功能 |
|------|------|
| 🐾 | 与宠物互动、换装、切换角色 |
| 📋 | 管理待办事项 |
| ⏱️ | 创建和管理计时器 |
| 💰 | 工作收入统计和配置 |
| ⚙️ | 宠物设置、快捷操作、数据管理 |

### 宠物互动

#### 快乐度 ❤️
- 摸摸头 +10
- 哄哄我 +8
- 玩玩具 +12

#### 饱腹度 🍗
- 吃零食 +20

#### 活力 ⚡
- 去睡觉 +30
- 散步走走 -5（降低消耗）

### 工作配置

1. 打开控制面板 → 💰 工作
2. 点击 "⚙ 修改配置"
3. 设置以下参数：
   - **月薪**：税后月工资（元）
   - **月工作天数**：默认 22 天
   - **上班时间**：默认 09:30
   - **下班时间**：默认 18:30
4. 点击 "💾 保存"

💡 **提示**：
- 系统会自动计算每天、每小时、每分钟的收入
- 周末（周六日）自动休息不计工资
- 工作时间外显示距下班时间

## 🎨 自定义

### 修改宠物名字
设置 → 宠物设置 → 输入名字 → 保存名字

### 修改宠物形象
控制面板 → 🐾 宠物 → 选择角色
- 🐕 狗狗
- 🐰 小白兔
- 🦊 小狐狸
- 🐯 白虎

### 换装扮
控制面板 → 🐾 宠物 → 换装扮
- 日常装
- 🧢 棒球帽
- 🧥 卫衣
- 🎀 蝴蝶结
- 👑 皇冠
- 🕶️ 墨镜

## 💾 数据保存

所有数据自动保存到本地 LocalStorage：
- 宠物状态（名字、形象、属性）
- 待办清单
- 计时器设置
- 工作配置

**清除数据**：设置 → 数据管理 → 清除本地数据

## 🔧 故障排除

### 问题：应用无法启动

**解决方案**：
```bash
# 清除缓存
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 重新启动
npm start
```

### 问题：宠物显示不正常

**解决方案**：
```bash
# 完全清除缓存
npm cache clean --force
npm install
npm start
```

### 问题：macOS 显示"文件已损坏"

**解决方案**：
```bash
# 允许应用运行
xattr -d com.apple.quarantine /Applications/桌面宠物.app
```

## 🛠️ 开发指南

### 修改应用配置

编辑 `package.json` 中的 `build` 部分：

```json
{
  "build": {
    "appId": "com.yourcompany.pet",
    "productName": "你的应用名称",
    "mac": {
      "category": "public.app-category.utilities"
    },
    "win": {
      "certificateFile": "path/to/cert.pfx"
    }
  }
}
```

### 修改窗口大小

编辑 `main.js` 中的 `createPetWindow()`：

```javascript
mainWindow = new BrowserWindow({
  width: 160,    // 修改这里
  height: 200,   // 修改这里
  // ...
});
```

### 修改宠物绘制

编辑 `index.html` 中的 `THEMES` 和 `FRAMES` 对象来自定义宠物外观。

## 📦 依赖列表

### 生产依赖
- `electron-is-dev` - 开发环境检测
- `electron-store` - 本地数据存储

### 开发依赖
- `electron` - Electron 框架
- `electron-builder` - 应用打包工具
- `concurrently` - 并发执行命令
- `wait-on` - 等待服务启动

## 🔐 安全性

该应用采用以下安全措施：
- 禁用 Node 集成（`nodeIntegration: false`）
- 启用上下文隔离（`contextIsolation: true`）
- 使用 Preload 脚本进行安全通信
- 不允许远程模块（`enableRemoteModule: false`）

## 📝 许可证

MIT License - 可自由使用和修改

## 🎉 特性

✅ 完全跨平台（macOS 和 Windows）
✅ 独立宠物窗口 + 可隐藏控制面板
✅ 4 种宠物形象 + 6 种服装
✅ 实时工资计算
✅ 计时器提醒（带宠物互动）
✅ 待办事项管理
✅ 自动数据保存
✅ 系统托盘集成
✅ 像素艺术风格
✅ 丰富的互动反馈

## 🐛 反馈和建议

如发现 bug 或有改进建议，欢迎反馈！

---

**版本**: v3.0 Electron
**更新时间**: 2024
**作者**: Made with Kate
=======
# desktop-pet
A cute desktop pet application
>>>>>>> e6ae055410394ef33c85ae22a953117e7558a4d7
