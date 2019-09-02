/**
 * pages模版快速生成脚本,执行命令 npm run com `文件名`
 */

const fs = require('fs')

const dirName = process.argv[2]

if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：npm run com test')
  process.exit(0)
}

// 页面模版
const indexTep = `
<template lang='pug'>
.${dirName}
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.${dirName} {
  width:100%;
}
</style>
`
process.chdir(`./src/components/`) // cd $1

fs.writeFileSync(`${dirName}.vue`, indexTep)

console.log(`模版${dirName}已创建,你可以封装你的组件了`)

process.exit(0)
