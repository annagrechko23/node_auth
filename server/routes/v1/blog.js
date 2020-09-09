import { Router } from 'express'
import authMiddleware from '@middleware/auth'
let albums = require('../../data/albums');
const blogRouter = new Router()

blogRouter.post('/')

blogRouter.get('/', authMiddleware, async (req, res, next) => {
    try {

      res.json(albums)
    } catch (err) {
      next(err);
    }
  });
export default blogRouter