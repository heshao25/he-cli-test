#!/usr/bin/env node
// 当我们本地node_modules存在一个脚手架命令，同时全局node_modules中也存在这个脚手架命令的时候，优先选用**本地node_modules**中的版本
import importLocal  from 'import-local' // 当全局node_modules和本地node_modules中，存在相同的库，则优先加载本地node_modules中的库。
import entry  from '../lib/index.js'
import {log}  from '@he.test/utils'
// import { fileURLToPath } from 'node:url'
import { filename } from 'dirname-filename-esm'

//const __filename = fileURLToPath(import.meta.url) // esm 的filename的原生解决方案, 也可以使用dirname-filename-esm这个库
// console.log(__filename, importLocal(__filename),process.argv )


const __filename =  filename(import.meta)

if(importLocal(__filename)){ // __filename 为当前的绝对路径
  log.info('cli','使用的是本地cli版本')
} else{
  entry(process.argv.slice(2)) // process是node中的一个模块，通过访问process.argv我们能轻松愉快的接收通过命令执行node程序时候所传入的参数。
}