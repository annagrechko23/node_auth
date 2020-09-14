<template>
  <div class="my-32">
    <h1 class="text-center text-gray-500">Blog</h1>
    <text-input
      :value="search"
      v-model="search"
      customClass="mr-12 ml-auto block mb-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Search"
      @input="searchInBlog"
    />
    <div class="flex flex-wrap mx-10">
      <div
        class="w-1/3 px-2 mb-10 box-border lg:flex"
        v-for="post in allPosts.results"
        :key="post._id"
      >
      <router-link :to="{ name: 'post', params: { id: post._id }}" class=" w-full px-2 mb-10 box-border lg:flex">
        <div
          class="h-48 w-1/3 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          :style="{ backgroundImage: 'url(' + post.image + ')' }"
        ></div>
        <div
          class="border-r w-9/12 border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2">{{post.title}}</div>
            <p class="text-gray-700 text-base">{{post.content}}</p>
          </div>
          <div class="flex items-center">
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{{post.author}}</p>
              <p class="text-gray-600">{{convertDate(post.created)}}</p>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      
    </div>
    <paginate
        :page-count="allPosts.total/10"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'">
      </paginate>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import debounce from "lodash.debounce"
export default {
  data: () => ({
    search: '',
    limit: 10,
    skip: 0
  }),
  computed: {
    ...mapState('blog', ['allPosts']),
  },
  mounted() {
    this.getAllPosts({limit: this.limit, skip: this.skip})
  },
  methods: {
    ...mapActions('blog', ['getAllPosts', 'searchPost']),
    clickCallback (pageNum){
      this.getAllPosts({limit: this.limit, skip: (pageNum * this.limit)})
    },
    convertDate(date) {
      const start = new Date(date)
      let year = start.getFullYear()
      let month = (1 + start.getMonth()).toString().padStart(2, '0')
      let day = start.getDate().toString().padStart(2, '0')
      return month + '/' + day + '/' + year
    },
    searchInBlog: debounce(function() {
      this.searchPost(this.search)
    }, 800),
    
  },
}
</script>