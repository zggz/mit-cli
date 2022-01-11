
// import path from 'path'
import { merge } from 'webpack-merge'

import webpackConfig from './webpack.config.js'
// import config from '../config/index.js'

const prodWebpackConfig = merge(webpackConfig, {
})

export default prodWebpackConfig
