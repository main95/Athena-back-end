import express, { Router } from 'express'
import { validate } from '../../modules/validate'
import { bookValidation, bookController } from '../../modules/book'

const router: Router = express.Router()

router.get('/getBooks', validate(bookValidation.getBooks), bookController.getBooks)
router.get('/getBook/:bookId', validate(bookValidation.getBook), bookController.getBook)
router.post('/manageBook', validate(bookValidation.createBook), bookController.createBook)
router.put('/manageBook', validate(bookValidation.updateBook), bookController.updateBook)
router.delete('/manageBook/:bookId', validate(bookValidation.deleteBook), bookController.deleteBook)

export default router
