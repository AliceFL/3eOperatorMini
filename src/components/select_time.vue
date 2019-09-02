
<template lang='pug'>
.select_cell
  picker(v-if = "type === 'between'" mode="multiSelector" :value= 'dataTime' @change="changeDateTime" @columnchange="changeDateTimeColumn" :range= 'dateTimeArray')
    .switch
      .text
        text {{ result }}
        i.iconfont.icon-down
      .switch_btn
        text 月
        i.iconfont.icon-change
        text 年
  picker(v-if = "type === 'center'" mode="multiSelector" :value= 'dataTime' @change="changeDateTime" @columnchange="changeDateTimeColumn" :range= 'dateTimeArray')
    .center
      text {{ result }}
      i.iconfont.icon-down
</template>

<script>
import utils from '../utils/utils.js'

export default {
  props: ['type'],
  data () {
    return {
      index: 0,
      result: null,
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
      this.result = `${dateArr[0][arr[0]]}年${dateArr[1][arr[1]]}月`
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
    this.result = `${dateArr[0][arr[0]]}年${dateArr[1][arr[1]]}月`
    this.$emit('input', this.result)
    this.$emit('getTime', `${dateArr[0][arr[0]]}${dateArr[1][arr[1]]}`)
  },
  mounted () {
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.select_cell {
  width:100%;
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center
  }
  .switch {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20rpx;
    color: @vms-color;
    margin: 0 auto;
    .text {
      display: flex;
      justify-content: center;
    }
    .switch_btn {
      display: flex;
    }
  }
}
</style>
