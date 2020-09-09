import Vue from 'vue'
import './styles/main.css'

import Router from 'vue-router'
import router from './routes'
import Main from './pages/Main.vue'
import Validator from 'vee-validate'
import TextInput from '@components/TextInput.vue'
import store from './store'

Vue.use(Router)
Vue.use(Validator)
Vue.component('text-input', TextInput)
const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
  })