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
          />-->

          <form class="mt-4" action="/upload" method="POST" enctype="multipart/form-data">
            <div class="form-group">
              <input
                type="file"
                name="file"
                id="input-files"
                @change="uploadFile"
                class="form-control-file border"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
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
    },
    model: {
      email: '',
      password: '',
    },
    formData: null,
  }),
  computed: {
    ...mapState('blog', ['allPosts']),
  },
  mounted() {},
  methods: {
    ...mapActions('blog', ['setPost']),
    uploadFile(event) {
      let files = event.target.files[0]
      let name = event.target.name
      let formData = new FormData()

      formData.append('images', files)
      this.$set(this, 'formData', formData)
    },
    send() {
      this.$validator.validate().then(async (isValid) => {
        if (!isValid) {
          return
        }
        this.toggleLoading()
        this.post.author = this.user.name
        Object.keys(this.post).forEach((key) =>
          this.formData.append(key, this.post[key])
        )
        await this.setPost(this.formData)
        this.toggleLoading()
        this.$router.push('/')
      })
    },
  },
}
</script>