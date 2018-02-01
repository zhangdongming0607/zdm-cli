const path = require('path')
const download = require('download-git-repo')
const ora = require('ora')

const TEMP_DIR = 'template_zdm_cli_temp'

const urlReg = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?$/

function getTemplate(pathname, isOffline, callback) {
  if(!isOffline) {
    // remote
    if(!urlReg.test(pathname)) {
      return console.log('remote url is illegal')
    }
    return downloadFromRepo(pathname, callback)
  }
  // offline
  const finalTemplatePath = path.isAbsolute(pathname)
    ? pathname
    : path.normalize(path.join(process.cwd(), pathname))
  callback(finalTemplatePath)
}

function downloadFromRepo(templatePath, callback) {
  const spinner = ora('downloading template')
  spinner.start()
  download(templatePath.replace('https://github.com/', ''), TEMP_DIR, {clone: true}, function (err) {
    spinner.stop()
    if(err) {
      console.log('download error')
      return callback(null)
    }
    return callback(TEMP_DIR)
  })
}

module.exports ={
  getTemplate,
  TEMP_DIR: 'template_zdm_cli_temp'
}