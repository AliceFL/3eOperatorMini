/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs')

const dirName = process.argv[2]

if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：npm run tep test')
  process.exit(0)
}

// mpvue模板
const indexTep = `
<template lang = 'pug'>
  .${dirName}
</template>

<script>
// import inspectCell from '@/components/inspect_cell'

export default {
  components: {
    // inspectCell
  },

  data () {
    return {
    }
  },

  methods: {
  },

  created () {
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.${dirName} {
}
</style>`
// js文件模板
const jsTep = `
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
`
// json文件模板
const jsonTep = `
{
  "navigationBarTitleText": "",
  "usingComponents": {
    "i-row": "../../../static/iview/row/index",
    "i-col": "../../../static/iview/col/index",
    "i-button": "../../../static/iview/button/index",
    "i-toast": "../../../static/iview/toast/index",
    "i-cell-group": "../../../static/iview/cell-group/index",
    "i-cell": "../../../static/iview/cell/index",
    "i-icon": "../../../static/iview/icon/index",
    "i-input": "../../../static/iview/input/index",
    "i-panel": "../../../static/iview/panel/index"
  }
}
`

fs.mkdirSync(`./src/pages/${dirName}`) // mkdir $1
process.chdir(`./src/pages/${dirName}`) // cd $1

fs.writeFileSync('index.vue', indexTep)
fs.writeFileSync('main.js', jsTep)
fs.writeFileSync('main.json', jsonTep)

console.log(`模版${dirName}已创建,请手动修改json名字`)

process.exit(0)
