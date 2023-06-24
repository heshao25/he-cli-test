const commander = require('commander')
const createInitCommand = require('@he.test/init')
const log = require('@he.test/utils')
const pkg = require('../package.json')
const {program} = commander


module.exports = function(argv) {
  log.info('v', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0]) // 脚手架名称
    .usage('<command> [options]') // 提示
    .version(pkg.version) // 版本
    .option('-d, --debug', '是否开启调试模式', false)

  createInitCommand(program)

  program.parse(process.argv)
}