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
  // category: {
  //   type: String,
  //   required: true,
  // },
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
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})
var Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
