
<template lang='pug'>
.Nodate_cell
  .icon
    i.iconfont.icon-no-date
    text.fz28 暂无数据
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 150rpx;
.Nodate_cell {
  width:100%;
  .icon {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 150rpx 0;
    .icon-no-date { .icon-size(@icon-size,@icon-size,@icon-size,@vms-color-wathet) };
    text {
      color: @vms-color-wathet;
      margin-top: 20rpx;
    }
  }
}
</style>
