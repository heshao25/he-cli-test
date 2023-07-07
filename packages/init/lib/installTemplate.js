import path from 'node:path'
import fse from 'fs-extra'
import { pathExistsSync } from 'path-exists' // 判断路径是否存在的库
import { log } from '@he.test/utils'
import ora from 'ora'
import { execa } from 'execa'

function getCacheFilePath(targetPath, template){
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}

function copyFile(targetPath, template, installDir){
  const originFile = getCacheFilePath(targetPath, template)
  const fileList = fse.readdirSync(originFile) // 读文件
  const spinner = ora('正在拷贝文件...').start()
  fileList.map(file => {
    fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })
  spinner.stop()
  log.success('拷贝成功')
}

async function installPackages(installDir, name){
  const cwd = `${installDir}`
  const spinner = ora('正在安装依赖...').start()
  await execa('npm',['install'], {cwd})
  spinner.stop()
  log.success('依赖安装完成')
}

export default async function installTemplate(selectedTemplatet, opts) {
  const { force = false } = opts
  const { targetPath, name, template } = selectedTemplatet
  const rootDir = process.cwd() // 当前路径
  fse.ensureDirSync(targetPath)     // 确保targetPath时存在的,若不存在则自动创建
  const installDir = path.resolve(`${rootDir}/${name}`)
  if(pathExistsSync(installDir)){ // installDir 路径是否存在
    if(!force){ // 是否有--force
      log.error(new Error(`当前目录已存在${name}文件`))
      return
    } else {
      fse.removeSync(installDir)
      fse.ensureDirSync(installDir) // 确保targetPath时存在的,若不存在则自动创建
    }
  } else {
    fse.ensureDirSync(installDir)
  }
  await copyFile(targetPath, template, installDir)
  await installPackages(installDir, name)
  log.success('项目初始化完成')
  log.info('进入项目')
  log.info(`cd ${name}`)
  log.info('npm run serve')
}