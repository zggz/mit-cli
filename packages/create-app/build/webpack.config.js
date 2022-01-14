import path from 'path'

import config from '../config/index.js'
import moduleConfig from './module.config.js'
import * as utils from './utils.js'

import ESLintPlugin from 'eslint-webpack-plugin'
// 解决osx 文件大小写的问题
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
// import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'react-dev-utils/ForkTsCheckerWarningWebpackPlugin.js'
import eslintFormatter from 'react-dev-utils/eslintFormatter.js'
import webpack from 'webpack'

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const webpackConfig = {
  context: config.appPath,
  target: ['browserslist'],
  entry: config.entryPath,
  bail: isEnvProduction,
  output: {
    filename: '[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    pathinfo: true
    // clean: true 该配置和ESLintPlugin 会导致热 eslint错误后更新失败
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    alias: {
      '@': utils.resolve('src')
    }
  },
  stats: 'errors-only',
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  infrastructureLogging: {
    level: 'none'
  },
  module: moduleConfig(),
  plugins: [
    new webpack.ProgressPlugin(),
    new CaseSensitivePathsPlugin(),
    new ESLintPlugin({
      // Plugin options
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      formatter: eslintFormatter,
      failOnError: !isEnvDevelopment,
      context: config.srcPath,
      cache: true,
      cacheLocation: path.resolve(
        config.appNodeModules,
        '.cache/.eslintcache'
      ),
      // ESLint class options
      cwd: config.appPath,
      baseConfig: {
        extends: ['eslint-config-react-app/base']
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      async: isEnvDevelopment,
      typescript: {
        configOverwrite: {
          compilerOptions: {
            sourceMap: isEnvProduction
              ? shouldUseSourceMap
              : isEnvDevelopment,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            noEmit: true,
            incremental: true,
            tsBuildInfoFile: path.resolve(config.appNodeModules, '.cache/tsconfig.tsbuildinfo')
          }
        },
        context: config.appPath,
        diagnosticOptions: {
          syntactic: true
        },
        mode: 'write-references'
        // profile: true,
      },
      issue: {
        // This one is specifically to match during CI tests,
        // as micromatch doesn't match
        // '../cra-template-typescript/template/src/App.tsx'
        // otherwise.
        include: [
          { file: '../**/src/**/*.{ts,tsx}' },
          { file: '**/src/**/*.{ts,tsx}' }
        ],
        exclude: [
          { file: '**/src/**/__tests__/**' },
          { file: '**/src/**/?(*.){spec|test}.*' },
          { file: '**/src/setupProxy.*' },
          { file: '**/src/setupTests.*' }
        ]
      },
      logger: {
        infrastructure: 'silent'
      }
    })
  ],
  performance: false
}
export default webpackConfig
