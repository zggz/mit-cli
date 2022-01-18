#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
//  node命令行 参数解析器
const { red, yellow, blue } = require('picocolors')
const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })

const prompts = require('prompts')

const validDir = require('./validDir')

const cwd = process.cwd()
const renameFiles = {
  _gitignore: '.gitignore'
}

const TEMPLATES = ['vite', 'webpack']
const FRAMEWORKS = [{
  name: 'react-vite',
  value: 'vite',
  color: yellow
},
{
  name: 'react-webpack',
  value: 'webpack',
  color: blue
}]

async function init () {
  const targetDir = argv._[0]
  let template = argv.template || argv.t
  const questions = [
    ...validDir(targetDir),
    {
      type: template && TEMPLATES.includes(template) ? null : 'select',
      name: 'framework',
      message:
        typeof template === 'string' && !TEMPLATES.includes(template)
          ? `"${template}" 不支持. 请从以下选择: `
          : '请选择模板:',
      // initial: 0,
      choices: () =>
        FRAMEWORKS.map((framework) => {
          const variantColor = framework.color
          return {
            title: variantColor(framework.name),
            value: framework.value
          }
        })
    }
  ]
  let result = {}
  try {
    result = await prompts(questions, {
      onCancel: () => {
        throw new Error(red('✖') + ' Operation cancelled')
      }
    })
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }
  console.log(result)
  const { framework, overwrite, packageName } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  template = framework || template
  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.join(__dirname, `template-${template}`)
  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }
}

init()

function emptyDir (dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

function copy (src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir (srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}
