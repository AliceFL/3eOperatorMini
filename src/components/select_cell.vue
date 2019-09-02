<template lang='pug'>
.select_cell
  picker(mode = multiSelector @change="bindPickerChange" :value= 'index' :range="array")
    .text
      text {{ title }}
      input.tr(type="text" :title="title" :placeholder="placeholder" disabled = 'true' v-model = 'result')
      i.iconfont.icon-arrow

</template>

<script>
import utils from '../utils/utils.js'

export default {
  props: ['title', 'placeholder', 'array', 'value'],
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

  watch: {
    value () {
      if (!this.value) {
        this.result = null
      }
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
      const dateArr = this.dateTimeArray.slice(0, 3)
      arr[e.mp.detail.column] = e.mp.detail.value
      dateArr[2] = utils.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
      this.dateTimeArray = dateArr
      this.dataTime = arr
      this.result = `${dateArr[0][arr[0]]}-${dateArr[1][arr[1]]}-${dateArr[2][arr[2]]}`
      this.$emit('input', this.result)
    }
  },
  onLoad () {
    if (this.type === 'select') return false
    const data = utils.dateTimePicker(this.startYear, this.endYear)
    console.log(data.dateTime)
    this.dateTimeArray = data.dateTimeArray.slice(0, 3)
    this.dataTime = data.dateTime
    const arr = this.dataTime
    const dateArr = this.dateTimeArray
    this.result = `${dateArr[0][arr[0]]}-${dateArr[1][arr[1]]}-${dateArr[2][arr[2]]}`
    this.$emit('input', this.result)
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
  .text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    text, input {
      height: 100rpx;
      line-height: 100rpx;
    }
    text {
      flex: 0 0 30%;
    }
    input {
      flex: 0 0 60%;
    }
    i {
      flex: 0 0 5%;
      color: @vms-color-wathet;
    }
  }
}
</style>
