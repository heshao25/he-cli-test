import urlJoin from 'url-join'
import axios from 'axios'
import log from './log.js'

function getNpmInfo(npmName){
  // 淘宝:'https://registry.npmjs.taobao.org/'
  const registry = 'https://registry.npmjs.org/'
  const url = urlJoin(registry, npmName)
  return axios.get(url).then(res => {
    try{
      return res.data
    } catch(err){
      return Promise.reject(err)
    }
  })
}

export function getLatestVersion(npmName) {
  return getNpmInfo(npmName).then(data => {
    if(!data['dist-tags'] || !data['dist-tags'].latest){
        log.error('没有 latest 版本')
        return Promise.reject(new Error('没有 latest 版本'))
    } else {
      return data['dist-tags'].latest
    }
  })
}