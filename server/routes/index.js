import { Router } from 'express'
import authRouter from './v1/auth'
import blogRouter from './v1/blog'

const v1Router = new Router()

v1Router.use('/api/v1/auth', authRouter)
v1Router.use('/api/v1/blog', blogRouter)

export default v1Router
