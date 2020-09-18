let mongoose = require('mongoose')
let blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  images: {
    type: Object,
    required: false,
  },
  comments: [{ type: Object, ref: 'Comment' }],
})

var Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog
