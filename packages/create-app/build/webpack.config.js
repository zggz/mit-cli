import path from 'path'

import config from '../config/index.js'

import * as utils from './utils.js'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import webpack from 'webpack'

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

// eslint-disable-next-line no-debugger
debugger
function resolve (dir) {
  return path.join(config.appPath, dir)
}

const webpackConfig = {
  context: config.appPath,
  target: 'browserslist',
  entry: config.entryPath,
  bail: isEnvProduction,
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    clean: true
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
  module: {

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
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new ESLintPlugin({
      // Plugin options
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      // failOnError: isEnvDevelopment,
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
