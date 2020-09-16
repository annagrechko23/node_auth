import { Router } from 'express'
import authMiddleware from '@middleware/auth'
import postController from '@controllers/v1/post.controller'

const blogRouter = new Router()

blogRouter.get('/',  postController.allBlogPost)

blogRouter.post('/', authMiddleware, postController.createPost)

blogRouter.put('/:id', authMiddleware, postController.editPost)

blogRouter.get('/:id',  postController.getPost)

blogRouter.delete('/:id', authMiddleware, postController.deletePost)

export default blogRouter
