<template>
  <div class="my-32">
    <div class="container my-16 w-full mx-auto">
      <div class="max-w-sm mx-auto">
        <h2 class="text-center text-orange-500">Create Post</h2>

        <div class="w-full bg-white shadow-md mt-5 rounded-sm p-12">
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
          <!-- <text-input
            type="file"
            name="image"
            :value="post.images"
            v-model="post.images"
            :error="errors.first('image')"
            v-validate="'required'"
            placeholder="img"
            @input="uploadFile"
          /> -->
          <input type="file" @change="uploadFile">
          <custom-button label="Send" :disabled="loading" :loading="loading" @click="send" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import debounce from 'lodash.debounce'
import formMixin from '@client/mixins/form'

export default {
  mixins: [formMixin],
  data: () => ({
    post: {
      title: '',
      content: '',
      images: null
    },
    model: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState('blog', ['allPosts']),
  },
  mounted() {
  },
  methods: {
    ...mapActions('blog', ['setPost']),
    uploadFile(event) {
      this.post.images = event.target.files[0]
      console.log(event.target.files)
    },
   send() {
     this.$validator.validate().then(async (isValid) => {
        if (!isValid) {
          return
        }
        this.toggleLoading()
        this.post.author = this.user.name
        await this.setPost(this.post)
        this.toggleLoading()
        this.$router.push('/')
     })
   }
  },
}
</script>