const path = require('path')
const Metalsmith = require('metalsmith')
const async = require('async')
const ask = require('./ask')
const prompts = require('./prompt').prompt
// const Handlebars = require('handlebars')
const render = require('consolidate').handlebars.render
module.exports = (dir, templateName, destDirName, done) => {
  const metalsmith = Metalsmith(dir)
  const data = Object.assign(metalsmith.metadata(), {
    destDirName,
    name: destDirName.split('/').slice(-1)[0],
  })
  metalsmith
    .use(askQuestions(prompts))
    .use(renderPackageJson(data))
  metalsmith
    .source('./') // 因为默认是 ./src
    .destination(destDirName)
    .build((err) => {
    done(err)
  })
  return data
}

function askQuestions (prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

function renderPackageJson(metalsmithMetadata) {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    async.each(keys, (file, next) => {
      const str = files[file].contents.toString()
      // do not attempt to render files that do not have mustaches
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, metalsmithMetadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}