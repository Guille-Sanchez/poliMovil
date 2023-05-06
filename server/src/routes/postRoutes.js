import { createPost, getPosts, updatePost } from '../controller/postController.js'
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkPostOwnershipMiddleware } from '../middleware/checkPostOwnershipMiddleware.js'

const router = express.Router()

// POST /api/posts/:id
router.post('/:id', createPost)

// GET /api/posts/
router.get('/', getPosts)

// GET /api/posts/
router.get('/:id', getPosts)

// GET /api/posts/
router.patch('/:id', authMiddleware, checkPostOwnershipMiddleware, updatePost)

export default router
