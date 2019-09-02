
<template lang='pug'>
  .bill_cell
    .title(@click = 'setData({list})')
      text.fz35 {{ list.newData }}
      text.fz35 小计：{{ list.total.total }}
    .main(v-for = '(item, index) in list.list' :key = 'index' v-if = 'list.newData === newData')
      text {{ item.orderid }}
      text {{ item.account }}
      text(v-if = "current === 'user'") +￥{{ item.income }} -￥{{ item.disbursement }}
      text(v-else-if = "item.income > item.disbursement && current === 'index'") +￥{{ item.income - item.disbursement }}
      text(v-else-if = "item.income < item.disbursement && current === 'index'") -￥{{ item.disbursement - item.income }}
</template>

<script>
export default {
  props: ['list', 'newData', 'current'],
  data () {
    return {
      indexActive: 0
    }
  },
  methods: {
    setData (res) {
      this.$emit('setData', res.list.newData)
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.bill_cell {
  width:100%;
  color: @vms-color;
  .title {
    display: block;
    padding: 30rpx 20rpx;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
    background-color: #fff;
  } 
  .title,
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .main {
    background-color: @vms-color-white;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
    background-color: #f0f0f0;
    padding: 30rpx 20rpx;
  }
}
</style>
