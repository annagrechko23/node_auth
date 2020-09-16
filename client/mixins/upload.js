export default {
  data: () => ({
    formData: null,
  }),

  methods: {
    uploadFile(event) {
      let files = event.target.files[0]
      let formData = new FormData()

      formData.append('images', files)
      this.$set(this, 'formData', formData)
    },
  },
}
