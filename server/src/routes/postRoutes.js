import { createPost, getPosts, getPost, updatePost, deletePost } from '../controller/postController.js'
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkPostOwnershipMiddleware } from '../middleware/checkPostOwnershipMiddleware.js'

const router = express.Router()

// POST /api/posts/:id
router.post('/', authMiddleware, createPost)

// GET /api/posts/
router.get('/', getPosts)

// GET /api/posts/
router.get('/:id', getPost)

// PATCH /api/posts/
router.patch('/:id', authMiddleware, checkPostOwnershipMiddleware, updatePost)

// DELETE /api/posts/
router.delete('/:id', authMiddleware, checkPostOwnershipMiddleware, deletePost)

export default router
