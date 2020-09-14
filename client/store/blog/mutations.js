import { ALL_POSTS } from './actions'

export default {
  [ALL_POSTS](state, data) {
    state.allPosts = data
  },
}
