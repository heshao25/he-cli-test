
import Command from '@he.test/command'
import {log} from '@he.test/utils'

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
    log.verbose('init', name,opts)
  }
}

function init(instance){
  return new InitCommand(instance)
}

export default  init;

