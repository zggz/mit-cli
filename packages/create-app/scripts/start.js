import webpackDevConfig from '../build/webpack.dev.config.js'
import openBrowser from 'react-dev-utils/openBrowser.js'
// import devServerConfig from '../build/devServer.config.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import pico from 'picocolors'

const { cyan } = pico

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

async function main () {
  const config = await webpackDevConfig
  const compiler = webpack(config)
  const devServer = new WebpackDevServer(config.devServer, compiler)

  console.log('Starting server...')

  devServer.startCallback(() => {
    const { host, port } = config.devServer
    console.log(cyan('Starting the development server...\n'))
    openBrowser(`http://${host}:${port}`)
  })

  ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      devServer.close()
      process.exit()
    })
  })
}

main()
