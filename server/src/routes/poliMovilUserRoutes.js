import express from 'express'
import { createPoliMovilUser, getPoliMovilUsers } from '../controller/poliMovilUserController.js'

const router = express.Router()

// POST /api/users
router.post('/register', createPoliMovilUser)
// GET /api/users
router.get('/', getPoliMovilUsers)
export default router
