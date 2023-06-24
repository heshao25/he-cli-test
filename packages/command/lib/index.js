class Command{
  constructor(instance){
    if(!instance){ // 若没有实例则抛出
      throw new Error('command instance must not be bull')
    }
    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    cmd.hook('preAction', () => {
      this.preAction()
    }) // 钩子函数 执行action之前的钩子
    cmd.hook('postAction', () => {
      this.postAction()
    })// 钩子函数 执行action之后的钩子
    if(this.options?.length > 0){
      this.options.forEach(option => {
        cmd.option(...option)
      })
    }
    cmd.option('-f, --force', '是否强制初始化', false)
    cmd.action((...params) => {
         //console.log('init--',name, opt)
         this.action(params)
      })
  }

  get command() {
    throw new Error('command must be implement')
  }

  get description() {
    throw new Error('description must be implement')
  }

  get options() {
    return []
  }

  get action() {
    throw new Error('action must be implement')
  }

  preAction(){
    // console.log('pre')
  }

  postAction(){
    // console.log('post')
  }
}

module.exports = Command;

