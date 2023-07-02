import path from 'node:path'
import {execa} from 'execa'
// import { dirname } from 'dirname-filename-esm'
// const __dirname = dirname(import.meta)
const CLI = path.join(__dirname,'../bin/cli.js')
const bin = () => (...args) => execa(CLI, args)
// 运行错误的命令
test('run erroor command', async () => {
  const { stderr } = await bin()('iii')
  expect(stderr).toContain('unkonwn command -> iii')
  console.log(stderr)
})
// 执行help不报错
test('should not throw error when use help --help',async() => {
  let error = null
  try{
    await bin()('--help')
  } catch(e){
    error = e
  }
  expect(error).toBe(null)
})

 // 测试version是否显示
 test('show version', async () => {
  const {stdout} = await bin()('-V')
  expect(stdout).toContain(require('../package.json').version)
 })

 // 测试正确开启debug
 test('open debug', async () => {
  let error = null
  try{
    await bin()('--debug')
  } catch(e){
    error = e
  }
  expect(error.message).toContain('debug launch')
 })