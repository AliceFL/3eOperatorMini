<template lang='pug'>
.driver_bill
  picker(mode="multiSelector" :value= 'dataTime' @change="changeDateTime" @columnchange="changeDateTimeColumn" :range= 'dateTimeArray')
    p.center(v-if = 'result')
      text.fz35 {{ result.m }}月
      text.fz28 {{ result.y }}年
      i.iconfont.icon-down
  .bill_total(v-if = 'list')
    view
      text.fz28 收入 
      text.fz35 ￥ {{ list.addTotal }}
    view
      text.fz28 支出
      text.fz35 ￥ {{ list.remTotal }}
</template>

<script>
import utils from '../utils/utils.js'

export default {
  props: ['type', 'list'],
  data () {
    return {
      index: 0,
      result: {
        y: null,
        m: null
      },
      dateTimeArray: [],
      dataTime: [],
      startYear: 2000,
      endYear: 2050
    }
  },
  methods: {
    bindPickerChange (e) {
      this.index = e.mp.detail.value
      this.result = this.array[this.index]
      this.$emit('input', this.array[this.index])
    },
    changeDateTime (e) {
      this.dataTime = e.mp.detail.value
    },
    changeDateTimeColumn (e) {
      const arr = this.dataTime
      const dateArr = this.dateTimeArray.slice(0, 2)
      arr[e.mp.detail.column] = e.mp.detail.value
      // dateArr[2] = utils.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
      // this.dateTimeArray = dateArr
      this.dataTime = arr
      this.result.y = `${dateArr[0][arr[0]]}`
      this.result.m = `${dateArr[1][arr[1]]}`
      this.$emit('input', this.result)
      this.$emit('getTime', `${dateArr[0][arr[0]]}${dateArr[1][arr[1]]}`)
    }
  },
  onLoad () {
    if (this.type === 'select') return false
    const data = utils.dateTimePicker(this.startYear, this.endYear)
    console.log(data.dateTime)
    this.dateTimeArray = data.dateTimeArray.slice(0, 2)
    this.dataTime = data.dateTime
    const arr = this.dataTime
    const dateArr = this.dateTimeArray
    this.result.y = `${dateArr[0][arr[0]]}`
    this.result.m = `${dateArr[1][arr[1]]}`
    this.$emit('input', this.result)
    this.$emit('getTime', `${dateArr[0][arr[0]]}${dateArr[1][arr[1]]}`)
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.driver_bill {
  width:100%; 
  padding: 20rpx;
  .center {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    text:nth-of-type(2) {
      padding-left: 10rpx 
    }   
  }
  .bill_total {
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: flex-end;
    padding-top: 30rpx;
    view {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
