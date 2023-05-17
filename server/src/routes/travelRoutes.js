import express from 'express'
import { addPassengerToTravel, removePassengerFromTravel } from '../controller/travelController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.patch('/:id', authMiddleware, addPassengerToTravel)

router.patch('/remove/:id', authMiddleware, removePassengerFromTravel)
export default router
