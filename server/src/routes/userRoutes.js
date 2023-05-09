import express from 'express'
import { createUser, getUsers, logIn, updateUser } from '../controller/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST /api/users
router.post('/register', createUser)

// GET /api/users
router.get('/', getUsers)

// POST api/users
router.post('/login', logIn)

// UPDATE api/users
router.patch('/', authMiddleware, updateUser)

export default router
