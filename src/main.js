import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import {Input,Dialog} from 'element-ui'

Vue.use(Input)
Vue.use(Dialog)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
