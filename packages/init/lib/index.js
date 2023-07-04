
import Command from '@he.test/command'
import {log} from '@he.test/utils'
import createTemplate from './createTemplate.js'

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }
  get description() {
    return 'init project'
  }
  get options() {
    return [
      ['-f, --force', '是否强制初始化', false]
    ]
  }
  action([name, opts]){
    //log.verbose('init', name,opts)
    // 1: 选择项目模板
    createTemplate(name, opts)
    // 2: 下载项目模板至缓存目录
    // 3: 安装项目至项目目录
  }
}

function init(instance){
  return new InitCommand(instance)
}

export default  init;

