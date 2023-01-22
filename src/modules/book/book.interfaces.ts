import { Model, Document } from 'mongoose'
import { QueryResult } from '../paginate/paginate'
import { AccessAndRefreshTokens } from '../token/token.interfaces'

export type BookStatus = 'in'| 'out'

export type BookType = 'fiction' | 'nonFiction'

export interface IBook {
  title: string,
  status: BookStatus,
  type: BookType,
  authorName: string,
  authorSurname: string,
}

export interface IBookDoc extends IBook, Document {
}

export interface IBookModel extends Model<IBookDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>
}

export type UpdateBookBody = Partial<IBook>

export interface IBookWithTokens {
  user: IBookDoc
  tokens: AccessAndRefreshTokens
}
