export default function idDebug(){ // 判断是否处于debug状态
  return process.argv.includes('--debug') || process.argv.includes('-d')
}