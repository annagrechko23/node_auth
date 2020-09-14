import Vue from 'vue'
import './styles/main.css'
import store from './store'
import router from './routes'
import Router from 'vue-router'
import Main from './pages/Main.vue'
import Validator from 'vee-validate'
import Button from '@components/Button.vue'
import Loader from '@components/Loader.vue'
import authMixin from '@client/mixins/auth'
import flashMixin from '@client/mixins/flash'
import TextInput from '@components/TextInput.vue'
import Textarea from '@components/Textarea.vue'
import Paginate from 'vuejs-paginate'

Vue.use(Router)
Vue.use(Validator)
Vue.mixin(authMixin)
Vue.mixin(flashMixin)
Vue.component('custom-button', Button)
Vue.component('loader', Loader)
Vue.component('text-input', TextInput)
Vue.component('custom-textarea', Textarea)
Vue.component('paginate', Paginate)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Main),
})
