import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { bookService } from '../book'
import pick from '../utils/pick'
import { IOptions } from '../paginate/paginate'
import mongoose from 'mongoose'
import { ApiError } from '../errors'

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role'])
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy'])
  const result = await bookService.queryBooks(filter, options)
  res.send(result)
})

export const getBook = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['bookId'] === 'string') {
    const user = await bookService.getBookById(new mongoose.Types.ObjectId(req.params['bookId']))
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
    }
    res.send(user)
  }
})

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const user = await bookService.createBook(req.body)
  res.status(httpStatus.CREATED).send(user)
})

export const updateBook = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await bookService.updateBookById(new mongoose.Types.ObjectId(req.params['bookId']), req.body)
    res.send(user)
  }
})

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['bookId'] === 'string') {
    await bookService.deleteBookById(new mongoose.Types.ObjectId(req.params['bookId']))
    res.status(httpStatus.NO_CONTENT).send()
  }
})
