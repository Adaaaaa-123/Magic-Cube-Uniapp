import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import util from '@/common/util.js'
Vue.prototype.$util = util

Vue.config.productionTip = false
App.mpType = 'app'
import "./static/font/iconfont.ttf";
import "./static/font/iconfont.css";
// import './static/style.css';
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif