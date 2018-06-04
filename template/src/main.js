{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import { AjaxPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin } from 'k12vux'
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})

if (process.env.NODE_ENV !== 'production') {
  /* 开发环境 */
  console.log('Vux中的Vue.http依赖于axios')
} else {
  /* 生产环境 */
  /* 去除移动端点击300ms延迟 */
  const FastClick = require('fastclick')
  FastClick.attach(document.body)
}
