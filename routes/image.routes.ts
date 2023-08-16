import express from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import multer from 'multer'

const BUCKET = process.env.BUCKET
const REGION = process.env.REGION

const storage = multer.memoryStorage()
const upload = multer({ storage })

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  region: REGION,
})

const router = express.Router()
router.route('/upload').post(upload.single('image'), async (req, res) => {
  const file = req.file
  const key = req.query.key as string

  if (!file) {
    res.status(500).send(JSON.stringify({ result: 'Error: Failed to get the upload file.' }))
    return
  }

  if (!key) {
    res.status(500).send(JSON.stringify({ result: 'Error: Failed to get file name key.' }))
    return
  }

  const params = {
    ACL: 'public-read',
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
  }

  try {
    const result = await s3Client.send(new PutObjectCommand(params))

    res.status(200).send(
      JSON.stringify({
        result: `Successfully uploaded`,
        key: params.Key,
        url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`,
      })
    )
  } catch (err) {
    console.log('Error', err)
    res.status(500).send(JSON.stringify({ result: `Error: ${err}` }))
  }
})

router.route('/').get(async (_, res) => {
  res.status(200).send({ result: 'test get image.' })
})

export default router
