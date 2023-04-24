import express from 'express'
import { createUser, getUsers } from '../controller/userController.js'

const router = express.Router()

// POST /api/users
router.post('/register', createUser)

// GET /api/users
router.get('/', getUsers)

export default router
