#!/bin/bash

# 桌面宠物 - 快速开始脚本
# 支持 macOS 和 Linux

set -e

echo "🐕 桌面宠物 Electron 版 - 快速开始"
echo "================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 检测不到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"
echo ""

# 检查是否需要安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
    echo ""
fi

# 显示命令选项
echo "选择操作:"
echo "1) 开发模式运行"
echo "2) 构建 Windows 版"
echo "3) 构建 macOS 版"
echo "4) 完整构建（需要对应系统）"
echo "5) 清除缓存并重启"
echo ""

read -p "请输入选项 (1-5): " choice

case $choice in
    1)
        echo "🚀 启动开发模式..."
        npm start
        ;;
    2)
        echo "🔨 构建 Windows 版本中..."
        npm run electron-build -- --win
        echo "✅ 构建完成！文件在 dist/ 目录"
        ;;
    3)
        echo "🔨 构建 macOS 版本中..."
        npm run electron-build -- --mac
        echo "✅ 构建完成！文件在 dist/ 目录"
        ;;
    4)
        echo "🔨 完整构建中..."
        npm run electron-build
        echo "✅ 构建完成！文件在 dist/ 目录"
        ;;
    5)
        echo "🧹 清除缓存..."
        rm -rf node_modules package-lock.json
        npm cache clean --force
        echo "📦 重新安装依赖..."
        npm install
        echo "🚀 启动开发模式..."
        npm start
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac
