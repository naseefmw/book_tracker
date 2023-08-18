import bookService from '../services/books'
import { useEffect, useState } from 'react'
import './style.css'
import Search from './Search'
import Section from './Section'

const Main = () => {
  const [bookList, setBookList] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    bookService.getAll().then((books) => {
      setBookList(books)
    })
  }, [modalOpen])

  return (
    //NavBar and BookList
    <div className="background">
      <div className="navbar">
        <h3>Reading | Finished | Planning</h3>
        <h1>Book Tracker</h1>
        <div className="searchBar">
          <button onClick={() => setModalOpen(true)}>search</button>
          <Search open={modalOpen} setOpen={setModalOpen} />
        </div>
      </div>
      <h2>Currently Reading</h2>
      <Section books={bookList.filter((book) => book.status === 'reading')} />
      <h2>Finished</h2>
      <Section books={bookList.filter((book) => book.status === 'finished')} />
      <h2>Planning</h2>
      <Section books={bookList.filter((book) => book.status === 'planning')} />
    </div>
  )
}

export default Main
