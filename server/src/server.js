import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './mongoose.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import travelRoutes from './routes/travelRoutes.js'
import compression from 'compression'

const app = express()
dotenv.config()
app.use(compression())
app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/api/posts', postRoutes)

app.use('/api/users', userRoutes)

app.use('/api/travels', travelRoutes)

connectDB({ app })
