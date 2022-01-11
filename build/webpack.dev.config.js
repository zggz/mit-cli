
import path from 'path'
import { merge } from 'webpack-merge'
import portFinder from 'portfinder'
import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin'

import webpackConfig from './webpack.config.js'
import config from '../config/index.js'

const devWebpackConfig = merge(webpackConfig, {
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
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
