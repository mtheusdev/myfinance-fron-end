import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/vuelidate'
import '@/plugins/moment'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import { errorHandler } from '@/utils'

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
