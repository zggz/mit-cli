
// import path from 'path'
import { merge } from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import webpackConfig from './webpack.config.js'
import * as utils from './utils.js'

import config from '../config/index.js'

const prodWebpackConfig = merge(webpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: false,
  output: {
    path: config.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
})

export default prodWebpackConfig
