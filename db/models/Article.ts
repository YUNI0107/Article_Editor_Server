import mongoose from 'mongoose'

const Article = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    schemas: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Article', Article)
