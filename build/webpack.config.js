// import path from 'path'

import config from '../config/index.js'

// import { __dirname } from './utils/index.js'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
// import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin'

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
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additional notes to be displayed upon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    }),

    new ESLintPlugin()
  ]
}
