import client from '@client/utils/axios'

export default {
  namespaced: true,
  state: {
    allPosts: [],
    singlePost: null,
  },
  mutations: {
    setPosts(state, data) {
      state.allPosts = data
    },
  },

  actions: {
    async getAllPosts({ commit }) {
      const { data } = await client.get('/blog')
      commit('setPosts', data)
    },
  },
}
