import client from '@client/utils/axios'

export default {
  namespaced: true,
  state: {
    allPosts: {},
    singlePost: null,
  },
  mutations: {
    setPosts(state, data) {
      state.allPosts = data
    },
    removePost(state, id) {
      state.allPosts.results = state.allPosts.results.filter(
        (post) => post._id !== id
      )
    },
    setSinglePost(state, data) {
      state.singlePost = data
    },
    updatePost(state, data) {
      console.log(state)
      state.allPosts.results = state.allPosts.results.map((post) => {
        if (post._id === data._id) {
          return data
        } else return post
      })
    },
  },

  actions: {
    async getAllPosts({ commit }, params) {
      const { data } = await client.get(
        `/blog?limit=${params.limit}&page=${params.page}`
      )
      commit('setPosts', data)
    },
    async getSinglePost({ commit }, id) {
      const { data } = await client.get(`/blog/${id}`)
      commit('setSinglePost', data)
    },
    async searchPost({ commit }, params) {
      const { data } = await client.get(
        `/blog?limit=${params.limit}&page=${params.page}&search=${params.search}`
      )
      commit('setPosts', data)
    },
    async deletePost({ commit }, id) {
      await client.delete(`/blog/${id}`)
      commit('removePost', id)
    },
    async setPost({ commit }, formData) {
      await client.post('/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    async editPost({ commit },params) {
      await client.put(`/blog/${params.id}`, params.formData)
    },
    async putComment({ commit },params) {
      console.log(params)
      await client.post(`/blog/${params.id}/comment`, params.data)
    },
  },
}
