import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueToastr2 from 'vue-toastr-2'

//import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from "bootstrap-vue";

//Vue.use(BootstrapVue)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);

import 'jquery/src/jquery.js'
import 'popper.js/dist/popper.min.js'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-toastr-2/dist/vue-toastr-2.min.css';

Vue.config.productionTip = false

window.toastr = require('toastr');
Vue.use(VueToastr2);

new Vue({
  router,
  render: h => h(App)
  //render: function (h) { return h(App) }
}).$mount('#app')
