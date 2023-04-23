import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import poliMovilUser from './routes/poliMovilUserRoutes.js'
import poliMovilPost from './routes/poliMovilPostRoutes.js'
import { connectDB } from './mongoose.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/api/posts', poliMovilPost)

app.use('/api/users', poliMovilUser)

connectDB({ app })
