import Joi from 'joi'
import { password, objectId } from '../validate/custom.validation'
import { IBook } from './book.interfaces'

export const getBooks = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

export const getBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
}

const createBookBody: Record<keyof IBook, any> = {
  title: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
  authorName: Joi.string().required(),
  authorSurname: Joi.string().required(),
}

export const createBook = {
  body: Joi.object().keys(createBookBody),
}

export const updateBook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
}

export const deleteBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
}
