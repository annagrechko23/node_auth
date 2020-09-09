import Vuex from 'vuex'
import Vue from 'vue'
import auth from './auth'
import flash from './flash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    flash
  },
})
