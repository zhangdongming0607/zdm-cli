module.exports = {
  prompt: [
  {
    name: 'name',
    message: 'your project name in package.json',
    default: 'my-project',
  },{
    name: 'license',
    message: 'your repo license',
    default: 'MIT',
  },{
    name: 'style',
    choices: ['css', 'less', 'sass'],
    message: 'choose less, sass or plain css for your project',
    validate: (val) => (['css', 'less', 'sass'].includes(val))
  }]
}
