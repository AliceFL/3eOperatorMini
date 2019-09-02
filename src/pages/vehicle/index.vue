
<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .vehicle(v-else)
    i-tabs(:current="current" color="#296DF7" @change="handleChange")
      i-tab(key="tab1" title="超期")
      i-tab(key="tab2" title="临保")
    <!-- 项目详情 -->
    .tab1(v-if = "current === 'tab1' || current === 'tab2'")
      noDate(v-if = 'list && list.length === 0')
      vehicleCell(:array = 'array' :list = 'list' v-else @setDay = 'setDay')
    view(style = 'height:150rpx')
    bottomTab(current = 'vehicle')
</template>

<script>
import vehicleCell from '@/components/vehicle_cell'
import bottomTab from '@/components/bottom_tab'
import noDate from '@/components/Nodate_cell'
import { carMsg } from '@/api/api'

export default {
  components: {
    vehicleCell,
    bottomTab,
    noDate
  },

  data () {
    return {
      isShow: true,
      current: 'tab1',
      list: null,
      type: 1,
      array: [],
      isDay: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.isShow = false
    }, 1500)
    this.carMsg()
  },

  methods: {
    setDay () {
      this.isDay = !this.isDay
      this.list = this.list.sort((a, b) => {
        const data = this.isDay ? (a.dd - b.dd) : (b.dd - a.dd)
        return data
      })
    },
    async carMsg () {
      const type = this.type
      const json = await carMsg({ type })
      if (json.code === 200) {
        json.data = json.data.map(res => {
          res.nsd = res.nsd.slice(0, 10)
          return res
        })
        this.list = json.data
      }
    },
    handleChange (res) {
      this.current = res.mp.detail.key
      this.type = (this.current === 'tab1') ? 1 : 2
      this.carMsg()
    }
  },

  created () {
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.vehicle {
  .tab1,
  .tab2 {
    background-color: #fff;
    margin: 20rpx 0 150rpx 0
  }
}
</style>