/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor () {
    this.isLoading = false
  }
  /**
    * 弹出提示框
  */

  static success (title, duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'success',
        mask: true,
        duration: duration
      })
    }, 300)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }
  static getNetworkType (title = '网络提示', content = '网络异常！') {
    wx.getNetworkType({
      success: function (res) {
        // const networkType = res.networkType || 'none'
        if (res.networkType === 'none' || res.networkType === '2g') {
          wx.showModal({ title: title, showCancel: false, content: content })
        }
      }
    })
  }

  static onNetworkStatusChange (title = '网络提示', content = '网络异常！') {
    wx.onNetworkStatusChange(res => {
      if (res.networkType !== '4g' && res.networkType !== 'wifi') {
        wx.showModal({ title: title, showCancel: false, content: content })
      }
    }
    )
  }
  /**
    * 新版本已经准备好，是否重启应用
  */
  static wepyUpdate (title = '更新提示', content = '新版本已经准备好，是否重启应用？') {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady((res) => {
      wx.showModal({
        title: title,
        content: content,
        success: res => {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
      })
    })
  }
  /**
    * 弹出确认窗口
  */
  static confirm (text, title = '提示', payload = {}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }

  /**
    * 普通提示窗口
    * icon有效值：success / loading / none
  */

  static toast (title, icon = 'none') {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: 500
      })
    }, 300)
  }

  /**
    * 弹出加载提示
  */
  static loading (title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  /**
    * 加载完毕
  */
  static loaded () {
    if (Tips.isLoading) {
      Tips.isLoading = false
      wx.hideLoading()
    }
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功')
      }
    }
  }

  static alert (text, title = '提示', payload = {}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false
