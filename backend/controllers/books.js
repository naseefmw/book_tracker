const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', async (request, response) => {
  const books = await Book.find({}).populate('user', { username: 1, name: 1 })
  response.json(books)
})

booksRouter.get('/:id', async (request, response) => {
  const book = await Book.findById(request.params.id)
  if (book) {
    response.json(book)
  } else {
    response.status(404).end()
  }
})

booksRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const book = new Book({
    title: body.title,
    api_id: body.api_id,
    author: body.author,
    status: body.status || 'planning',
    image: body.image,
    pageCount: body.pageCount,
    currentPage: body.currentPage || 0,
    startDate: body.startDate,
    endDate: body.endDate,
    rating: body.rating || 0,
    user: user.id,
  })
  const savedBook = await book.save()
  user.books = user.books.concat(savedBook._id)
  await user.save()
  response.json(savedBook)
})

booksRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const book = await Book.findById(request.params.id)

  if (book.user.toString() === user._id.toString()) {
    await Book.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'invalid user' })
  }
})

booksRouter.put('/:id', async (request, response) => {
  const body = request.body

  const book = Book({
    title: body.title,
    api_id: body.api_id,
    author: body.author,
    status: body.status,
    image: body.image,
    pageCount: body.pageCount,
    currentPage: body.currentPage,
    startDate: body.startDate,
    endDate: body.endDate,
    rating: body.rating,
    user: user.id,
  })
  const updatedBook = await Book.findByIdAndUpdate(request.params.id, book, {
    new: true,
  })
  response.json(updatedBook)
})

module.exports = booksRouter
