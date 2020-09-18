import Blog from '@models/Blog'
import Comment from '@models/Comment'

const allBlogPost = async (req, res) => {
  try {
    const input = req.query.search || ''
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    const query = {
      $or: [
        { title: new RegExp(input, 'i') },
        { content: new RegExp(input, 'i') },
      ],
    }
    Blog.find(query)
      .sort({ update_at: -1 })
      .skip((page - 1) * limit) //Notice here
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.json(err)
        }
        Blog.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error)
          }
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            results: doc,
          })
        })
      })
  } catch (e) {
    return res.status(500).json(e)
  }
}

const createPost = async (req, res) => {
  try {
    console.log(req)
    let image = req.files.images
    console.log(image.name)
    image.mv('./server/public/uploads/' + image.name)

    const post = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      images: {
        name: image.name,
        mimetype: image.mimetype,
        size: image.size,
      },
    })
    let newPost = await post.save()
    res.status(200).json({ data: newPost })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const deletePost = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Blog.remove({ _id: id })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
const editPost = async (req, res) => {
  try {
    let image = req.files
    const result = req.body
    if (image) {
      image.images.mv('./server/public/uploads/' + image.images.name)
      result.images = {
        name: image.images.name,
        mimetype: image.images.mimetype,
        size: image.images.size,
      }
    }
    const id = req.params.id
    const results = await Blog.findOneAndUpdate(id, result, { new: true })
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
const getPost = async (req, res) => {
  try {
    const id = req.params.id
    let post = await Blog.findById(id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
}
const createComment = async (req, res) => {
  console.log(req.params)

  try {
  const comment = new Comment(req.body);
    // comment.author = req.user._id;
    const id = req.params.id
    let post = await Blog.findById(id)
    post.comments.unshift(comment)
    let newPost = await post.save()
    res.status(200).json(newPost)
  } catch (err) {
    res.status(500).json(err)
  }
}
// CREATE REPLY
const createCommentReplies = async (req, res) => {
  const reply = new Comment(req.body);
  reply.author = req.user._id
  console.log(req.params)
  Blog.findById(req.params._id)
      .then(post => {
          Promise.all([
              reply.save(),
              Comment.findById(req.params.commentId),
          ])
              .then(([reply, comment]) => {
                  comment.comments.unshift(reply._id);

                  return Promise.all([
                      comment.save(),
                  ]);
              })
             
              .catch(console.error);
          // SAVE THE CHANGE TO THE PARENT DOCUMENT
          return post.save();
      })
}
export default {
  createPost,
  allBlogPost,
  deletePost,
  editPost,
  getPost,
  createComment,
  createCommentReplies
}
