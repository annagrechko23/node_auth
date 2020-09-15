<template>
  <div class="my-32" v-if="singlePost">
    <div class="flex flex-wrap mx-10">
      <div
        class="w-1/2 px-2 mb-10 mx-auto box-border"
      >
        <img class="w-full" :src="'/uploads/' + singlePost.images.name" alt="">
        <div
          class="border-r  border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-8">
                <h1 class="text-center text-gray-500">{{singlePost.title}}</h1>

            <p class="text-gray-700 text-base">{{singlePost.content}}</p>
          </div>
          <div class="flex items-center">
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{{singlePost.author}}</p>
              <p class="text-gray-600">{{convertDate(singlePost.created)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import debounce from "lodash.debounce"
export default {
  data: () => ({
    post: {},
  }),
  computed: {
    ...mapState('blog', ['singlePost']),
  },
  mounted() {
    this.getSinglePost(this.$route.params.id)
  },
  methods: {
    ...mapActions('blog', ['getSinglePost']),
    convertDate(date) {
      const start = new Date(date)
      let year = start.getFullYear()
      let month = (1 + start.getMonth()).toString().padStart(2, '0')
      let day = start.getDate().toString().padStart(2, '0')
      return month + '/' + day + '/' + year
    },
  },
}
</script>