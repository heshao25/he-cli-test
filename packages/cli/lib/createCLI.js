import path from 'node:path'
import {program} from 'commander'
import { log, isDebug } from '@he.test/utils'
import fse from'fs-extra' // 读取文件用的库
import { dirname } from 'dirname-filename-esm'
import chalk from 'chalk'
import semver from  'semver'


const __dirname = dirname(import.meta)
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fse.readJSONSync(pkgPath)

const LOWEST_NODE_VERSION = '14.0.0' // 最低版本号码
function checkNodeVersion(){ // 利用semver进行一个版本对比分析，semver时专门对比版本的一个库
  if( !semver.gte(process.version, LOWEST_NODE_VERSION)){ // gte代表大于或等于
    throw new Error(chalk.red('node 版本过低'))
  } 
}

function preAction() {
  // 检查node版本
  checkNodeVersion()
}


export default function createCLI() {
  //log.info('v', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0]) // 脚手架名称
    .usage('<command> [options]') // 提示
    .version(pkg.version) // 版本
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction) // 钩子函数


  program.on('command:*', function(obj){ // 监听未知命令
    log.error('unkonwn command -> ' + obj[0])
  })

  program.on('option:debug', function(){
    if(program.opts().debug){
      log.info('debug launch')
    }
  })

  return program
}