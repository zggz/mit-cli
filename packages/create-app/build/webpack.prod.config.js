
// import path from 'path'
import { merge } from 'webpack-merge'
import glob from 'glob'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import PurgeCSSPlugin from 'purgecss-webpack-plugin'

import webpackConfig from './webpack.config.js'
import * as utils from './utils.js'

import config from '../config/index.js'

const prodWebpackConfig = merge(webpackConfig, {
  mode: 'production',
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
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    pathinfo: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].chunk.css')
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${config.srcPath}/**/*`, { nodir: true })
    })
  ]
})

export default prodWebpackConfig
