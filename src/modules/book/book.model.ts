import mongoose from 'mongoose'
import toJSON from '../toJSON/toJSON'
import paginate from '../paginate/paginate'
import { IBookDoc, IBookModel } from './book.interfaces'

const bookSchema = new mongoose.Schema<IBookDoc, IBookModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    authorSurname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON)
bookSchema.plugin(paginate)

bookSchema.pre('save', async function (next) {
  next()
})

const Book = mongoose.model<IBookDoc, IBookModel>('Book', bookSchema)

export default Book
