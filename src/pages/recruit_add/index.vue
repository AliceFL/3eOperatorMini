
<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .recruit_add(v-else)
    .driver_info
      .driver_title
        .span
        text.fz32 基本信息
      .driver_main
        view
          text.fz28 司机姓名：
          input(type =  'text' v-model= 'drivername' confirm-type = 'next' placeholder = '请输入司机姓名')
        view
          text.fz28 准驶车型：
          input(type =  'idcard' v-model= 'driverclass' confirm-type = 'next' placeholder = '请输入准驶车型')
        view
          text.fz28 联系电话：
          input(type =  'number' v-model= 'drivermobile' confirm-type = 'next' placeholder = '请输入联系电话' maxlength = '11')
        view
          text.fz28 现住地址：
          input(type =  'text' v-model= 'currentresidentialadd' confirm-type = 'next' placeholder = '请输入现住地址')
        view
          text.fz28 出生日期：
          input(type =  'text' v-model= 'datebirth' confirm-type = 'next' placeholder = '出生日期/1995-08-08')
        view
          text.fz28 加入日期：
          input(type =  'text' v-model= 'joindate' confirm-type = 'next' placeholder = '加入日期/2019-08-08')
        view
          text.fz28 身份证号：
          input(type =  'idcard' v-model= 'identitycard' confirm-type = 'next' placeholder = '请输入身份证号码' maxlength = '18')
    .driver_info
      .driver_title
        .span
        text.fz32 其他信息
      .driver_main(@click = 'toAdd')
        text.fz28(v-if = 'res_user') 担保人：{{ res_user[0].user_name }}
        text.fz28(v-if = 'queryInfo') 推荐人：{{ queryInfo.name }} {{ queryInfo.mobile }}
        text.fz28(v-else) 推荐人：点击选择
    .driver_images
      .driver_images_title
        .span
        text.fz32 证件照片
      .driver_images_main
        uploadImgOne(v-model = 'identityfrontphoto' tip = '身份证正面' )
        uploadImgOne(v-model = 'driverfrontphoto' tip = '驾照正面' )
    .footer
      button(type = 'button' @click = 'sumbit') 保存
</template>

<script>
import { saveJoinuser } from '@/api/api'
import { mapState } from 'vuex'
import Toast from '@/utils/tips'
import uploadImgOne from '@/components/upload_img_one'

export default {
  components: {
    uploadImgOne
  },

  computed: {
    ...mapState([
      'res_user'
    ])
  },

  data () {
    return {
      isShow: true,
      drivername: null,
      driverclass: null,
      drivermobile: null,
      currentresidentialadd: null,
      datebirth: null,
      joindate: null,
      identityfrontphoto: null,
      driverfrontphoto: null,
      identitycard: null,
      referralsid: null,
      agentid: 1,
      userid: null,
      headurl: '',
      queryInfo: null
    }
  },

  methods: {
    toAdd () {
      const url = '../driver_service/main'
      wx.redirectTo({ url })
    },
    sumbit () {
      if (!this.drivername) {
        Toast.alert('司机姓名必填')
        return
      }
      if (!this.driverclass) {
        Toast.alert('准驶车型必填')
        return
      }
      if (!this.drivermobile) {
        Toast.alert('联系电话必填')
        return
      }
      if (!this.currentresidentialadd) {
        Toast.alert('联系地址必填')
        return
      }
      if (!this.datebirth) {
        Toast.alert('出生日期必填')
        return
      }
      if (!this.joindate) {
        Toast.alert('加入日期必填')
        return
      }
      if (!this.identityfrontphoto) {
        Toast.alert('身份证正面必需上传')
        return
      }
      if (!this.driverfrontphoto) {
        Toast.alert('驾照正面')
        return
      }
      if (!this.queryInfo) {
        Toast.alert('请选择推荐人')
        return
      }
      if (this.queryInfo && this.queryInfo.userid) {
        this.referralsid = this.queryInfo.userid
      }
      this.saveJoinuser()
    },
    async saveJoinuser () {
      const userid = this.res_user[0].user_id
      const json = await saveJoinuser({
        drivername: this.drivername,
        driverclass: this.driverclass,
        drivermobile: this.drivermobile,
        currentresidentialadd: this.currentresidentialadd,
        datebirth: this.datebirth,
        joindate: this.joindate,
        identityfrontphoto: this.identityfrontphoto,
        driverfrontphoto: this.driverfrontphoto,
        identitycard: this.identitycard,
        referralsid: this.referralsid,
        agentid: this.agentid,
        userid: `${userid}`,
        headurl: this.headurl
      })
      if (json.code === 200) {
        console.log(json.data)
      }
    }
  },

  mounted () {
    const { pageNum } = this.$root.$mp.query
    if (pageNum) {
      this.queryInfo = JSON.parse(pageNum)
    } else {
      Object.assign(this.$data, this.$options.data())
    }
    setTimeout(() => {
      this.isShow = false
    }, 1500)
  },

  created () {
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.recruit_add {
  .driver_info,
  .driver_images {
    margin-top: 20rpx;
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
       view {
         display: flex;
         justify-content: flex-start;
         align-items: center;
       }
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
  .footer {
    padding: 0 20rpx 40rpx 20rpx;
    button {
      color: #fff;
      border-radius: 50rpx;
      margin-top: 50rpx;
      background-color: #5BAD0D;
    }
  }
}
</style>