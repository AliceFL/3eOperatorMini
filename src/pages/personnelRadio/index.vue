
<template lang = 'pug'>
.personnel
  view.personnel_cell
    .cell(v-for = 'item in projectlist' :key = 'item.id' @click = 'radioChange(item)')
      span {{ item.projectShortName }}
      radio(:checked = 'item.checked')
  view(style = 'height: 110px')
  .footer
    button(type = 'button' @click = 'sumbit') 确认

</template>

<script>
import Toast from '@/utils/tips'
import bottomTab from '@/components/bottom_tab'
import { getProjectlist } from '@/api/api'

export default {
  components: { bottomTab },

  data () {
    return {
      projectlist: [],
      projectIds: ''
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
  },

  methods: {
    radioChange ({ id }) {
      this.projectlist = this.projectlist.map(res => {
        if (res.id === id) {
          res.checked = !res.checked
        }
        return res
      })
    },
    sumbit () {
      const data = this.projectlist.filter(res => res.checked)
      const json = JSON.stringify(data)
      const url = `../personnel/main?arrList=${json}`
      wx.reLaunch({ url })
    },
    async getProjectlist () {
      if (!this.city) {
        Toast.alert('请选择城市')
        return
      }
      const json = await getProjectlist({ city: this.city })
      if (json.status) {
        this.projectlist = json.data.map(res => {
          res.checked = false
          return res
        })
        if (this.projectIds) {
          const data = this.projectIds.split(',')
          this.projectlist = json.data.map(res => {
            data.forEach(item => {
              const n = +item
              if (n === res.id) {
                res.checked = true
              }
            })
            return res
          })
        }
      }
    }
  },

  mounted () {
    const { city, projectIds } = this.$root.$mp.query
    this.city = city
    this.projectIds = projectIds
    this.getProjectlist()
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.personnel {
  .personnel_cell {
    background-color: #fff;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    span {
      flex: 0 0 70%
    }
    input {
      text-align: right
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 20rpx 40rpx 20rpx;
    background-color: #ffffff;
    button {
      color: #fff;
      border-radius: 50rpx;
      margin-top: 50rpx;
      background-color: #5BAD0D;
    }
  }
}
</style>
