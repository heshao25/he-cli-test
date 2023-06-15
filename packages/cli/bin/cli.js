#!/usr/bin/env node
// 当我们本地node_modules存在一个脚手架命令，同时全局node_modules中也存在这个脚手架命令的时候，优先选用**本地node_modules**中的版本
const importLocal  = require('import-local')
const entry = require('../lib/index')
if(importLocal(__filename)){
  log.info('cli','使用的是本地cli版本')
} else{
  entry(process.argv.slice(2))
}