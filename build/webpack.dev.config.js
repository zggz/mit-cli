

import merge from 'webpack-merge'

import webpackConfig from './webpack.config.js'
import config from '../config/index.js'


const devWebpackConfig = merge(webpackConfig, {})

export default devWebpackConfig