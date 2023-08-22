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

afterAll(async () => {
  await mongoose.connection.close()
})
