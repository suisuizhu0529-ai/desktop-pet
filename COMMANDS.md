# 🔍 常用命令速查表

## 📦 依赖管理

```bash
# 安装所有依赖
npm install

# 安装特定包
npm install package-name

# 更新所有依赖
npm update

# 清除 npm 缓存
npm cache clean --force

# 查看已安装包
npm list
```

---

## 🚀 应用启动

```bash
# 完整开发（React + Electron）
npm start

# 仅启动 React 开发服务器
npm run react-start

# 仅启动 Electron（需要 React 已启动）
npm run electron-start

# 使用快速启动脚本
./start.sh          # macOS/Linux
start.bat           # Windows
```

---

## 🔨 构建和打包

```bash
# 构建 React（生成 build/ 文件夹）
npm run react-build

# 完整打包（自动构建 React 并打包 Electron）
npm run electron-build

# 仅构建 Windows 版本
npm run electron-build -- --win

# 仅构建 macOS 版本
npm run electron-build -- --mac

# 仅构建 Linux 版本
npm run electron-build -- --linux

# 构建多个平台
npm run electron-build -- --win --mac

# 构建发布版本
npm run electron-build -- -p always
```

---

## 🧹 清理和重置

```bash
# 删除 node_modules（谨慎！）
rm -rf node_modules              # macOS/Linux
rmdir /s /q node_modules         # Windows

# 删除构建输出
rm -rf build dist out            # macOS/Linux
rmdir /s /q build dist out       # Windows

# 完全重置
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 清除应用数据
# 注：这会删除宠物的所有数据！
# 通过应用界面操作更安全
```

---

## 🔍 调试和测试

```bash
# 在 Electron 中打开开发者工具
# 快捷键：Ctrl+Shift+I (Windows) / Cmd+Option+I (macOS)

# 查看应用日志
# macOS/Linux
~/Library/Logs/desktop-pet/

# Windows
%AppData%\desktop-pet\logs\

# 启用详细日志
NODE_ENV=development npm start   # macOS/Linux
set NODE_ENV=development&&npm start  # Windows
```

---

## 📝 文件操作

```bash
# 列出文件夹内容
ls -la              # macOS/Linux
dir                 # Windows

# 进入文件夹
cd path/to/folder

# 查看文件内容
cat filename        # macOS/Linux
type filename       # Windows

# 编辑文件
nano filename       # macOS/Linux 简单编辑
code filename       # 用 VS Code 打开
```

---

## 🔐 权限和执行

```bash
# 给脚本执行权限（macOS/Linux）
chmod +x start.sh

# 执行脚本
./start.sh          # macOS/Linux
bash start.sh       # macOS/Linux
start.bat           # Windows

# 以管理员身份运行（Windows）
右键 → 以管理员身份运行
```

---

## 📊 项目信息查看

```bash
# 查看 Node.js 版本
node -v
node --version

# 查看 npm 版本
npm -v
npm --version

# 查看项目配置
cat package.json    # macOS/Linux
type package.json   # Windows

# 查看已安装的包和版本
npm list
npm list --depth=0  # 仅显示顶级包

# 检查包更新
npm outdated
```

---

## 💾 备份和版本控制

```bash
# 初始化 Git
git init

# 添加所有文件到 Git
git add .

# 提交更改
git commit -m "Initial commit"

# 查看 Git 状态
git status

# 查看提交历史
git log

# 回到上一个版本
git checkout HEAD~1
```

---

## 🐛 故障排除命令

```bash
# 诊断：检查 Node.js 和 npm
node -v && npm -v

# 诊断：检查依赖完整性
npm audit
npm audit fix

# 诊断：验证文件结构
ls -la              # macOS/Linux

# 尝试修复常见问题
npm ci               # 使用 package-lock.json 安装
npm install --legacy-peer-deps  # 处理版本冲突

# 查看详细错误
npm start -- --verbose
npm run electron-build -- -c
```

---

## 🎯 项目配置修改

### 修改应用名称

**package.json**：
```json
{
  "name": "my-app",
  "productName": "我的应用"
}
```

### 修改应用版本

**package.json**：
```json
{
  "version": "3.0.1"
}
```

### 修改窗口大小

**main.js**：
```javascript
mainWindow = new BrowserWindow({
  width: 200,    // 改这个
  height: 250,   // 改这个
});
```

### 修改应用图标

**package.json build 配置**：
```json
{
  "build": {
    "win": {
      "icon": "./assets/icon.ico"
    },
    "mac": {
      "icon": "./assets/icon.icns"
    }
  }
}
```

### 修改默认工作时间

**index.html**（搜索这一行）：
```javascript
st.workCfg: {
  startTime: '09:30',  // 改这个
  endTime: '18:30'     // 改这个
}
```

---

## 📋 任务清单

### 首次设置
- [ ] 安装 Node.js
- [ ] 文件夹中放入所有源代码文件
- [ ] 运行 `npm install`
- [ ] 运行 `npm start` 测试

### 开发阶段
- [ ] 修改和测试应用功能
- [ ] 使用 `npm start` 开发
- [ ] 检查错误日志
- [ ] 提交到 Git（可选）

### 发布前
- [ ] 更新版本号
- [ ] 准备应用图标
- [ ] 测试所有功能
- [ ] 运行 `npm run electron-build`

### 发布后
- [ ] 测试安装程序
- [ ] 在不同系统测试
- [ ] 获取用户反馈
- [ ] 修复 bug 并更新

---

## 🌐 macOS 特定命令

```bash
# 允许未签名的应用运行
xattr -d com.apple.quarantine /Applications/桌面宠物.app

# 查看应用日志
log stream --predicate 'process == "desktop-pet"'

# 强制关闭应用
killall "桌面宠物"

# 打开应用
open /Applications/桌面宠物.app

# 打开包内容
open -R /Applications/桌面宠物.app
```

---

## 🪟 Windows 特定命令

```cmd
REM 强制关闭应用
taskkill /IM desktop-pet.exe /F

REM 查看进程
tasklist | find "desktop-pet"

REM 设置环境变量
set NODE_ENV=development

REM 查看系统信息
systeminfo

REM 检查端口占用（开发时）
netstat -ano | findstr 3000
```

---

## 📱 Linux 特定命令

```bash
# 打开应用
./dist/desktop-pet-*.AppImage

# 给 AppImage 执行权限
chmod +x dist/desktop-pet-*.AppImage

# 查看应用进程
ps aux | grep desktop-pet

# 强制关闭应用
pkill -f desktop-pet

# 查看系统信息
lsb_release -a
uname -a
```

---

## 🚀 一行命令快速操作

```bash
# 完整重置
npm cache clean --force && rm -rf node_modules && npm install && npm start

# 构建所有平台（需要适当的环境）
npm run react-build && npm run electron-build

# 构建并自动打开输出文件夹
npm run electron-build && open dist  # macOS
npm run electron-build && start dist  # Windows

# 快速测试
npm install && npm start
```

---

## 💡 快速参考

| 需求 | 命令 |
|------|------|
| 启动开发 | `npm start` |
| 安装依赖 | `npm install` |
| 更新依赖 | `npm update` |
| 打包应用 | `npm run electron-build` |
| 仅打包 Windows | `npm run electron-build -- --win` |
| 仅打包 macOS | `npm run electron-build -- --mac` |
| 清除缓存 | `npm cache clean --force` |
| 查看日志 | 查看终端输出 |
| 停止运行 | `Ctrl+C` |
| 重置项目 | 见"清理和重置"部分 |

---

## 🔧 环境变量

```bash
# 开发模式
export NODE_ENV=development      # macOS/Linux
set NODE_ENV=development         # Windows

# 生产模式
export NODE_ENV=production       # macOS/Linux
set NODE_ENV=production          # Windows

# 调试模式
export DEBUG=*                   # macOS/Linux
set DEBUG=*                      # Windows
```

---

## 📚 更多帮助

- 查看 `README.md` - 功能说明
- 查看 `QUICKSTART.md` - 新手指南
- 查看 `STRUCTURE.md` - 文件结构
- 官方文档：https://www.electronjs.org/docs
- Node.js 文档：https://nodejs.org/docs/

---

版本：v3.0
最后更新：2024
