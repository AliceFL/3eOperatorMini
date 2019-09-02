
<template lang = 'pug'>
.personnel
  view.personnel_cell
    .cell
      span 姓名
      input(type = 'text' v-model = 'driverName' placeholder="请输入姓名")
    .cell
      span 手机号码
      input(type = 'number' v-model = 'mobile' placeholder="请输入手机号码" maxlength = '11')
    .cell
      span 车牌号
      input(type = 'text' v-model = 'vanNumber' placeholder="请输入车牌号" maxlength = '7')
    .cell
      span 车辆类型
      picker(mode = multiSelector @change="typePickerChange" :value= 'indexType' :range="arrayType")
        input(type = 'text' v-model = 'carType' placeholder="请选择车辆类型" disabled = 'true')
    .cell
      span 城市
      picker(mode = multiSelector @change="cityPickerChange" :value= 'indexCity' :range="arrayCity")
        input(type = 'text' v-model = 'city' placeholder="请选择城市" disabled = 'true')
    .cell(@click = 'getProgect')
      span 项目名称
      span(style = 'text-align: right' v-if = 'project') {{ project || '请选择项目' }}
      span(style = 'text-align: right; color: #919191' v-if = '!project') {{ '请选择项目' }}
  .footer
    button(v-if = 'isRouter' type = 'button' @click = 'sumbit') 新增
    button(v-else type = 'button' @click = 'sumbit') 修改
</template>

<script>
// picker(mode = multiSelector @change="projectPickerChange" :value= 'indexProject' :range="projectarray")
import Toast from '@/utils/tips'
import bottomTab from '@/components/bottom_tab'
import { getCityList, getDriverlist, getProjectlist, driverInsert, driverRevise } from '@/api/api'

export default {
  components: { bottomTab },

  data () {
    return {
      carList: [{
        label: '微面',
        value: 1
      }, {
        label: '金杯',
        value: 2
      }, {
        label: '大通',
        value: 3
      }, {
        label: '4.2箱车',
        value: 4
      }, {
        label: '6.8',
        value: 6
      }, {
        label: '7.2',
        value: 7
      }, {
        label: '9.6',
        value: 9
      }],
      project: null,
      city: null,
      driverName: null,
      mobile: null,
      vanNumber: null,
      vanType: null,
      projectType: null,
      indexType: 0,
      indexCity: 0,
      carType: null,
      indexProject: 0,
      arrayType: ['微面', '金杯', '大通', '4.2箱车', '6.8', '7.2', '9.6'],
      arrayCity: [],
      arrayProject: [],
      projectlist: null,
      projectIds: null,
      projectarray: null,
      id: null,
      isRouter: true
    }
  },

  onLoad () {
    const router = this.$root.$mp.query
    if (router.arrList) return
    Object.assign(this.$data, this.$options.data())
  },

  methods: {
    sumbit () {
      if (!this.driverName) {
        Toast.toast('姓名必填')
        return
      }
      if (!this.mobile) {
        Toast.toast('电话必填')
        return
      }
      if (!this.vanNumber) {
        Toast.toast('车牌必填')
        return
      }
      if (!this.vanType) {
        Toast.toast('车辆类型必选')
        return
      }
      if (!this.city) {
        Toast.toast('城市必选')
        return
      }
      if (!this.project) {
        Toast.toast('项目经验必选')
        return
      }
      if (this.isRouter) {
        this.driverInsert()
        return
      }
      this.driverRevise()
    },
    async getCityList () {
      const json = await getCityList()
      if (json.status) {
        this.arrayCity = json.data.map(res => res.city) || []
      }
    },
    getProgect () {
      const city = this.city || null
      if (!city) {
        Toast.toast('请选择城市')
        return
      }
      const projectIds = this.projectIds
      const url = projectIds ? `../personnelRadio/main?city=${city}&projectIds=${projectIds}` : `../personnelRadio/main?city=${city}`
      wx.navigateTo({ url })
    },
    async getProjectlist () {
      if (!this.city) {
        Toast.toast('请选择城市')
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
        this.datasource = json.data || []
      }
    },
    async driverRevise () {
      // if (this.projectIds) {
      //   console.log(this.projectIds)
      //   return
      // }
      const projectIds = this.projectIds
      const json = await driverRevise({
        driverName: this.driverName,
        mobile: this.mobile,
        vanNumber: this.vanNumber,
        vanType: this.vanType,
        projectIds: `${projectIds}`,
        city: this.city,
        driverId: this.id
      })
      if (json.status) {
        Toast.toast('修改成功')
        const url = '../personnelList/main'
        wx.reLaunch({ url })
        return
      }
      Toast.toast('修改失败')
    },
    async driverInsert () {
      const projectIds = this.projectIds
      const json = await driverInsert({
        driverName: this.driverName,
        mobile: this.mobile,
        vanNumber: this.vanNumber,
        vanType: this.vanType,
        projectIds: `${projectIds}`,
        city: this.city
      })
      if (json.status) {
        Toast.toast('提交成功')
        const url = '../personnelList/main'
        wx.reLaunch({ url })
        return
      }
      Toast.toast('添加失败')
    },
    typePickerChange (e) {
      console.log(e)
      this.indexType = e.mp.detail.value
      this.carType = this.arrayType[this.indexType]
      this.vanType = this.carList.filter(res => res.label === this.carType)[0].value
    },
    cityPickerChange (e) {
      this.indexCity = e.mp.detail.value
      this.city = this.arrayCity[this.indexCity]
      this.getProjectlist()
    },
    projectPickerChange (e) {
      this.indexProject = e.mp.detail.value
      this.project = this.projectarray[this.indexProject]
      this.projectIds = this.projectlist.filter(res => res.projectShortName === this.project)[0].id
    }
  },

  mounted () {
    const router = this.$root.$mp.query
    if (router && router.arrList) {
      const data = JSON.parse(router.arrList)
      this.project = data.map(res => res.projectShortName).join(',')
      this.projectIds = data.map(res => res.id).join(',')
    }
    if (router && router.project) {
      this.isRouter = false
      const data = JSON.parse(router.project)
      const arr = ['driverName', 'id', 'mobile', 'vanNumber', 'vanType', 'city']
      this.project = data.projectsList
      this.projectIds = data.idList
      arr.forEach(res => { this[res] = data[res] })
      this.carType = this.carList.filter(res => res.value === this.vanType)[0].label
    }
    this.getCityList()
  }
}
</script>

<style lang = 'less' scoped>
@import '../../style/mixin.less';
@icon-size: 48rpx;
.personnel {
  .personnel_cell {
    background-color: #fff
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    span {
      flex: 0 0 50%
    }
    input {
      text-align: right
    }
  }
  .footer {
    padding: 0 20rpx 40rpx 20rpx;
    button {
      color: #fff;
      border-radius: 50rpx;
      margin-top: 50rpx;
      background-color: #5BAD0D;
    }
  }
}
</style>
