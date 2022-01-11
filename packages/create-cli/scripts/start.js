import webpackDevConfig from '../build/webpack.dev.config.js'
// import devServerConfig from '../build/devServer.config.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

async function main () {
  const config = await webpackDevConfig
  const compiler = webpack(config)
  const devServer = new WebpackDevServer(config.devServer, compiler)

  const runServer = async () => {
    console.log('Starting server...')
    await devServer.start()
    console.log('Starting the development server...\n')
  }
  runServer()
}

main()
