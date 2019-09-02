
<template lang = 'pug'>
.personnel
  .header
    view
      picker(mode = multiSelector @change="cityPickerChange" :value= 'index' :range="array")
        span {{ city }}
    view
      picker(mode = multiSelector @change="projectPickerChange" :value= 'indexs' :range="projectarray")
        span 项目：{{ project }}
  .main(:class = "{ 'noDate': datasource.length === 0 }")
    .main-list(
      v-if = 'datasource.length > 0'
      v-for = 'item in datasource'
      :key = 'item'
      @click = 'getProjectDetail(item)')
      .left
        span(style = 'font-size: 35rpx') {{ item.driverName }} 18022152211
        span {{ item.vanNumber }}
        span(style = 'color:#bfbfbf') 项目经验： {{ item.projectsList }}
      .right
        span(style = 'color:#bfbfbf') 详细信息 >
    noDate(v-if = 'datasource.length === 0')
    bottomTab(current = 'personnelList')
  .fixedIcon(@click = 'addDriver')
    i-icon(type="add" size="28" color="#012366")
</template>

<script>
import Toast from '@/utils/tips'
import { getCityList, getDriverlist, getProjectlist } from '@/api/api'
import bottomTab from '@/components/bottom_tab'
import noDate from '@/components/Nodate_cell'

export default {
  components: { bottomTab, noDate },

  data () {
    return {
      value: null,
      project: '选择项目',
      array: [],
      projectarray: [],
      index: 0,
      indexs: 0,
      city: '选择城市',
      projectlist: [],
      projectId: null,
      datasource: []
    }
  },

  methods: {
    getProjectDetail (res) {
      const result = JSON.stringify(res)
      const url = `../personnel/main?project=${result}`
      wx.navigateTo({ url })
    },
    async getCityList () {
      const json = await getCityList()
      if (json.status) {
        this.array = json.data.map(res => res.city) || []
      }
    },
    async getProjectlist () {
      if (!this.city) {
        Toast.alert('请选择城市')
        return
      }
      const json = await getProjectlist({ city: this.city })
      if (json.status) {
        this.projectlist = json.data || []
        this.projectarray = json.data.map(res => res.projectShortName) || []
      }
    },
    async getDriverlist () {
      const json = await getDriverlist({
        projectId: this.projectId,
        city: this.city
      })
      if (json.status) {
        if (json.data && json.data.length === 0) return
        this.datasource = json.data.map(res => {
          res.projectsList = res.projects.map(res => res.projectShortName).join(',')
          res.idList = res.projects.map(res => res.id).join(',')
          return res
        })
      }
    },
    addDriver () {
      const url = '../personnel/main'
      wx.navigateTo({ url })
    },
    cityPickerChange (e) {
      this.index = e.mp.detail.value
      this.city = this.array[this.index]
      this.getProjectlist()
    },
    projectPickerChange (e) {
      this.indexs = e.mp.detail.value
      this.project = this.projectarray[this.indexs]
      const data = this.projectlist.filter(res => res.projectShortName === this.project)[0].id
      this.projectId = data
      this.getDriverlist()
    }
  },

  onShow () {
    if (this.city) { this.getDriverlist() }
  },

  mounted () {
    this.getCityList()
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.personnel {
  background-color: #fff;
  margin-bottom: 110px;
  .header {
    padding: 40rpx;
    display: flex;
    text-align: center;
    view { flex: 1 };
    border-bottom: 1rpx solid #f0f0f0;
  }
  .noDate {
    padding-bottom: 100rpx;
  }
  .fixedIcon {
    position: fixed;
    bottom: 150rpx;
    right: 40rpx;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2rpx solid #012366;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-list {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
    .left {
      flex: 0 0 70%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
