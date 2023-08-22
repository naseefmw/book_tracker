const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Book = require('../models/book')
const User = require('../models/user')

let token

beforeEach(async () => {
  await User.deleteMany({})
  await Book.deleteMany({})
  await Book.insertMany(helper.initialBooks)

  const user = {
    username: 'root',
    password: 'password',
  }

  await api.post('/api/users').send(user)
  const result = await api.post('/api/login').send(user)
  token = result.body.token
})

describe('General', () => {
  test('books are returned as json', async () => {
    await api
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all books are returned', async () => {
    const response = await api
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialBooks.length)
  })
})

describe('When new books are added', () => {
  test('a valid book can be added', async () => {
    const newBook = {
      title: 'Hunger Games',
      apiId: 'aaaa',
      author: ['Suzanne Collins'],
      status: 'planning',
      image: 'imglink',
      pageCount: 300,
      currentPage: 0,
      startDate: '',
      endDate: '',
      rating: 0,
    }

    await api
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send(newBook)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const booksAtEnd = await helper.booksInDb()
    expect(booksAtEnd).toHaveLength(helper.initialBooks.length + 1)

    const titles = booksAtEnd.map((n) => n.title)
    expect(titles).toContain('Hunger Games')
  })

  test('a book with multiple authors can be added', async () => {
    const newBook = {
      title: 'This is How You Lose the Time War',
      apiId: 'aaaa',
      author: ['Amal El-Mohtar', 'Max Gladstone'],
      status: 'finished',
      image: 'imglink',
      pageCount: 400,
      currentPage: 400,
      startDate: '',
      endDate: '',
      rating: 0,
    }

    await api
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send(newBook)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const booksAtEnd = await helper.booksInDb()
    expect(booksAtEnd).toHaveLength(helper.initialBooks.length + 1)

    const titles = booksAtEnd.map((n) => n.title)
    expect(titles).toContain('This is How You Lose the Time War')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
