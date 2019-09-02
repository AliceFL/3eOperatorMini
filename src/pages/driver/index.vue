<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .driver_table(v-else)
    i-tabs(:current="current" color="#296DF7" @change="handleChange")
      i-tab(key="tab1" title="详情" v-if = "currentType !== 'user'")
      i-tab(key="tab2" title="收支")
      i-tab(key="tab3" title="分析")
    <!-- 项目详情 -->
    .tab1(v-if = "current === 'tab1' && currentType !== 'user'")
      .avatar
        .avatar_main
          i-avatar(src= '../../../static/images/logo.png' size="large" shape="circle")
          .avatar_name(v-if = 'datasource')
            text {{ datasource.driver_name }}
            text {{ datasource.agent_name }}
        .avatar_start
          setDriverStart(:array = 'arrayList' :is_enable = 'datasource.is_enable' @change = 'changeStart')
      .driver_info
        .driver_title
          .span
          text.fz32 基本信息
        .driver_main(v-if = 'datasource')
          text.fz28
           | 身份证号：{{ datasource.identity_car || '暂无' }}
          text.fz28
           | 联系电话：{{ datasource.driver_mobile || '暂无' }}
          text.fz28
           | 现住地址：暂无
          text.fz28
           | 出生日期：{{ datasource.date_birth || '暂无' }}
          text.fz28
           | 加入日期：{{ datasource.first_issue_date || '暂无' }}
      .driver_images
        .driver_images_title
          .span
          text.fz32 图片信息
        .driver_images_main(v-if = 'datasource')
          image(v-if = 'datasource.driver_front_photo' :src="datasource.driver_front_photo" mode="widthFix")
          image(v-if = 'datasource.identity_front_photo' :src="datasource.identity_front_photo" mode="widthFix")
    <!-- 项目收支 -->
    .tab2(v-if = "current === 'tab2'")
      .bill
        .bill_title
          image(src="../../static/images/driver_bill.png" mode="widthFix")
          .bill_title_main()
            driverBill(v-model = 'searchTime'  @getTime = 'getTime' :list = 'feeTotal')
        .bill_main(v-if = 'feeAll' v-for = '(item, index) in feeAll' :key = 'index')
          billCell(:list = 'item' :newData = 'newData' @setData = 'setData' :current = 'currentType')
        noDate(v-if = 'feeAll && feeAll.length === 0')
    <!-- 项目分析 -->
    .tab3(v-if = "current === 'tab3'")
      .canvas_ec
        .canavs_title
          canvasTime(type = 'time' @setCanvas = 'setCanvas')
        ec-canvas(v-if = 'ec' id="mychart-dom-bar" canvas-id="mychart-1" :ec="ec")
        noDate(v-if = 'datasource && datasource.length === 0')
      .canvas_bar
        .canavs_title
          canvasTime(:array = 'array' @setCanvas = 'changeAccount')
        ec-canvas(v-if = 'bar' id="mychart-dom-bar" canvas-id="mychart-bar-2" :ec="bar")
        noDate(v-if = 'datasource && datasource.length === 0')
    view(style='height:150rpx')
    bottomTab(:current = 'currentType' v-if = "current !== 'tab3'")
</template>

<script>
import bottomTab from '@/components/bottom_tab'
import driverBill from '@/components/driver_bill'
import billCell from '@/components/bill_cell'
import setDriverStart from '@/components/set_driver_start'
import noDate from '@/components/Nodate_cell'
import canvasTime from '@/components/canvas_time'
import { rankingUserInfo, feeAnalysis, getFee, usereNable } from '@/api/api'
import utils from '@/utils/utils'
import canvasJS from '@/utils/canvas'
import Toast from '@/utils/tips'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'res_user'
    ])
  },
  components: {
    bottomTab,
    driverBill,
    billCell,
    noDate,
    canvasTime,
    setDriverStart
  },
  data () {
    return {
      current: 'tab1',
      searchTime: null,
      bar: null,
      ec: null,
      feeAll: null,
      datasource: null,
      timeSelect: null,
      hasData: false,
      array: ['按科目', '按项目'],
      currentType: 'index',
      isShow: true,
      arrayList: ['停用', '激活'],
      feeTotal: null,
      start: '0',
      newTime: null
    }
  },

  methods: {
    changeAccount (start) {
      this.start = start
      this.ec = null
      this.bar = null
      this.feeAnalysis()
    },
    changeStart (res) {
      this.usereNable(res)
    },
    setData (res) {
      this.hasData = !this.hasData
      this.newData = this.hasData ? res : null
    },
    handleChange (res) {
      this.current = res.mp.detail.key
    },
    async usereNable (res) {
      const { userid } = this.$root.$mp.query
      const isenable = +res
      const json = await usereNable({ userid, isenable })
      if (json.code === 200) {
        Toast.alert('修改成功')
      } else {
        Toast.alert('修改失败')
      }
    },
    async rankingUserInfo () {
      const { userid } = this.$root.$mp.query
      const json = await rankingUserInfo({ userid })
      if (json.code === 200) {
        this.datasource = json.data[0]
        console.log(json.data)
      }
    },
    async feeAnalysis () {
      let userid = null
      const yearmonth = this.newTime
      const agentid = 1
      let dataList = null
      const type = this.$root.$mp.query.type
      if (type && type === 'user') {
        userid = this.res_user[0].user_id
        dataList = { userid, yearmonth, agentid }
      } else {
        userid = this.$root.$mp.query.userid
        dataList = { userid, yearmonth }
      }
      const json = await feeAnalysis(dataList)
      if (json.code === 200) {
        this.datasource = json.data.res
        const data = utils.yearDate(json.data, this.start)
        const TimeList = canvasJS.option(data.TimeList)
        const accountList = canvasJS.barOption(data.accountList)
        this.ec = { options: TimeList }
        this.bar = { options: accountList }
      }
    },
    async getFee (res) {
      let userid = null
      let type = null
      const yearmonth = res
      const agentid = 1
      let dataList = null
      const types = this.$root.$mp.query.type
      if (types && types === 'user') {
        type = 1
        userid = this.res_user[0].user_id
        dataList = { userid, yearmonth, type, agentid }
      } else {
        type = 0
        userid = this.$root.$mp.query.userid
        dataList = { userid, yearmonth, type }
      }
      const json = await getFee(dataList)
      if (json.code === 200) {
        const { resultData, addTotal, remTotal } = utils.setBillList(json.data.res)
        this.feeAll = resultData
        console.log(utils.setBillList(json.data.res))
        this.feeTotal = { addTotal, remTotal }
      }
    },
    getTime (res) {
      this.getFee(res)
    },
    setCanvas (res) {
      this.newTime = res
      this.ec = null
      this.bar = null
      this.feeAnalysis()
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
  },

  mounted () {
    setTimeout(() => { this.isShow = false }, 1500)
    const { name } = this.$root.$mp.query
    if (name) {
      wx.setNavigationBarTitle({ title: name })
      this.rankingUserInfo()
      return
    }
    wx.setNavigationBarTitle({ title: '我的' })
    this.currentType = 'user'
    this.current = 'tab2'
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.driver_table {
  .avatar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20rpx;
    margin: 20rpx 0;
    background-color: #fff;
    .avatar_main {
      display: flex;
      flex-direction: row;
      .avatar_name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text {
          padding: 10rpx;
        }
        text:nth-of-type(1) {
          font-weight: 700
        }
        text:nth-of-type(2) {
          font-size: 25rpx;
          color: #3D3C3D;
        }
      }
    }
    .avatar_start {
      display: flex;
      align-items: center;
      color: #fff;
    }
  }
  .driver_images {
    margin: 20rpx 0 150rpx 0;
  }
  .driver_info,
  .driver_images {
    padding: 20rpx;
    background-color: #fff;
    .driver_title,
    .driver_images_title {
      display: flex;
      align-items: center;
      padding: 0 0 20rpx 10rpx;
      border-bottom: 1rpx solid #f0f0f0;
      .span {
        width: 8rpx;
        height: 25rpx;
        background-color: #2260DC;
        margin-right: 20rpx;
      }
      text {
        font-weight: 700
      }
    }
    .driver_images_main,
    .driver_main  {
       display: flex;
       padding-top: 20rpx;
    }
    .driver_images_main {
      justify-content: space-between;
      image {
        width: 30%;
      }
    }
    .driver_main {
      flex-direction: column;
      color: #3D3C3D;
      text {
        line-height: 2
      }
    }
  }
  /*  项目收支 */
  .bill {
    .bill_title {
      position: relative;
      margin: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      image {
        display: block;
        width: 100%;
      }
      .bill_title_main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
      }
    }
  }
  /* 分析 */
  .tab3 {
    margin: 20rpx;
    .canvas_ec,
    .canvas_bar {
      width: 100%;
      height: 600rpx;
      padding: 20rpx;
      background-color: #fff;
      .canavs_title {
        padding-bottom: 20rpx;
        position: relative;
        border-bottom: 1rpx dashed #f0f0f0;
        &::after,
        &::before {
          content: '';
          position: absolute;
          bottom: -20rpx;
          width: 40rpx;
          height: 40rpx;
          border-radius: 40rpx; 
          background-color: #f0f0f0;
        }
        &::after {
          left: -40rpx;
        }
        &::before {
          right: -40rpx;
        }
      }
    }
    .canvas_ec {
      height: 600rpx;
      background-color: #fff
    }
    .canvas_bar {
      margin-top: 20rpx;
    }
  }
}
</style>