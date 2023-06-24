const log = require('npmlog') // npmlog用于debug时输出信息用

if(process.argv.includes('--debug') || process.argv.includes('-d')){ // 只有当前命令包含debug选项才输出verbose级别的信息
  log.level = 'verbose' // 打印verbose以上
} else {
  log.level = 'info' // 打印vinfo以上
}

log.heading = 'he' // 输出前缀
log.addLevel('success', 2000,{fg:'green', bold:true}) // 自定义添加级别， success为名称，2000为级别，最后的对象为颜色与加粗

//log.level = 'verbose' // verbose 级别以上的也打印

module.exports = log