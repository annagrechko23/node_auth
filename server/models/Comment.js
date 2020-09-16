let mongoose = require('mongoose')
let commentSchema = mongoose.Schema({
    username: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  }
})
var Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
