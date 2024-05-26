import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入组件库
import '@/utils/vant-ui.js'
// 导入公共样式
import '@/style/common.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
