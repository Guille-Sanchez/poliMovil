import express from 'express'
import { addPassangerToTravel, removePassengerFromTravel } from '../controller/travelController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.patch('/:id', authMiddleware, addPassangerToTravel)

router.patch('/remove/:id', authMiddleware, removePassengerFromTravel)
export default router
