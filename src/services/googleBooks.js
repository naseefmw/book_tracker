import axios from 'axios'
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
const api_key = process.env.GOOGLE_BOOKS_API_KEY

const getBooks = (search) => {}
const getDetails = (book_id) => {}

export default { getBooks, getDetails }
