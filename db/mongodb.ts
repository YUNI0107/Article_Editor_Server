import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '')
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongodb connected!')
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongodb disconnected!')
})
