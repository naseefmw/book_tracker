import SectionList from './SectionList'
import bookService from '../services/books'
import googleBooks from '../services/googleBooks'
import { useEffect, useState } from 'react'
import Heading from './Heading'
import './style.css'

const Main = () => {
  const [bookList, setBookList] = useState([])
  const [searchEntry, setSearchEntry] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    bookService.getAll().then((books) => {
      setBookList(books)
    })
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    console.log(searchEntry)
    googleBooks.getBooks(searchEntry).then((books) => {
      console.log(books.items)
    })
  }

  return (
    <div className="background">
      {/*<Heading />*/}
      <SectionList books={bookList} />
    </div>
  )
}

export default Main
