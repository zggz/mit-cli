import path from 'path';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export default {
  // 项目根目录
  contextPath: path.resolve(__dirname, '../'),
  // 入口文件
  entryPath: path.resolve(__dirname, '../src/index.js'),
  // 输出目录
  assetsRoot: path.resolve(__dirname, '../dist'),
  // 静态资源的 基础路径
  assetsPublicPath: '/',
  // dev server
  host: 'localhost',
  port: 3000,
  autoOpenBrowser: true,
  allowedHosts:[],
  poll: false,
  errorOverlay:false,
  proxyTable:{}
}