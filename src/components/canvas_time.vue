
<template lang='pug'>
.select_cell
  picker(v-if = "type === 'time'" mode="multiSelector" :value= 'dataTime' @change="changeDateTime" @columnchange="changeDateTimeColumn" :range= 'dateTimeArray')
    .center
      text {{ year }}月收支表
      .select_time
        text {{ result }}
        i.iconfont.icon-down
  picker(v-else mode = multiSelector @change="bindPickerChange" :value= 'index' :range="array")
    .center
      text
      .select_time
        text {{ resultType }}
        i.iconfont.icon-down

</template>

<script>
import utils from '../utils/utils.js'

export default {
  props: ['type', 'array'],
  data () {
    return {
      index: 0,
      result: null,
      resultType: '按科目',
      dateTimeArray: [],
      dataTime: [],
      startYear: 2000,
      endYear: 2050,
      year: null
    }
  },
  methods: {
    bindPickerChange (e) {
      this.index = e.mp.detail.value
      this.resultType = this.array[this.index]
      this.$emit('setCanvas', this.index)
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
      this.year = `${dateArr[1][arr[1]]}`
      this.$emit('input', this.result)
      this.$emit('setCanvas', `${dateArr[0][arr[0]]}${dateArr[1][arr[1]]}`)
    }
  },
  onLoad () {
    if (this.type !== 'time') return false
    const data = utils.dateTimePicker(this.startYear, this.endYear)
    console.log(data.dateTime)
    this.dateTimeArray = data.dateTimeArray.slice(0, 2)
    this.dataTime = data.dateTime
    const arr = this.dataTime
    const dateArr = this.dateTimeArray
    this.result = `${dateArr[0][arr[0]]}年${dateArr[1][arr[1]]}月`
    this.$emit('input', this.result)
    this.$emit('setCanvas', `${dateArr[0][arr[0]]}${dateArr[1][arr[1]]}`)
    this.year = `${dateArr[1][arr[1]]}`
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.select_cell {
  width:100%;
  .center,
  .select_time {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .icon-down {
      font-size: 20rpx;
    }
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
