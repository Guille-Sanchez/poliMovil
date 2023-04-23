import { createPost, getPosts } from '../controller/poliMovilPostController.js'
import express from 'express'

const router = express.Router()

// POST /api/posts/:id
router.post('/:id', createPost)

// GET /api/posts/
router.get('/', getPosts)

export default router
