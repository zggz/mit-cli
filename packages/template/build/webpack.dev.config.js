
import path from 'path'
import address from 'address'
import { merge } from 'webpack-merge'
import portFinder from 'portfinder'
import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin'
import pico from 'picocolors'

import webpackConfig from './webpack.config.js'
import config from '../config/index.js'
import * as utils from './utils.js'

const { green } = pico
const devWebpackConfig = merge(webpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true })
  },
  devServer: {
    client: {
      logging: 'none',
      overlay: config.errorOverlay
        ? { warnings: false, errors: true }
        : false,
      progress: true
    },
    compress: true,
    allowedHosts: config.allowedHosts.length > 1 ? config.allowedHosts : 'all',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') }
      ]
    },
    host: config.host,
    port: config.port,
    open: config.autoOpenBrowser,
    proxy: config.proxyTable || {},
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      const port = devServer.server.address().port
      console.log('Listening on port:', port)
    }
  }
})

export default new Promise((resolve, reject) => {
  portFinder.basePort = process.env.PORT || config.port
  portFinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      const message = ['Your application is running here:', '', green(`http://${devWebpackConfig.devServer.host}:${port}`)]
      if (devWebpackConfig.devServer.host === '0.0.0.0') {
        message.push(green(`http://${address.ip()}:${port}`))
      }
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: message,
          notes: ['Some additional notes to be displayed upon successful compilation']
        },
        clearConsole: true,
        onErrors: undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
