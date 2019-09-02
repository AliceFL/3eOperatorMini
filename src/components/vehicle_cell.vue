
<template lang='pug'>
.vehicle_cell
  //- picker(mode = multiSelector @change="bindPickerChange" :value= 'index' :range="array")
  .center
    .select_time.item
      text {{ resultType }}
      //- i.iconfont.icon-down
    text.item 承包人
    text.item 维保日期
    view.item.volume(@click.stop = 'setDay')
      text 超期天数
      view
        view(:class = "[isDay ? 'top' : 'bottom']")

  .select_main(v-if = 'list && list.length > 0' v-for = '(item, index) in list' :key = 'index')
    text.item {{ item.CAR_NUMBER }}
    text.item.phone
      text {{ item.name || '无' }}
      text.fz25 {{ item.phone || '' }}
    text.item {{ item.nsd }}
    text.item {{ item.dd }}
</template>

<script>
export default {
  props: ['type', 'array', 'list'],
  data () {
    return {
      index: 0,
      result: null,
      resultType: '车号',
      dateTimeArray: [],
      dataTime: [],
      startYear: 2000,
      endYear: 2050,
      isDay: false
    }
  },
  methods: {
    setDay () {
      this.isDay = !this.isDay
      this.$emit('setDay')
    },
    bindPickerChange (e) {
      // this.index = e.mp.detail.value
      // this.resultType = this.array[this.index]
      // this.$emit('input', this.array[this.index])
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.vehicle_cell {
  width:100%;
  .center,
  .select_main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .phone {
      display: flex;
      flex-direction: column;
    }
  }
  .select_time {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .icon-down {
      font-size: 20rpx;
    }
  }
  .center,
  .select_main {
    border-bottom: 1rpx solid #f0f0f0;
    .item {
      flex: 1;
      text-align: center
    }
  }
  .select_time,
  .select_main {
    padding: 20rpx 0;
  }
  .volume {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .top {
      width: 0;
      height: 0;
      border: 6px solid; 
      border-color:#296DF7 transparent transparent transparent;
      position: relative;
      top: 8rpx
    }
    .bottom {
      width: 0;
      height: 0;
      border: 6px solid;
      border-color:transparent  transparent #296DF7 transparent;
      position: relative;
      top: -8rpx
    }
  }
}
</style>

