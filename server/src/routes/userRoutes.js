import express from 'express'
import { createUser, getUsers, logIn } from '../controller/userController.js'

const router = express.Router()

// POST /api/users
router.post('/register', createUser)

// GET /api/users
router.get('/', getUsers)

// POST api/users
router.post('/login', logIn)

export default router
