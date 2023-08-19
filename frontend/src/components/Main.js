import bookService from '../services/books'
import { useEffect, useState } from 'react'
import './style.css'
import Search from './Search'
import Section from './Section'

const Main = ({ setUser }) => {
  const [bookList, setBookList] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  //to trigger rerender
  const [currentBook, setCurrentBook] = useState(null)

  useEffect(() => {
    bookService.getAll().then((books) => {
      setBookList(books)
      setCurrentBook(null)
    })
  }, [modalOpen, currentBook])

  const handleLogout = (event) => {
    window.localStorage.clear()
    setUser(null)
  }
  return (
    //NavBar and BookList
    <div className="background">
      <div className="navbar">
        <h3>
          <a href="#reading">Reading</a> | <a href="#finished">Finished</a> |
          <a href="#planning">Planning</a>
        </h3>
        <h1>Book Tracker</h1>
        <div className="searchBar">
          <button onClick={() => setModalOpen(true)}>search</button>
          <Search open={modalOpen} setOpen={setModalOpen} bookList={bookList} />
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <h2 id="reading">Currently Reading</h2>
      <Section
        books={bookList.filter((book) => book.status === 'reading')}
        setCurrentBook={setCurrentBook}
      />
      <h2 id="finished">Finished</h2>
      <Section
        books={bookList.filter((book) => book.status === 'finished')}
        setCurrentBook={setCurrentBook}
      />
      <h2 id="planning">Planning</h2>
      <Section
        books={bookList.filter((book) => book.status === 'planning')}
        setCurrentBook={setCurrentBook}
      />
    </div>
  )
}

export default Main
