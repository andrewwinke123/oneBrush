import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const requestSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Commercial', 'Residential', 'Other'],
    },
   //add photos later^^^
   //add photos later^^^
   //add photos later^^^
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    comments: [commentSchema]
  },
  { timestamps: true }
)

const Request = mongoose.model('request', RequestSchema)

export { Request }