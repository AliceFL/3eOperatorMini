
<template lang='pug'>
.select_cell
  picker(mode = multiSelector @change="bindPickerChange" :value= 'index' :range="array")
    .center
      .select_time.item
        text {{ resultType }}
        i.iconfont.icon-down
      text.item 姓名
      text.item 招募日期
  .select_main(v-if = "resultType === item.joinstatus || resultType === '按科目'" v-for = '(item, index) in list' :key = 'index')
    text.item {{ item.joinstatus }}
    text.item {{ item.newname }}
    text.item {{ item.join_date }}
</template>

<script>
export default {
  props: ['type', 'array', 'list'],
  data () {
    return {
      index: 0,
      result: null,
      resultType: '按科目',
      dateTimeArray: [],
      dataTime: [],
      startYear: 2000,
      endYear: 2050
    }
  },
  methods: {
    bindPickerChange (e) {
      this.index = e.mp.detail.value
      this.resultType = this.array[this.index]
      this.$emit('input', this.array[this.index])
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.select_cell {
  width:100%;
  .center,
  .select_main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
}
</style>
