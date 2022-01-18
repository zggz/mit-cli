
const fs = require('fs')
const { red } = require('picocolors')

module.exports = function validDir(targetDir) {
  const defaultProjectName = !targetDir ? 'vite-project' : targetDir
  return [{
    type: targetDir ? null : 'text',
    name: 'projectName',
    message: 'Project name:',
    initial: defaultProjectName,
    onState: (state) =>
      (targetDir = state.value.trim() || defaultProjectName)
  }, {
    type: () =>
      !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
    name: 'overwrite',
    message: () =>
      (targetDir === '.'
        ? '当前目录'
        : `目录"${targetDir}"`) +
        '不是空的. 是否移除目录下的文件继续?'
  }, {
    type: (_, { overwrite } = {}) => {
      if (overwrite === false) {
        throw new Error(red('✖') + ' Operation cancelled')
      }
      return null
    },
    name: 'overwriteChecker'
  }, {
    type: () => (isValidPackageName(targetDir) ? null : 'text'),
    name: 'packageName',
    message: 'Package name:',
    initial: () => toValidPackageName(targetDir),
    validate: (dir) =>
      isValidPackageName(dir) || 'Invalid package.json name'
  }]
}

function isValidPackageName (projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}
function toValidPackageName (projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}
function isEmpty (path) {
  return fs.readdirSync(path).length === 0
}
