
import createInitCommand from '@he.test/init'
import './exception.js' // 异常处理 
import createCLI from './createCLI.js'



export default function(argv) {
  const program = createCLI()
  createInitCommand(program)
  program.parse(process.argv)
}