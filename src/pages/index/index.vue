
<template lang = 'pug'>
.page
  i-spin(size="large" fix v-if= 'isShow')
  .index_table(v-else)
    i-tabs(:current="current" color="#296DF7" @change="handleChange")
      i-tab(key="tab1" title="自有")
      i-tab(key="tab2" title="外协")
    .tab1(v-if = "current === 'tab1' || current === 'tab2'")
      swiper(
        v-if = 'list && list.length > 0'
        @change = 'changeSwiper'
        :style= 'computedClassObject'
        indicator-color = 'rgba(212, 212, 212, 1)'
        indicator-active-color = 'rgba(41, 111, 241, 1)')
        block(v-for = 'item in 3' :key = 'item')
          swiper-item()
            indexList(
              :list = 'list'
              :newTime = 'newTime'
              @chengeNum = 'chengeNum')
      nodateCell(v-else)
    .dots(v-if = 'list && list.length > 0')
      block(v-for = '(item, name) in 3' :key = 'name')
        .dot(:class = "[{'active': cur === name  }]")
    bottomTab(current = 'index')
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import bottomTab from '@/components/bottom_tab'
import nodateCell from '@/components/Nodate_cell'
import indexList from '@/components/index_list'
import { userInfo, rankingAll } from '@/api/api'

export default {
  computed: {
    ...mapState([
      'openid'
    ]),
    computedClassObject () {
      const len = this.list.length + 2
      return this.showJson({
        height: len * 50 + 'px'
      })
    }
  },
  components: {
    bottomTab,
    indexList,
    nodateCell
  },

  data () {
    return {
      jointype: 3,
      agentid: null,
      isShow: true,
      current: 'tab1',
      widHeight: 40,
      list: [],
      datasource: null,
      newTime: '日',
      type: false,
      cur: 0
    }
  },

  mounted () {
    setTimeout(() => {
      this.isShow = false
    }, 1500)
    this.get_user_info()
  },

  methods: {
    chengeNum (res) {
      this.type = !this.type
      this.list = this.list.sort((a, b) => {
        const data = this.type ? (a[res] - b[res]) : (b[res] - a[res])
        return data
      })
    },
    changeSwiper (e) {
      const { current } = e.mp.detail
      this.cur = current
      if (current === 2) {
        this.list = this.datasource.res_y
        this.newTime = '年'
        return
      }
      if (current === 1) {
        this.newTime = '月'
        this.list = this.datasource.res_m
        return
      }
      if (current === 0) {
        this.newTime = '日'
        this.list = this.datasource.res_d
      }
    },
    handleChange (res) {
      this.newTime = '日'
      this.cur = 0
      this.current = res.mp.detail.key
      const type = this.current === 'tab1'
      this.jointype = type ? 3 : 2
      this.get_rank()
    },
    showJson (style) {
      let s = []
      for (let i in style) {
        s.push(i + ':' + style[i])
      }
      s = s.join(';')
      return s
    },
    async get_user_info () {
      const openid = this.openid
      const json = await userInfo({ openid })
      if (json.code === 200) {
        this.updatePayload(json.data)
        this.agentid = json.data.res_user[0].agent_id || 0
        this.get_rank()
      }
    },
    async get_rank () {
      const jointype = this.jointype
      const agentid = this.agentid
      const json = await rankingAll({ jointype, agentid })
      if (json.code === 200) {
        this.list = json.data.res_d
        this.datasource = json.data
      }
    },
    ...mapMutations(['updatePayload'])
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.index_table {
  .tab1,
  .tab2 {
    margin-top: 20rpx;
    margin-bottom: 50rpx;
  }
  .dots {
    position: fixed;
    left: 0;
    bottom: 150rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 30rpx;
      margin-right: 15rpx;
      border-radius: 30rpx;
      background-color: white;
    }
    .active {
      background-color: #296DF7;
    }
  }
}
</style>