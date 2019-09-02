
<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .recruit(v-else)
    .recruit_title
    .recruit_title_image
      image(src="../../static/images/o_driver_bill.png" mode="widthFix")
      .recruit_title_center(v-if = 'datasource')
        text {{ datasource.activate_user }}
        text.fz25 签约人数
      .recruit_title_right.fz25(@click = 'add_recruit') 新增
    .recruit_main(v-if = 'datasource && datasource.res_joinlist')
      noDate(v-if = 'datasource && datasource.res_joinlist && datasource.res_joinlist.length === 0')
      recruitCell(:array = 'array' :list = 'datasource.res_joinlist' v-else)
    view(style = 'height:150rpx')
    bottomTab(current = 'recruit')
</template>

<script>
import bottomTab from '@/components/bottom_tab'
import recruitCell from '@/components/recruit_cell'
import { joinUser } from '@/api/api'
import noDate from '@/components/Nodate_cell'

export default {
  components: {
    bottomTab,
    recruitCell,
    noDate
  },

  data () {
    return {
      datasource: null,
      jsonTypeList: null,
      isShow: true,
      list: [],
      array: ['登记', '审核', '签约']
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
  },
  methods: {
    add_recruit () {
      const url = '../recruit_add/main'
      wx.navigateTo({ url })
    },
    async joinUser () {
      const agentid = 1
      const json = await joinUser({ agentid })
      if (json.code === 200) {
        json.data.res_joinlist = json.data.res_joinlist.map(res => {
          if (res.join_date) {
            res.join_date = res.join_date.slice(0, 10)
          }
          return res
        })
        this.jsonTypeList = json.data.res_join
        this.datasource = json.data
      }
    }
  },

  mounted () {
    setTimeout(() => {
      this.isShow = false
    }, 1500)
    this.joinUser()
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.recruit {
  width: 100%;
  .recruit_title {
    width: 100%;
    height: 150rpx;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: @vms-color;
  }
  .recruit_title_image {
    position: relative;
    top: -140rpx;
    padding: 0 20rpx;
    image {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
    .recruit_title_center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150rpx;
      height: 150rpx;
      margin-top: -75rpx;
      margin-left: -75rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      text:nth-of-type(1) {
        font-size: 40rpx;
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 150rpx;
        height: 150rpx;
        border: 5rpx solid #fff;
        border-radius: 150rpx;
        border-left-color: transparent;
        transform:rotate(270deg)
      }
    }
    .recruit_title_right {
      position: absolute;
      right: 60rpx;
      bottom: 40rpx;
      color: #fff;
      border: 1rpx solid #fff;
      border-radius: 20rpx;
      padding: 0 20rpx; 
    }
  }
  .recruit_main {
    background-color: #fff;
    margin: -120rpx 0 150rpx 0;
  }
}
</style>