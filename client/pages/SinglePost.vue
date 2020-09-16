<template>
  <div class="my-32" v-if="singlePost">
    <div class="flex flex-wrap mx-10">
      <div class="w-1/2 px-2 mb-10 mx-auto box-border" v-if="this.editMode">
        <div
          class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <input
            type="file"
            name="file"
            id="input-files"
            @change="uploading"
            class="form-control-file border mb-10"
          />
          <div class="mb-8">
            <text-input
              name="title"
              :value="post.title"
              v-model="post.title"
              v-validate="'required'"
              placeholder="Enter title"
              :error="errors.first('title')"
            />
            <custom-textarea
              :value="post.content"
              v-model="post.content"
              name="content"
              placeholder="Enter content"
              :error="errors.first('content')"
              v-validate="'required'"
            />
            <custom-button label="Send" :disabled="loading" :loading="loading" @click="edit" />
          </div>
        </div>
      </div>
      <div class="w-1/2 px-2 mb-10 mx-auto box-border" v-else>
        <a
          class="text-gray-500 cursor-pointer mb-10 block text-right leading-none"
          @click="editToggle"
          v-if="auth"
        >Edit post</a>

        <img class="w-full" :src="'/uploads/' + singlePost.images.name" alt />
        <div
          class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
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
import debounce from 'lodash.debounce'
import formMixin from '@client/mixins/form'
import upload from '@client/mixins/upload'

export default {
  mixins: [formMixin, upload],

  data: () => ({
    post: {
      title: '',
      content: ''
    },
    editMode: false
  }),
  computed: {
    ...mapState('blog', ['singlePost', 'allPosts']),
  },
  mounted() {
    this.getSinglePost(this.$route.params.id)
  },
  methods: {
    ...mapActions('blog', ['getSinglePost', 'editPost']),
    convertDate(date) {
      const start = new Date(date)
      let year = start.getFullYear()
      let month = (1 + start.getMonth()).toString().padStart(2, '0')
      let day = start.getDate().toString().padStart(2, '0')
      return month + '/' + day + '/' + year
    },
    uploading(event) {
      this.uploadFile(event)
    },
    editToggle() {
      this.editMode = !this.editMode
      this.post.title = this.singlePost.title
      this.post.content = this.singlePost.content
    },
    edit() {
      this.$validator.validate().then(async (isValid) => {
        if (!isValid) {
          return
        }
        this.toggleLoading()
        if(!this.formData) {
           this.formData = new FormData()
         
        }
         Object.keys(this.post).forEach((key) =>
            this.formData.append(key, this.post[key])
          )
       await this.editPost({formData: this.formData, id: this.$route.params.id})
        this.toggleLoading()
        this.getSinglePost(this.$route.params.id)
        this.editMode = !this.editMode
      })
    },
  },
}
</script>