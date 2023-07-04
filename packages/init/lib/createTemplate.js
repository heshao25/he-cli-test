import {log, makeList, makeInput} from '@he.test/utils'

const ADD_TEMPLATE = [
  {
    name:'vue3',
    npmName:'@he.test/vue-template',
    version:'1.0.1',
    value:'vue-template'
  },
  {
    name:'react',
    npmName:'@he.test/react-template',
    version:'1.0.0',
    value:'react-template'
  }
]

const ADD_TYPE_PAGE = 'page'
const ADD_TYPE_PROJECT = 'project'

const ADD_TYPE = [
  {
    name:'项目',
    value:ADD_TYPE_PROJECT
  },
  {
    name:'页面',
    value:ADD_TYPE_PAGE
  }
]

function getAddType() {
  return makeList({
    choices:ADD_TYPE,
    message:'请选择初始换类型',
    defaultValue:ADD_TYPE_PROJECT
  })
}

// 获取项目名称
function getAddName(){
  return makeInput({
    message:'请输入项目名称',
    defaultValue:''
  })
}

// 选择模板
function getAddTemplate(){
  return makeList({
    choices:ADD_TEMPLATE,
    message:'请选择模板类型'
  })
}

export default async function createTemplate(name, opts) {
  // 获取创建类型
  const addType = await getAddType()
  if(addType === 'project') {
    const addName = await getAddName()
    const addTemplate = await getAddTemplate()
    const selectedTemplate = ADD_TEMPLATE.find(item => item.value === addTemplate)
    return{
      type:addType,
      name:addName,
      template:selectedTemplate
    }
  }
}