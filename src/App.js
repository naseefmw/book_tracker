import Heading from './components/Heading'
import SectionList from './components/SectionList'
import './App.css'
import { useState, useEffect } from 'react'
import bookService from './services/books'

const App = () => {
  const [bookList, setBookList] = useState([])

  useEffect(() => {
    bookService.getAll().then((initialBooks) => {
      setBookList(initialBooks)
    })
  }, [])
  return (
    <div className="background">
      <Heading />
      <SectionList books={bookList} />
    </div>
  )
}
export default App
