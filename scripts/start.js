process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'


import webpackConfig from '../build/webpack.config.js'
import devServerConfig from '../build/devServer.config.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'


const compiler = webpack(webpackConfig)
const devServer = new WebpackDevServer(devServerConfig, compiler)


const runServer = async () => {
  console.log('Starting server...')
  await devServer.start()
  console.log('Starting the development server...\n')
}

runServer()


