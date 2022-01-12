import path, { dirname } from 'path'

import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export default {
  // src 目录
  srcPath: path.resolve(__dirname, '../src'),
  // 项目根目录
  appPath: path.resolve(__dirname, '../'),
  // 入口文件
  entryPath: path.resolve(__dirname, '../src/index.tsx'),
  // 输出目录
  assetsRoot: path.resolve(__dirname, '../dist'),
  // 静态资源的 基础路径
  assetsPublicPath: '/',
  // 静态资源的目录
  assetsSubDirectory: 'static',
  // dev server
  host: 'localhost',
  port: 3300,
  autoOpenBrowser: true,
  allowedHosts: [],
  poll: false,
  errorOverlay: true,
  proxyTable: {}
}
