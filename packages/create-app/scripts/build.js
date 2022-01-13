/* eslint-disable import/first */

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
import config from '../config/index.js'

import path from 'path'
import webpack from 'webpack'
import ora from 'ora'
import rm from 'rimraf'
import pico from 'picocolors'

const { red, yellow, cyan } = pico

const spinner = ora('building for production...')
spinner.start()

async function main () {
  rm(path.join(config.assetsRoot, config.assetsSubDirectory), async err => {
    if (err) throw err
    const webpackProdConfig = await (await import('../build/webpack.prod.config.js')).default
    webpack(webpackProdConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(cyan('  Build complete.\n'))
      console.log(yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
}

main()
