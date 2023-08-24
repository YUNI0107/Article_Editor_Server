import express from 'express'
import Article from '../db/models/Article'

const router = express.Router()

router.route('/upload').post(async (req, res) => {
  const newArticle = new Article(req.body)

  try {
    await newArticle.save()
    res.status(200).json({ result: 'Upload Article Success!' })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.route('/').get(async (_, res) => {
  res.status(200).send({ result: 'test get article.' })
})

export default router
