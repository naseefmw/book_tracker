const Book = require('../models/book')
const User = require('../models/user')

const initialBooks = [
  {
    title: 'Harry Potter and the Philosophers Stone',
    apiId: 'abcd',
    author: ['J. K. Rowling'],
    status: 'finished',
    image: 'imglink',
    pageCount: 260,
    currentPage: 260,
    startDate: '2022-08-17',
    endDate: '2022-09-20',
    rating: 4,
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    apiId: 'abcdf',
    author: ['J. K. Rowling'],
    status: 'freading',
    image: 'imglink',
    pageCount: 260,
    currentPage: 20,
    startDate: '2021-08-17',
    endDate: '2022-08-20',
    rating: 10,
  },
  {
    title: 'Harry Potter and the Prizoner of Azkaban',
    apiId: 'abscd',
    author: ['J. K. Rowling'],
    status: 'planning',
    image: 'imglink',
    pageCount: 360,
    currentPage: 0,
    startDate: '',
    endDate: '',
    rating: 0,
  },
]

const booksInDb = async () => {
  const books = await Book.find({})
  return books.map((book) => book.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBooks,
  booksInDb,
  usersInDb,
}
