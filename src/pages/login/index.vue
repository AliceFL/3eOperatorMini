
<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .login(v-else)
    image.top(src="../../static/images/home_banner.png" mode="widthFix")
    .sign
      .footer
        input(type= 'number' placeholder = '输入手机号' v-model = 'phone' maxlength = '11')
        view.cell.fz25 请检查手机号码是否正确,关联后不可随意更改
        button(type = 'button' @click = 'sumbit') 关联手机号

</template>

<script>
import Toast from '@/utils/tips'
import utils from '@/utils/utils'
import { mapMutations } from 'vuex'
import { regMobile, userInfo, login } from '@/api/api'

export default {
  data () {
    return {
      isShow: true,
      phone: '',
      openid: null
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.get_code()
  },

  mounted () {
    setTimeout(() => {
      this.isShow = false
    }, 1500)
  },

  methods: {
    async get_user_info () {
      const openid = this.openid
      const json = await userInfo({ openid })
      if (json.code === 200) {
        this.updatePayload(json.data)
        const data = json.data.res_user[0]
        if (data.user_type === 0 || data.user_type === '0') {
          this.show = true
          this.content = json.data.res_msg[0]
          return false
        }
        if (data.is_enable === '0' || data.is_delete === '1') {
          Toast.alert('账号被禁用，请联系管理员')
          this.is_delete = false
          this.show = true
          return false
        }
        const url = '../index/main'
        wx.reLaunch({ url })
      }
    },
    sumbit () {
      const openid = this.openid
      const mobile = this.phone
      if (!mobile) {
        Toast.alert('手机号码不能为空')
        return
      }
      const result = utils.checkPhone(mobile)
      if (!result) {
        Toast.alert('手机号码输入错误')
      }
      regMobile({ openid, mobile }).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length > 0) {
            Toast.success('关联成功')
            setTimeout(() => {
              const url = '../index/main'
              wx.reLaunch({ url })
            }, 500)
          }
          return
        }
        if (res.code === 201) {
          Toast.alert('手机号或微信已关联,不支持用户更改,如需更改请联系管理员')
          return
        }
        if (res.code === -1) {
          Toast.alert('此手机号码未注册')
          return
        }
        if (res.code === -2) {
          Toast.alert('此手机号码未注册或处于异常状态')
        }
      })
    },
    get_openId (res) {
      login({ 'js_code': res.code }).then(res => {
        if (res.code === 200) {
          const openid = res.data.result.openid
          this.openid = openid
          this.updatePayload({ openid })
          this.get_user_info({ openid })
        } else {
          this.get_code()
        }
      }).catch(() => {
        this.get_code()
      })
    },
    get_code () {
      wx.login({
        success: res => {
          this.get_openId(res)
        },
        fail: () => {},
        complete: () => {}
      })
    },
    ...mapMutations(['updatePayload'])
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.login {
  width: 100%;
  .top {
    top: 0;
    left: 0;
    width: 100%;
  }
  .sign {
    position: relative;
    top: -100rpx;
    left: 0;
    z-index: 999;
    width: 83%;
    height: 100rpx;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 20rpx
  }
  .sign,
  .footer {
    margin-bottom: 20rpx;
    box-shadow:-1rpx 0 5rpx rgba(0, 0, 0, .1),
      0 -1rpx 10rpx rgba(0, 0, 0, .1),
      1rpx 0 10rpx rgba(0, 0, 0, .1),
      0 1rpx 10rpx rgba(0, 0, 0, .1);
  }
  .footer {
    position: relative;
    top: 35rpx;
    left: -5%;
    width: 110%;
    z-index: 999999999;
    padding: 20rpx 50rpx;
    background-color: #fff;
    border-radius: 20rpx;
    .cell {
      display: inline-block;
      width: 100%;
      color: #6F9CF2;
      font-weight: 700;
      text-align: center;
    }
    input {
      padding: 20rpx;
      margin: 50rpx 0;
      border-radius: 10rpx;
      border: 1rpx solid #A7A5A6;
    }
    button {
      margin: 50rpx 0;
      color: #fff;
      margin-top: 50rpx;
      background-color: #5BAD0D;
      border-radius: 50rpx;
    }
  }

}
</style>