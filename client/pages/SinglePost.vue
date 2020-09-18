<template>
  <div class="my-32" v-if="singlePost">
    <div class="flex flex-wrap mx-10">
      <div class="w-1/2 px-2 mb-10 mx-auto box-border" v-if="this.editMode">
        <div
          class="border-solid border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
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
          class="border-solid border border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
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
          <div class="mt-3">
              <h2 class="mb-5">Create Comment</h2>
              <text-input
                name="name"
                :value="Object.keys(user).length === 0 ? comment.author : user.name"
                v-model="comment.author"
                v-validate="'required'"
                placeholder="Enter name"
                :disabled="Object.keys(user).length === 0"
                :error="errors.first('name')"
              />
              <text-input
                name="comment"
                :value="comment.content"
                v-model="comment.content"
                v-validate="'required'"
                placeholder="Enter comment"
                :error="errors.first('comment')"
              />
              <custom-button
                label="Send"
                :disabled="loading"
                :loading="loading"
                @click="sendComment"
              />
            </div>
          <div class="mt-3" v-if="singlePost.comments.length > 0">
            <h2>Comments({{singlePost.comments.length}})</h2>
            <div class="flex" v-for="comment in singlePost.comments"
              :key="comment._id">
               <img class="w-10 mr-2" src="/user.svg" alt="comment">
                <div
              
              class="ml-10 mt-3 text-sm"
            >
              <p class="text-gray-900 mb-5">{{comment.author}}</p>
              <p class="text-gray-600 mb-5">{{comment.content}}</p>
            </div>
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
      content: '',
    },
    comment: {
      author: '',
      content: '',
    },
    editMode: false,
  }),
  computed: {
    ...mapState('blog', ['singlePost', 'allPosts']),
  },
  mounted() {
    this.getSinglePost(this.$route.params.id)
  },
  methods: {
    ...mapActions('blog', ['getSinglePost', 'editPost', 'putComment']),
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
        if (!this.formData) {
          this.formData = new FormData()
        }
        Object.keys(this.post).forEach((key) =>
          this.formData.append(key, this.post[key])
        )
        await this.editPost({
          formData: this.formData,
          id: this.$route.params.id,
        })
        this.toggleLoading()
        this.getSinglePost(this.$route.params.id)
        this.editMode = !this.editMode
      })
    },
    sendComment() {
      this.$validator.validate().then(async (isValid) => {
        if (!isValid) {
          return
        }
        this.toggleLoading()

        await this.putComment({ data: this.comment, id: this.$route.params.id })
        this.comment = {
          username: '',
          content: '',
        };
        this.toggleLoading()

        this.getSinglePost(this.$route.params.id)
      })
    },
  },
}
</script>