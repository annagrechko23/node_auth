<template>
  <div class="my-32">
    <h1 class="text-center text-gray-500">Blog</h1>
   <router-link v-if="auth" :to="{ path: '/new',}" class=" w-full pl-20 box-border lg:flex text-center text-gray-500 text-lg">
      &#43;
    </router-link>
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
        class="w-1/2 px-2 mb-10 box-border lg:flex"
        v-for="post in allPosts.results"
        :key="post._id"
      >
      <router-link :to="{ name: 'post', params: { id: post._id }}" class=" w-full px-2 mb-10 box-border lg:flex">
        <div
          class="h-48 w-1/3 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          :style="{ backgroundImage: 'url(uploads/' + post.images.name + ')' }"
        ></div>
        <div
          class="border-r w-9/12 border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="flex w-full justify-end">
            <div class="text-gray-900 font-bold text-xl mb-2" @click.prevent="removePost(post._id)">&times;</div>
          </div>
          <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2 break-all ">{{post.title}}</div>
            <p class="text-gray-700 text-base break-all ">{{post.content}}</p>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{{post.author}}</p>
              <p class="text-gray-600">{{convertDate(post.created)}}</p>
            </div>
            <div class="flex items-center justify-between" v-if="post.comments.length > 0">
              <img class="w-5 mr-2" src="/comment.svg" alt="comment"><span class="text-sm text-gray-900">{{post.comments.length }}</span>
            </div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
    <paginate
        v-model="page"
        :page-count="total"
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
    page: 1,
    total: 0
  }),
  computed: {
    ...mapState('blog', ['allPosts']),
  },
 async mounted() {
  await  this.getAllPosts({limit: this.limit, page: this.page})
    this.total = Math.ceil(this.allPosts.total/10)
  },
  methods: {
    ...mapActions('blog', ['getAllPosts', 'searchPost', 'deletePost']),
    clickCallback (pageNum){
      this.getAllPosts({limit: this.limit, page: pageNum})
     
    },
    removePost(id) {
      this.deletePost(id);
    },
    convertDate(date) {
      const start = new Date(date)
      let year = start.getFullYear()
      let month = (1 + start.getMonth()).toString().padStart(2, '0')
      let day = start.getDate().toString().padStart(2, '0')
      return month + '/' + day + '/' + year
    },
    searchInBlog: debounce(async function  () {
     await this.searchPost({limit: this.limit, page: this.page, search: this.search} )
       this.page = 1;
        this.total = Math.ceil(this.allPosts.total/10)
    }, 800),
    
  },
}
</script>