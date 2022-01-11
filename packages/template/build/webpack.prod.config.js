
// import path from 'path'
import { merge } from 'webpack-merge'

import webpackConfig from './webpack.config.js'
import * as utils from './utils.js'

// import config from '../config/index.js'

const prodWebpackConfig = merge(webpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true
    })
  }
})

export default prodWebpackConfig
