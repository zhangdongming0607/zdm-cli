const inquirer = require('inquirer')
const async = require('async')

module.exports = function ask (prompts, data, done) {
  async.eachSeries(Object.values(prompts), (val, next) => {
    const {name: key} = val
    prompt(data, key, val, next)
  }, done)
}

function prompt (data, key, prompt, done) {
  inquirer.prompt([{
    type: 'string',
    name: key,
    message: prompt.message,
    default: data[key] || prompt.default,
    validate: prompt.validate || (() => true)
  }]).then(answers => {
    const value = answers[key]
    if(key === 'style') {
      data[key] = {
        less: value === "less",
        sass: value === "sass",
        processor: value === "less" || value === "sass",
        type: value,
      }
    } else {
      data[key] = value
    }
    done()
  }).catch(done)
}