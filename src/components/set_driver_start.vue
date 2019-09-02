<template lang='pug'>
.set_driver_start
  picker(mode = multiSelector @change="bindPickerChange" :value= 'index' :range="array")
    .center
      text.fz25 {{ result }} 
      i.iconfont.icon-down
</template>

<script>
import Toast from '../utils/tips.js'
export default {
  props: ['type', 'array', 'is_enable'],
  data () {
    return {
      index: 0,
      result: '激活',
      dateTimeArray: [],
      dataTime: [],
      startYear: 2000,
      endYear: 2050
    }
  },
  watch: {
    is_enable () {
      const type = +this.is_enable
      this.result = type ? '激活' : '停用'
    }
  },
  methods: {
    async bindPickerChange (e) {
      this.index = e.mp.detail.value
      const texts = this.array[this.index]
      await Toast.confirm(`确定${texts}？`, '提示')
      this.result = this.array[this.index]
      this.$emit('change', this.index)
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.set_driver_start {
  width:100%;
  .center {
    display: flex;
    align-items: center;
    background-color: #2260DC;
    padding: 10rpx 20rpx;
    border-radius: 20rpx; 
    text {
    }
    .iconfont.icon-down {
      color: #fff;
      font-size: 20rpx;
    }
  }
}
</style>


