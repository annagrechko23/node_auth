import Blog from '@models/Blog'
let mongoose = require('mongoose')

const allBlogPost = async (req, res) => {
  try {
    let posts = await Blog.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createPost = async (req, res) => {
  try {
    const post = new Blog({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author,
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
    const id = req.params.id
    const result = await Blog.findOneAndUpdate(id, req.body, { new: true })
    console.log(req.body, result)
    res.status(200).json(result)
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

export default {
  createPost,
  allBlogPost,
  deletePost,
  editPost,
  getPost,
}
