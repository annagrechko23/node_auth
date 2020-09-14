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
    // setNewPost(state, data) {
    //   console.log(state)
    //   state.allPosts = state.allPosts.results.push(data)
    // },
    setSinglePost(state, data) {
      state.singlePost = data
    },
  },

  actions: {
    async getAllPosts({ commit }, params) {
      const { data } = await client.get(`/blog?limit=${params.limit}&skip=${params.skip}`)
      commit('setPosts', data)
    },
    async getSinglePost({ commit }, id) {
      const { data } = await client.get(`/blog/${id}`)
      commit('setSinglePost', data)
    },
    async searchPost({ commit }, params) {
      const { data } = await client.get(`/blog?search=${params}`)
      commit('setPosts', data)
    },
    async setPost({ commit }, params) {
      console.log(params)
      const {data} = await client.post('/blog', params)
      // commit('setNewPost', data)
    },
  },
}
