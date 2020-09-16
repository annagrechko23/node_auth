import client from '@client/utils/axios'

export default {
  namespaced: true,
  state: {
    initialState: {
      user: null,
      token: null,
    },
    user: null,
    token: null,
  },

  getters: {},

  mutations: {
    setAuth(state, { user, token }) {
      state.user = user
      state.token = token
    },
    unsetAuth(state) {
      state.user = null
      state.token = null
    },
  },

  actions: {
    postRegister({ commit }, payload) {
      const data = client.post('auth/register', payload)
      localStorage.setItem('auth', JSON.stringify(data))
      commit('setAuth', data)
    },
    postLogin({ commit }, data) {
      client.post('auth/login', data)
      localStorage.setItem('auth', JSON.stringify(payload))
      commit('setAuth', payload)
    },
    postForgotPassword(context, data) {
      client.post('auth/passwords/email', data)
    },
    postResetPassword(context, data) {
      client.post('auth/passwords/reset', data)
    },
    postResetPassword(context, data) {
      client.post('auth/passwords/reset', data)
    },
    postConfirmEmail(context, data) {
      client.post('auth/emails/confirm', data)
    },
    postResentConfirmEmail(context, data) {
      client.post('auth/emails/resend', data)
    },
  },
}
