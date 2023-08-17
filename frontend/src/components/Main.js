import SectionList from './SectionList'
import bookService from '../services/books'
import googleBookService from '../services/googleBooks'
import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import './style.css'

const Main = () => {
  const [bookList, setBookList] = useState([])

  useEffect(() => {
    bookService.getAll().then((books) => {
      setBookList(books)
    })
  }, [])

  return (
    <div className="background">
      <NavBar />
      <SectionList books={bookList} />
    </div>
  )
}

export default Main
