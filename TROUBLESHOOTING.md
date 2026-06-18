# 🆘 故障排除和常见问题

## ❌ 安装阶段问题

### 问题 1: "npm: 找不到命令" 或 "npm 不是内部或外部命令"

**症状**：
- 运行 `npm install` 时出现错误
- 提示 npm 或 node 未找到

**原因**：
- Node.js 未正确安装
- Node.js 不在系统 PATH 中
- 需要重启电脑

**解决方案**：

1. **检查 Node.js 是否安装**：
   ```bash
   node -v
   npm -v
   ```
   
   如果命令不存在，说明 Node.js 未安装。

2. **重新安装 Node.js**：
   - 访问 https://nodejs.org/
   - 下载 LTS (长期支持) 版本
   - 完全卸载旧版本（重要！）
   - 安装新版本
   - **重启电脑**

3. **检查 PATH（高级用户）**：
   
   **Windows**：
   - 右键"此电脑" → 属性 → 高级系统设置
   - 环境变量 → Path 中应包含 Node.js 安装目录
   
   **macOS/Linux**：
   ```bash
   echo $PATH
   # 应该包含 /usr/local/bin 或类似目录
   ```

4. **使用完整路径重新安装**：
   ```bash
   C:\Program Files\nodejs\npm install  # Windows
   /usr/local/bin/npm install           # macOS
   ```

---

### 问题 2: "npm ERR! code EACCES" (权限错误)

**症状**：
- 安装时出现权限相关错误
- 提示 "Permission denied"

**原因**：
- npm 权限设置不正确
- 在 macOS/Linux 上使用了 `sudo`

**解决方案**：

**不要使用 `sudo`！** 这是错误的做法。

改为：
```bash
# macOS/Linux 正确做法
npm install

# 如果还是有问题，修复 npm 权限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install
```

**Windows**：
- 以管理员身份打开命令提示符
- 然后运行 `npm install`

---

### 问题 3: "npm ERR! 404 Not Found"

**症状**：
- 安装时找不到某个包
- 提示 404 错误

**原因**：
- npm 源有问题
- 网络连接问题

**解决方案**：

```bash
# 清除缓存
npm cache clean --force

# 尝试使用国内镜像（中国用户）
npm config set registry https://registry.npmmirror.com

# 或还原官方源
npm config set registry https://registry.npmjs.org/

# 重新安装
npm install
```

---

### 问题 4: "npm ERR! Cannot find module"

**症状**：
- 安装似乎成功，但运行时找不到模块

**原因**：
- 安装不完整
- 某些依赖缺失

**解决方案**：

```bash
# 完全清除并重新安装
rm -rf node_modules package-lock.json    # macOS/Linux
rmdir /s /q node_modules package-lock.json # Windows

npm cache clean --force
npm install
```

---

## ❌ 启动阶段问题

### 问题 5: "npm start" 卡住或很慢

**症状**：
- 运行 `npm start` 后长时间无反应
- 看起来像死机了

**原因**：
- 首次启动确实较慢（正常）
- 某个依赖加载缓慢
- 端口已被占用

**解决方案**：

1. **等待足够的时间**（2-3 分钟是正常的）

2. **检查端口是否被占用**：
   ```bash
   # macOS/Linux
   lsof -i :3000
   
   # Windows
   netstat -ano | findstr 3000
   ```

3. **如果确实卡住，强制停止**：
   ```bash
   Ctrl+C   # 在终端按这个组合键
   ```

4. **清除缓存并重试**：
   ```bash
   npm cache clean --force
   npm start
   ```

5. **如果 3000 端口被占用，改用其他端口**：
   ```bash
   PORT=4000 npm start   # macOS/Linux
   set PORT=4000&&npm start  # Windows
   ```

---

### 问题 6: "Cannot find module 'electron'"

**症状**：
- 启动时说找不到 electron
- Electron 无法启动

**原因**：
- Electron 未安装
- 安装过程被中断

**解决方案**：

```bash
# 单独安装 Electron
npm install electron --save-dev

# 或完整重新安装
npm install
npm start
```

---

### 问题 7: 应用启动后立即闪退

**症状**：
- 应用出现一瞬间又消失
- 看不到宠物窗口

**原因**：
- HTML 文件损坏
- JavaScript 错误
- 依赖缺失

**解决方案**：

1. **检查控制台错误信息**：
   ```bash
   npm start 2>&1 | tee output.log
   # 查看输出中的错误信息
   ```

2. **检查 index.html 是否存在且有效**：
   ```bash
   ls -la index.html          # macOS/Linux
   dir index.html             # Windows
   ```

3. **验证 HTML 文件内容**（确保有宠物 canvas）：
   ```bash
   grep -n "canvas" index.html  # 应该找到 <canvas id="pc">
   ```

4. **完全重置**：
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   npm start
   ```

---

### 问题 8: "React app is not loading"

**症状**：
- 白屏
- 看不到任何内容

**原因**：
- React 开发服务器未启动
- React 编译失败

**解决方案**：

1. **检查 React 服务器是否启动**：
   查看终端输出，应该看到：
   ```
   webpack compiled successfully
   Compiled successfully!
   ```

2. **检查 localhost:3000 是否可访问**：
   在浏览器中打开：http://localhost:3000

3. **查看浏览器控制台错误**：
   F12 或 Ctrl+Shift+I 打开开发者工具
   查看 Console 标签中的错误

4. **重新构建 React**：
   ```bash
   npm run react-build
   npm start
   ```

---

## ❌ 运行阶段问题

### 问题 9: 宠物不显示或显示不正常

**症状**：
- 窗口是黑色或白色
- 宠物图案不显示
- Canvas 没有渲染

**原因**：
- Canvas 上下文获取失败
- 像素绘制逻辑错误
- GPU 加速问题

**解决方案**：

1. **强制禁用 GPU 加速**：
   
   编辑 `main.js`，在 `createPetWindow()` 中添加：
   ```javascript
   mainWindow = new BrowserWindow({
     webPreferences: {
       v8CacheCodeGeneration: false,
       webSecurity: false
     }
   });
   ```

2. **更新显卡驱动**：
   - Windows: 更新 NVIDIA/AMD 驱动
   - macOS: 运行系统更新

3. **在浏览器中测试**：
   打开 http://localhost:3000 在浏览器中查看是否正常显示

4. **重启 Electron**：
   ```bash
   npm start
   ```

---

### 问题 10: 宠物无法拖拽或点击无反应

**症状**：
- 点击按钮没反应
- 无法拖动宠物窗口
- 互动功能不工作

**原因**：
- JavaScript 事件监听器未绑定
- 元素被其他元素遮挡
- 事件委派问题

**解决方案**：

1. **检查浏览器控制台是否有 JavaScript 错误**：
   F12 → Console 标签

2. **检查元素是否存在**：
   F12 → Elements 标签，搜索 `pet-wrap`

3. **重启应用**：
   Ctrl+C 停止，然后 `npm start` 重新启动

4. **清除浏览器缓存**：
   F12 → Application → Clear site data

---

### 问题 11: 数据未保存或丢失

**症状**：
- 关闭后重新打开，宠物数据消失
- 待办清单没有保存

**原因**：
- LocalStorage 被禁用或清除
- 浏览器隐私模式

**解决方案**：

1. **检查 localStorage 是否可用**：
   在开发者工具 Console 中输入：
   ```javascript
   localStorage.setItem('test', 'hello');
   console.log(localStorage.getItem('test'));
   ```

2. **清除浏览器缓存后重试**：
   F12 → Application → Clear site data

3. **检查浏览器设置**：
   确保允许 localhost 使用 localStorage

4. **手动备份数据**：
   ```javascript
   // 在控制台中运行
   console.log(localStorage.getItem('dpet_electron'));
   // 复制输出内容保存
   ```

---

### 问题 12: 控制面板无法打开或显示不正确

**症状**：
- 点击⚙️按钮无反应
- 控制面板显示错位或不完整

**原因**：
- IPC 通信失败
- 窗口创建失败
- CSS 样式问题

**解决方案**：

1. **检查窗口大小**：
   如果控制面板太大，修改 `main.js`：
   ```javascript
   uiWindow = new BrowserWindow({
     width: 400,    // 改这个
     height: 800,   // 改这个
   });
   ```

2. **重启应用**：
   Ctrl+C 然后 `npm start`

3. **清除窗口位置记忆**：
   ```javascript
   // 在 main.js 的 createUIWindow 前添加
   try { 
     require('electron-store').delete('petWindowPosition');
   } catch(e) {}
   ```

---

## ❌ 构建和打包问题

### 问题 13: "npm run electron-build" 失败

**症状**：
- 构建命令返回错误
- 无法生成应用包

**原因**：
- 依赖版本冲突
- 缺少必要的构建工具
- 网络中断

**解决方案**：

1. **查看详细错误信息**：
   ```bash
   npm run electron-build -- -c
   ```
   `-c` 参数显示详细日志

2. **清除构建缓存**：
   ```bash
   rm -rf dist build out       # macOS/Linux
   rmdir /s /q dist build out  # Windows
   ```

3. **重新安装依赖**：
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   npm run electron-build
   ```

4. **检查磁盘空间**：
   构建需要至少 1GB 空闲空间

---

### 问题 14: 构建很慢或卡住

**症状**：
- 构建启动后很久没反应
- 看起来像死机

**原因**：
- 网络缓慢（首次下载依赖）
- 磁盘 I/O 缓慢
- 内存不足

**解决方案**：

1. **等待足够的时间**（可能需要 10-20 分钟）

2. **检查网络连接**：
   ```bash
   ping registry.npmjs.org
   ```

3. **关闭其他程序释放内存**：
   关闭浏览器、IDE 等占用内存的应用

4. **使用国内镜像**（中国用户）：
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install
   ```

---

### 问题 15: "Icon not found" 错误

**症状**：
- 构建失败，提示找不到图标
- 无法创建应用包

**原因**：
- assets/ 文件夹不存在
- 图标文件缺失

**解决方案**：

1. **创建 assets 文件夹**：
   ```bash
   mkdir assets  # macOS/Linux
   md assets     # Windows
   ```

2. **添加占位符图标**（暂时）：
   - 创建一个 256×256 的 PNG 图片
   - 保存为 `assets/icon.png`
   - 名字必须正确

3. **重试构建**：
   ```bash
   npm run electron-build
   ```

4. **（可选）创建专业图标**：
   - 使用在线工具转换 PNG 到 ICO/ICNS
   - 或使用设计软件创建

---

## ❌ macOS 特定问题

### 问题 16: "应用已损坏，无法打开"

**症状**：
- 双击 .dmg 后说应用已损坏
- macOS 拒绝运行应用

**原因**：
- 应用未签名
- Gatekeeper 保护触发

**解决方案**：

```bash
# 允许应用运行
xattr -d com.apple.quarantine /Applications/桌面宠物.app

# 或在安全性和隐私设置中允许
# 系统偏好设置 → 安全性与隐私 → 允许应用
```

---

### 问题 17: macOS 无法查找应用

**症状**：
- 从 DMG 安装后找不到应用
- 应用没有出现在应用程序文件夹

**原因**：
- 未正确从 DMG 复制应用
- DMG 挂载失败

**解决方案**：

1. **正确安装步骤**：
   - 打开 DMG 文件
   - 将应用图标拖拽到应用程序文件夹
   - 等待复制完成
   - 弹出 DMG

2. **手动安装**：
   - 打开终端
   ```bash
   cp -r /Volumes/桌面宠物/桌面宠物.app /Applications/
   ```

3. **从磁盘映像运行**：
   ```bash
   open /Volumes/桌面宠物/桌面宠物.app
   ```

---

## ❌ Windows 特定问题

### 问题 18: "无法识别的发布者"警告

**症状**：
- 安装时显示 SmartScreen 或安全警告

**原因**：
- 应用未代码签名（正常）
- Windows 安全功能

**解决方案**：

- 点击 "更多信息" 然后 "仍然运行"
- 这是安全的（自己构建的应用）
- 或购买代码签名证书进行正式签名

---

### 问题 19: 无法卸载应用

**症状**：
- 卸载程序无法打开
- 卸载失败

**原因**：
- 应用运行中
- 注册表损坏

**解决方案**：

1. **关闭所有实例**：
   ```bash
   taskkill /IM 桌面宠物.exe /F
   ```

2. **从控制面板卸载**：
   - 控制面板 → 程序和功能
   - 找到应用 → 卸载

3. **手动删除**：
   ```bash
   rmdir /s /q "C:\Users\YourName\AppData\Local\desktop-pet"
   ```

---

### 问题 20: "应用已停止工作"崩溃

**症状**：
- 运行中突然崩溃
- Windows 显示错误对话框

**原因**：
- 未捕获的异常
- 内存问题

**解决方案**：

1. **查看事件查看器日志**：
   - Windows + R → eventvwr.msc
   - 查看应用错误日志

2. **清除临时文件**：
   ```bash
   rmdir /s /q %temp%
   ```

3. **重新安装应用**：
   卸载后清除数据，重新安装

4. **在开发环境调试**：
   ```bash
   npm start 2>&1 | tee debug.log
   ```

---

## 🔍 调试技巧

### 启用详细日志

```bash
# 在终端/命令行设置环境变量
DEBUG=* npm start              # macOS/Linux
set DEBUG=*&&npm start         # Windows

# 或启用 Electron 调试
npm start -- --debug
```

### 使用开发者工具

```javascript
// 在 main.js 中启用开发者工具
mainWindow.webContents.openDevTools();

// 或按快捷键
// Windows/Linux: Ctrl+Shift+I
// macOS: Cmd+Option+I
```

### 查看日志文件

```bash
# Linux/macOS
~/Library/Logs/desktop-pet/

# Windows
%AppData%\desktop-pet\logs\

# 或在终端中重定向输出
npm start > app.log 2>&1
```

---

## 📞 获取帮助

如果以上都解决不了，请：

1. **记录完整错误信息**
2. **记下系统信息**：
   ```bash
   node -v
   npm -v
   # macOS: sw_vers
   # Windows: systeminfo
   # Linux: uname -a
   ```
3. **收集日志文件**
4. **检查网络连接**

---

## ✅ 快速检查清单

- [ ] Node.js 已安装 (`node -v`)
- [ ] npm 已安装 (`npm -v`)
- [ ] 所有文件都在同一文件夹
- [ ] 运行过 `npm install`
- [ ] 没有使用 `sudo` (macOS/Linux)
- [ ] 有至少 1GB 磁盘空间
- [ ] 网络连接正常
- [ ] 用户有读写权限

---

版本：v3.0
最后更新：2024
