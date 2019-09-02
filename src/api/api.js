/*
    接口配调用文件
    lingang 2019.5.13
*/
import fly from '../../src/utils/httpUtil'

// 获取微信小程序openid和token
export const login = params => {
  return fly.get(`api/agt/users/login`, params)
}

// 获取车辆实时定位
export const carPTK = params => {
  return fly.get(`api/agt/car/RTK`, params)
}

// 代理商注册
export const regMobile = params => {
  return fly.post(`api/agt/users/regmobile`, params)
}

// 获取用户信息
export const userInfo = params => {
  return fly.get(`api/agt/users/userinfo`, params)
}

// 获取榜单
export const rankingAll = params => {
  return fly.post(`api/agt/fee/ranking`, params)
}

// 获取榜单用户信息
export const rankingUserInfo = params => {
  return fly.get(`api/agt/users/rankinguserinfo`, params)
}

// 更改用户的激活状态
export const usereNable = params => {
  return fly.post(`api/agt/users/userenable`, params)
}

// 车务-新用户列表
export const joinUser = params => {
  return fly.post(`api/agt/users/joinuser`, params)
}

// 获取司机担保人
export const referRals = params => {
  return fly.get(`api/agt/users/referrals`, params)
}

// 费用分析-根据用户id-按月度类型统计
export const feeAnalysis = params => {
  return fly.post(`api/agt/fee/feeAnalysis`, params)
}

// 获取账单-根据用户id月度
export const getFee = params => {
  return fly.post(`api/agt/fee/getfee`, params)
}

// 车务-超期临保
export const carMsg = params => {
  return fly.get(`api/agt/car/carmsg`, params)
}
// 新用户增改保存
export const saveJoinuser = params => {
  return fly.post(`api/agt/users/savejoinuser`, params)
}

// 获取城市列表
export const getCityList = params => {
  return fly.get(`api/tms/driver/get/cityList`, params)
}

// 获取项目列表
export const getProjectlist = params => {
  return fly.get(`api/tms/driver/get/projectlist`, params)
}

// 根据城市项目号获取司机列表
export const getDriverlist = params => {
  return fly.get(`api/tms/driver/get/driverlist/by/project`, params)
}

// 插入司机信息
export const driverInsert = params => {
  return fly.post(`api/tms/driver/insert/driver`, params)
}

// 修改司机信息
export const driverRevise = params => {
  return fly.post(`api/tms/driver/revise/driver`, params)
}
