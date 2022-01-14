/* eslint-disable import/first */
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.env.GENERATE_SOURCEMAP = 'true'

import openBrowser from 'react-dev-utils/openBrowser.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import pico from 'picocolors'

const { cyan } = pico

async function main () {
  const config = await (await import('../build/webpack.dev.config.js')).default
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
