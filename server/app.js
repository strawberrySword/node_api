import express from 'express'
const app = express()
import mongoose from 'mongoose'
import {} from 'dotenv/config'
import verify from './routes/verifyToken.js'
  
//Import Routes
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'

// middlewares
app.use(express.json())
app.use('/posts', verify, postRoutes)
app.use('/api/user', authRoutes)

//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, () => {console.log('connected to db')})

// server listen
app.listen(process.env.PORT || 3000)    