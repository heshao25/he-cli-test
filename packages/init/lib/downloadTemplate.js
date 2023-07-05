import path from 'node:path'
import {pathExistsSync} from 'path-exists' // 判断路径是否存在的库
import fse from 'fs-extra'
import ora from 'ora'
import {log} from '@he.test/utils'
import {execa} from 'execa'


function getCacheDir(targetPath){
  return path.resolve(targetPath,'node_modules') // 必须要有node_modules
}

function makeCacheDir(targetPath){
  const cacheDir = getCacheDir(targetPath)
  if(!pathExistsSync(cacheDir)){ // 没有此路径的话就创建, 利用fs-extra
    fse.mkdirpSync(cacheDir)
  }
}

async function downloadAddTemplate(targetPath, template){
  const {npmName, version} = template
  const installCommand = 'npm'
  const installArgs = ['install',`${npmName}@${version}`]
  const cwd = targetPath
  await execa(installCommand, installArgs, {cwd})
}

export default async function downloadTemplate(selectedTemplatet) {
  const {targetPath, template} = selectedTemplatet
  makeCacheDir(targetPath)
  const spinner = ora('正在下载模板').start()
  try{
    await downloadAddTemplate(targetPath, template)
      spinner.stop()
      log.success('下载成功')
    
  } catch(e){
    spinner.stop()
    log.error(e.message)
  }
}