import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
dotenv.config()

import { connect } from './db/mongodb'

// routes
import imageRouter from './routes/image.routes'
import articleRouter from './routes/article.routes'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/image', imageRouter)
app.use('/article', articleRouter)

app.get('/', (_, res) => {
  res.send('Hello, Express!')
})

app.listen(PORT, () => {
  connect()
  console.log(`Server is running on ${PORT}.`)
})
