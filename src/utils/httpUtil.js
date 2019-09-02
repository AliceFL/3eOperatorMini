// import Fly from 'flyio/dist/npm/wx'
// 'flyio'(与axios、fentch对比 https://wendux.github.io/dist/#/doc/flyio/compare)
const Fly = require('flyio/dist/npm/wx') // npm引入方式

const request = new Fly()

// 配置基础项
// request.config.timeout = 10000 // 超时
request.config.baseURL = 'https://www.3elogistics.cn/' // 基地址,配置在一个文件中。
request.config.params = {} // 设置公共参数
request.config.headers = {'Content-Type': 'application/json'} // 公共请求头

request.interceptors.request.use((request) => {
  wx.showLoading({ title: '加载中..' })
  wx.showNavigationBarLoading() // 显示导航条加载动画。
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    console.log(err.status)
    wx.hideLoading()
    return promise.resolve()
  }
)

export default request
