import Vue from 'vue'
import App from './App'
import store from './store/index'
import Tips from './utils/tips'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$tips = Tips
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData
