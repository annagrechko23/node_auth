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
    removePost(state, id) {
      console.log(state.allPosts)
      state.allPosts.results = state.allPosts.results.filter(post => post._id !== id)
    },
    setSinglePost(state, data) {
      state.singlePost = data
    },
  },

  actions: {
    async getAllPosts({ commit }, params) {
      const { data } = await client.get(`/blog?limit=${params.limit}&page=${params.page}`)
      commit('setPosts', data)
    },
    async getSinglePost({ commit }, id) {
      const { data } = await client.get(`/blog/${id}`)
      commit('setSinglePost', data)
    },
    async searchPost({ commit }, params) {
      const { data } = await client.get(`/blog?limit=${params.limit}&page=${params.page}&search=${params.search}`)
      commit('setPosts', data)
    },
    async deletePost({ commit }, id) {
      await client.delete(`/blog/${id}`)
      commit('removePost', id)
    },
    async setPost({ commit }, formData) {
      console.log(formData)
      await client.post('/blog', formData,
      {
      headers: {
          'Content-Type': 'multipart/form-data'
      }})
      // commit('setNewPost', data)
    },
  },
}
