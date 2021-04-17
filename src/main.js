import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


require('./config/axios');
require('./config/unicons');
require('./config/vuesax');
require('./config/apexcharts');
require('dotenv').config();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')