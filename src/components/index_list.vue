
<template lang='pug'>
.index_list
  .title
    text.item(v-if = 'newTime')
      text(style = 'color: #296DF7') ({{ newTime }}) 
      text 排名
    text.item
    text.item 姓名
    view.volume.item(@click.stop = "election('ct')")
      text 单量
      view
        view(:class = "[isSingular ? 'top' : 'bottom']")
    view.volume.item(@click.stop = "election('amount')")
      text 收入
      view
        view(:class = "[isIncome ? 'top' : 'bottom']")
  .main(v-for = '(item, index) in list' :key = 'index' @click = 'seeInfo({item})')
    text.item {{ index + 1 }}
    .item
      i-avatar(:src= 'item.head_url' size="small" shape="circle")
    text.item {{ item.name }}
    text.item {{ item.ct }}
    text.item {{ item.amount }} 
</template>

<script>
export default {
  props: ['list', 'newTime'],
  data () {
    return {
      isSingular: false,
      isIncome: false
    }
  },
  methods: {
    election (res) {
      if (res === 'ct') {
        this.isSingular = !this.isSingular
      } else {
        this.isIncome = !this.isIncome
      }
      this.$emit('chengeNum', res)
    },
    seeInfo (res) {
      const { name, userid } = res.item
      const url = `../driver/main?name=${name}&userid=${userid}`
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 40rpx;
.index_list {
  width:100%;
  background-color: #fff;
  padding: 20rpx 0;
  .title,
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #f0f0f0;
    .item { width: 25%; text-align: center}
  }
  .title {
    padding-bottom: 20rpx;
    font-weight: 700;
  }
  .main {
    padding: 20rpx 10rpx;
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
