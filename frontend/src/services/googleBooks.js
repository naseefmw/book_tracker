import axios from 'axios'
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
const api_key = process.env.GOOGLE_BOOKS_API_KEY

const getBooks = (search) => {
  const request = axios.get(`${baseUrl}q=intitle:${search}`)
  return request.then((response) => response.data)
}
const getDetails = (book_id) => {}

export default { getBooks, getDetails }
