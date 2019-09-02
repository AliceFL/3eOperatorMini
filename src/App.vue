<script>
import Toast from '../src/utils/tips'
export default {
  onLaunch () {
    Toast.getNetworkType()
    Toast.onNetworkStatusChange()
    Toast.wepyUpdate()
  }
}
</script>

<style lang = 'less'>
@import './style/mixin.less';
@import './style/icon.less';
@import './style/base.less';

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
