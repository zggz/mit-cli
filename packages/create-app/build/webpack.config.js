import path from 'path'

import config from '../config/index.js'

import * as utils from './utils.js'

import ESLintPlugin from 'eslint-webpack-plugin'
// 解决osx 文件大小写的问题
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
// import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'react-dev-utils/ForkTsCheckerWarningWebpackPlugin.js'
import eslintFormatter from 'react-dev-utils/eslintFormatter.js'
import webpack from 'webpack'

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

function resolve (dir) {
  return path.join(config.appPath, dir)
}

const webpackConfig = {
  context: config.appPath,
  target: ['browserslist'],
  entry: config.entryPath,
  bail: isEnvProduction,
  output: {
    filename: '[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath
    // clean: true 该配置和ESLintPlugin 会导致热 eslint错误后更新失败
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  stats: 'errors-only',
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  infrastructureLogging: {
    level: 'none'
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Handle node_modules packages that contain sourcemaps
      shouldUseSourceMap && {
        enforce: 'pre',
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: 'source-map-loader'
      },
      {
        oneOf: [
          {
            test: [/\.avif$/],
            type: 'asset',
            mimetype: 'image/avif',
            generator: {
              filename: utils.assetsPath('img/[name].[hash:7].[ext]')
            },
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit
              }
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            generator: {
              filename: utils.assetsPath('img/[name].[hash:7].[ext]')
            },
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit
              }
            }
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }]
                  },
                  titleProp: true,
                  ref: true
                }
              },
              {
                loader: 'url-loader',
                options: {
                  name: 'static/media/[name].[hash].[ext]'
                }
              }
            ],
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
            }
          },
          {
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource'
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
            options: {
              babelrc: false,
              configFile: false,
              presets: [
                [
                  'babel-preset-react-app',
                  {
                    runtime: 'automatic'
                  }
                ]
              ],
              plugins: [
                isEnvDevelopment &&
                'react-refresh/babel'
              ].filter(Boolean),
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,
              compact: isEnvProduction
            }
          }
        ]
      }

    ]
  },
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
