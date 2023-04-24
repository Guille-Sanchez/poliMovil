import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './mongoose.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/api/posts', postRoutes)

app.use('/api/users', userRoutes)

connectDB({ app })
