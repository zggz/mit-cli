import webpackDevConfig from '../build/webpack.dev.config.js'
import openBrowser from '../build/openBrowser.js'
// import devServerConfig from '../build/devServer.config.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import pico from 'picocolors'

const { cyan } = pico

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
const formatUrl = (host, port) => {
  if (host === '0.0.0.0') {
    host = 'localhost'
  }
  return `http://${host}:${port}`
}

async function main () {
  const config = await webpackDevConfig
  const compiler = webpack(config)
  const devServer = new WebpackDevServer(config.devServer, compiler)

  // const runServer = async () => {
  //   await devServer.start()
  //   console.log('Starting the development server...\n')
  // }
  // runServer()

  console.log('Starting server...')

  devServer.startCallback(() => {
    console.log(cyan('Starting the development server...\n'))
    openBrowser(formatUrl(config.devServer.host, config.devServer.port))
  })
}

main()
