import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
