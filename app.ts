import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

const app = express()
const PORT = 3000
dotenv.config()

// routes
import imageRouter from './routes/image.routes'

app.use(cors())
// app.use(express.json())
app.use('/image', imageRouter)

app.get('/', (_, res) => {
  res.send('Hello, Express!')
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`)
})
