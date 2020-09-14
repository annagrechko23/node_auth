import client from '@client/utils/axios'

export const ALL_POSTS = 'ALL_POSTS'

export default {
  [ALL_POSTS]: (context) => client.get(`/blog?`),
}
