'use strict'

import webpackProdConfig from '../build/webpack.prod.config.js'
import config from '../config/index.js'

import path from 'path'
import webpack from 'webpack'
import ora from 'ora'
import rm from 'rimraf'
import pico from 'picocolors'

const { red, yellow, cyan } = pico

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
  if (err) throw err
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
