const commander = require('commander')
const pkg = require('../package.json')
const {program} = commander


module.exports = function(argv) {
  //console.log(argv)
  program
    .name(Object.keys(pkg.bin)[0]) // 脚手架名称
    .usage('<command> [options]') // 提示
    .version(pkg.version) // 版本
    .option('-d, --debug', '是否开启调试模式', false)

  program
  .command('init [name]')
  .description('init project')
  .option('-f, --force', '是否强制初始化', false)
  .action((name, opt) => {
    console.log('init--',name, opt)
  })

  program.parse(process.argv)
}