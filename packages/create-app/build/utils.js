
import path from 'path'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import config from '../config/index.js'

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

export const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.assetsSubDirectory
    : config.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

export function resolve (dir) {
  return path.join(config.appPath, dir)
}

function generateLoaders () {
  const loaders = [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009'
                },
                stage: 3
              }
            ],
            'postcss-normalize'
          ]
        },
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
      }
    }
  ].filter(Boolean)

  return loaders
}

export const cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        config: false,
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: 'autoplace'
              }
            }
          ],
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          'postcss-normalize'
        ]
      },
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    //  style-loader，因为它可以使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快
    loaders.unshift(isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader)

    return loaders
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
export const styleLoaders = function (options) {
  const output = []
  const loaders = cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
