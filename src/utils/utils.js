const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
* 时间戳转化为年 月 日 时 分 秒
* ts: 传入时间戳
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
function tsFormatTime (timestamp, format) {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  let returnArr = []

  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  returnArr.push(year, month, day, hour, minute, second)

  returnArr = returnArr.map(formatNumber)

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

// 电话号码验证
function checkPhone (res) {
  const patten = /^1[345678]\d{9}$/
  if (patten.test(res)) { return true }
  return false
}

function idCode (res) {
  if (!res) return false
  const pattern = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  return pattern.test(res)
}

function isName (res) {
  if (!res) return false
  const pattern = (/^[\u4e00-\u9fa5]+$/).test(res)
  return pattern
}
// 车牌号码验证
function isCarName (res) {
  if (!res) return false
  if (res.length === 8) {
    const newPattern = (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/).test(res)
    return newPattern
  }
  const pattern = (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/).test(res)
  return pattern
}

function withData (param) {
  return param < 10 ? '0' + param : '' + param
}
function getLoopArray (s, e) {
  const start = s || 0
  const end = e || 1
  var array = []
  for (var i = start; i <= end; i++) {
    array.push(withData(i))
  }
  return array
}
function getMonthDay (year, month) {
  var flag = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  let array = null
  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(1, 31)
      break
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(1, 30)
      break
    case '02':
      array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
      break
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array
}
function getNewDateArry () {
  // 当前时间的处理
  var newDate = new Date()
  const year = withData(newDate.getFullYear())
  const mont = withData(newDate.getMonth() + 1)
  const date = withData(newDate.getDate())
  const hour = withData(newDate.getHours())
  const minu = withData(newDate.getMinutes())
  const seco = withData(newDate.getSeconds())

  return [year, mont, date, hour, minu, seco]
}
function dateTimePicker (startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  const dateTime = []
  const dateTimeArray = [[], [], [], [], [], []]
  var start = startYear || 1978
  var end = endYear || 2100
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry()
  // 处理联动列表数据
  /* 年月日 时分秒 */
  dateTimeArray[0] = getLoopArray(start, end)
  dateTimeArray[1] = getLoopArray(1, 12)
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1])
  dateTimeArray[3] = getLoopArray(0, 23)
  dateTimeArray[4] = getLoopArray(0, 59)
  dateTimeArray[5] = getLoopArray(0, 59)

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]))
  })

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}

function setTmsTime (data) {
  if (!data) return
  const json = new Date(data).toJSON()
  const result = new Date(+new Date(json) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return result
}

function setBillList (data) {
  let list = []
  let listAll = []
  let datasource = []
  data.forEach(res => {
    list.push(res.feedate)
  })
  let addTotal = 0
  let remTotal = 0
  console.log('9999', data)
  data.forEach(res => { addTotal += res.income })
  data.forEach(res => { remTotal += res.disbursement })
  addTotal = format(addTotal)
  remTotal = format(remTotal)
  const result = Array.from(new Set(list)).reverse()
  result.forEach(res => {
    listAll[res] = []
  })
  result.forEach(res => {
    listAll[res] = data.filter(item => item.feedate === res)
  })
  datasource = Object.values(listAll)
  const moneyList = totalAll(result, listAll)
  const resultData = []
  datasource.forEach((res, index) => {
    const data = {
      total: Object.values(moneyList)[index],
      newData: result[index],
      list: res
    }
    data.total.total = format(data.total.total)
    resultData.push(data)
  })
  console.log('resultData', resultData)
  console.log('addTotal', addTotal)
  console.log('remTotal', remTotal)
  return {
    resultData,
    addTotal,
    remTotal
  }
}

function totalAll (result, dataList) {
  let moneyList = []
  result.forEach(res => {
    moneyList[res] = { disbursement: 0, income: 0, total: 0 }
  })
  result.forEach(res => {
    dataList[res].map(data => {
      moneyList[res].disbursement += +data.disbursement
      moneyList[res].income += +data.income
      const listTotal = moneyList[res].income - moneyList[res].disbursement
      moneyList[res].total = listTotal // format(listTotal)
      return res
    })
  })
  return moneyList
}

function feeChiose (data, type, start) {
  let result = null
  if (start !== undefined) {
    result = (start === '0') ? data.res_ac : data.res_pjt
  } else {
    result = data.res
  }
  let allDate = { disbursement: 0, income: 0, total: 0 }
  let list = []
  const dataList = []
  result.forEach(res => {
    allDate.disbursement += +res.disbursement
    allDate.income += +res.income
  })
  allDate.total = allDate.income - allDate.disbursement
  result.forEach(res => {
    list.push(res[type])
  })
  const results = Array.from(new Set(list))
  results.forEach(res => {
    dataList[res] = 0
  })

  results.forEach(res => {
    dataList[res] = result.filter(item => item[type] === res)
  })
  const moneyList = totalAll(results, dataList)
  return {
    moneyList,
    results
  }
}

function yearDate (data, start) {
  const TimeList = feeChiose(data, 'newdate')
  const accountList = feeChiose(data, 'account', start)
  console.log('TimeList', TimeList)
  console.log('accountList', accountList)
  return { TimeList, accountList }
}

function format (num) {
  const str = +num || 0
  return (str.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

// GCJ-02(火星，高德) 坐标转换成 BD-09(百度)
function qqMapTransBMap (lng, lat) {
  let aa = 3.14159265358979324 * 3000.0 / 180.0
  let x = lng
  let y = lat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * aa)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * aa)
  let lngs = z * Math.cos(theta) + 0.0065
  let lats = z * Math.sin(theta) + 0.006
  return {
    lng: lngs,
    lat: lats
  }
}
// BD-09(百度) 坐标转换成  GCJ-02(火星，高德)
function decrptMaps (lng, lat) {
  let res = 3.14159265358979324 * 3000.0 / 180.0
  let x = lng - 0.0065
  let y = lat - 0.006
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * res)
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * res)
  let lngs = z * Math.cos(theta)
  let lats = z * Math.sin(theta)
  return {
    longitude: lngs,
    latitude: lats
  }
}

function query (data) {
  console.log('888', data)
  let storeCity = new Array(26)
  const words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  words.forEach((item, index) => {
    storeCity[index] = {
      title: item,
      item: []
    }
  })
  console.log('999', storeCity)
  data.forEach((item) => {
    let key = item.firstPY.toUpperCase()
    let index = words.indexOf(key)
    storeCity[index].item.push({
      userid: item.userid,
      mobile: item.mobile,
      name: item.name,
      key
    })
  })
  return storeCity
}

export default {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay,
  checkPhone,
  idCode,
  isName,
  isCarName,
  tsFormatTime,
  setTmsTime,
  setBillList,
  yearDate,
  format,
  qqMapTransBMap,
  decrptMaps,
  query
}
