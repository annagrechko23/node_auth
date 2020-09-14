import { Router } from 'express'
import authMiddleware from '@middleware/auth'
import upload from '@middleware/upload'
import postController from '@controllers/v1/post.controller'

const blogRouter = new Router()

blogRouter.get('/', authMiddleware, postController.allBlogPost)

blogRouter.post('/', upload.array('images',5), authMiddleware, postController.createPost)

blogRouter.put('/:id', authMiddleware, postController.editPost)

blogRouter.get('/:id', authMiddleware, postController.getPost)

blogRouter.delete('/:id', authMiddleware, postController.deletePost)

export default blogRouter
