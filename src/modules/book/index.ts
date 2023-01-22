import * as bookController from './book.controller'
import auth from './book.middleware'
import * as bookService from './book.service'
import * as bookValidation from './book.validation'

export { bookController, auth, bookService, bookValidation }
