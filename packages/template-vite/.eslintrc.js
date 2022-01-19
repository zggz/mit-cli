// 需要安装依赖:  npm i eslint-define-config
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: [
    '@ts/eslint-config'
  ]
})
