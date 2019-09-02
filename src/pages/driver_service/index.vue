
<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .driver_service(v-else)
    list-html(v-if = 'city' :data= 'city' @detail="binddetail" :config="config")
</template>

<script>
import { referRals } from '@/api/api'
import utils from '@/utils/utils'

export default {
  data () {
    return {
      city: null,
      isShow: true,
      config: {
        horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
        animation: true, // 过渡动画是否开启
        search: false, // 是否开启搜索
        searchHeight: 45, // 搜索条高度
        suctionTop: true // 是否开启标题吸顶
      }
    }
  },

  methods: {
    binddetail (e) {
      const res = JSON.stringify(e.mp.detail)
      const url = `../recruit_add/main?pageNum=${res}`
      wx.redirectTo({ url })
    },
    async referRals () {
      const json = await referRals()
      if (json.code === 200) {
        this.city = utils.query(json.data)
      } else {
        wx.navigateBack({
          delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        })
      }
    }
  },

  mounted () {
    setTimeout(() => {
      this.isShow = false
    }, 1500)
    this.referRals()
  },

  created () {
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.driver_service {
  width: 100%;
  height: 100vh;
}
</style>