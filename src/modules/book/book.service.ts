import httpStatus from 'http-status'
import mongoose from 'mongoose'
import Book from './book.model'
import ApiError from '../errors/ApiError'
import { IOptions, QueryResult } from '../paginate/paginate'
import { UpdateBookBody, IBookDoc } from './book.interfaces'
import { IUser } from '../user/user.interfaces'

export const queryBooks = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const users = await Book.paginate(filter, options)
  return users
}

export const getBookById = async (id: mongoose.Types.ObjectId): Promise<IBookDoc | null> => Book.findById(id)

export const createBook = async (bookBody: IUser): Promise<IBookDoc> => {
  return Book.create(bookBody)
}

export const updateBookById = async (
  bookId: mongoose.Types.ObjectId,
  updateBody: UpdateBookBody
): Promise<IBookDoc | null> => {
  const book = await getBookById(bookId)
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }
  Object.assign(book, updateBody)
  await book.save()
  return book
}

export const deleteBookById = async (bookId: mongoose.Types.ObjectId): Promise<IBookDoc | null> => {
  const book = await getBookById(bookId)
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }
  await book.remove()
  return book
}
