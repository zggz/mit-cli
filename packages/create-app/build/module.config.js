import path from 'path'

import * as utils from './utils.js'

import config from '../config/index.js'
const moduleConfig = () => {
  const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
  )
  function resolve (dir) {
    return path.join(config.appPath, dir)
  }
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
  const isEnvDevelopment = process.env.NODE_ENV === 'development'
  const isEnvProduction = process.env.NODE_ENV === 'production'

  return {
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
          ...utils.styleLoaders({ sourceMap: (isEnvDevelopment || shouldUseSourceMap), usePostCSS: true }),
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
                  name: utils.assetsPath('media/[name].[hash:7].[ext]')
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
              babelrc: true,
              configFile: true,
              plugins: [
                isEnvDevelopment &&
                'react-refresh/babel'
              ].filter(Boolean),
              cacheDirectory: true,
              cacheCompression: false,
              compact: isEnvProduction
            }
          }
        ]
      }
    ]
  }
}

export default moduleConfig
