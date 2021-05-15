import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from './plugins/firebase.plugin'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueQriously from 'vue-qriously'

Vue.config.productionTip = false

Vue.use(firebase)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDFXKA5uSSQqeY7R9XguoyE-syoagnEeT4',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
  installComponents: true
})
Vue.use(VueQriously)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
