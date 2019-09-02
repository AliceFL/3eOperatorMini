<template lang='pug'>
.bottom_tab
  i-tab-bar(:current="current" color="#002366" @change="handleChange" fixed = 'true')
    i-tab-bar-item(key="index" icon="homepage" current-icon="homepage_fill" title="榜单")
    i-tab-bar-item(key="recruit" icon="group" current-icon="group_fill" title="招募")
    i-tab-bar-item(key="vehicle" icon="remind" current-icon="remind_fill" title="车务")
    i-tab-bar-item(key="personnelList" icon="addressbook" current-icon="addressbook_fill" title="人员")
    i-tab-bar-item(key="user" icon="mine" current-icon="mine_fill" title="我")
</template>

<script>
export default {
  props: ['current'],
  methods: {
    handleChange (res) {
      const { key } = res.mp.detail
      if (key === 'user') {
        const url = `../driver/main?type=user`
        wx.reLaunch({url})
        return false
      }
      const url = `../${key}/main?type=${key}`
      wx.reLaunch({url})
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.bottom_tab {
  width:100%;
}
</style>
