import express from 'express'
import { updateTravel } from '../controller/travelController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.patch('/:id', authMiddleware, updateTravel)

export default router
