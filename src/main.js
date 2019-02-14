import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/fonts/iconfont.css'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = Axios

Vue.use(ElementUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
// test