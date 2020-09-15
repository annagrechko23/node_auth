import Blog from '@models/Blog'
import path from 'path'

const allBlogPost = async (req, res) => {
  try {
    const input = req.query.search || ''; 
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1
    const query = {$or:[{title: new RegExp(input, "i")}, {content: new RegExp(input, "i")}]} ;
    Blog.find(query)
    .sort({ update_at: -1 })
    .skip((page-1) * limit) //Notice here
    .limit(limit)
    .exec((err, doc) => {
      if (err) {
        return res.json(err);
      }
      Blog.countDocuments(query).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        return res.json({
          total: count,
          page: page,
          pageSize: doc.length,
          results: doc
        });
      });
    });
  } catch(e){
    return res.status(500).json(e)
  }
}

const createPost = async (req, res) => {
  try {
    console.log(req)
    let image = req.files.images;
            console.log(image.name)
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    image.mv( './server/public/uploads/' + image.name);

    const post = new Blog({
      title: req.body.title,
      content: req.body.content,
      // category: req.body.category,
      author: req.body.author,
      images: {
        name: image.name,
        mimetype: image.mimetype,
        size: image.size
        }
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
