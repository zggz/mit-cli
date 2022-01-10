// import path from 'path'

import config from '../config/index.js'

// import { __dirname } from './utils/index.js'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'
export default {
  context: config.contextPath,
  mode: isEnvProduction ? 'production' : 'development',
  target: isEnvDevelopment ? 'web' : 'browserslist',
  entry: config.entryPath,
  output: {
    filename: '[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出'
    }),
    new ESLintPlugin()
  ]
}
