
import { log, isDebug } from '@he.test/utils'

function printLog(e,type){
  if(isDebug()) { // 在debug状态下打印全部错误，包括错误路径等等
    console.log(type,e)
  } else { // 不在debug状态下止打印一行错误
    console.log(type,e.message)
  }
}

process.on('uncaughtException', (e) => { // 捕获抛出的异常
  printLog(e,'error')
})
process.on('unhandleRejection', (e) => { // 捕获抛出的异常
  printLog(e,'promiseError')
})
