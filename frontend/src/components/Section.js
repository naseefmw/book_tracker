import './style.css'
import BookCard from './BookCard'
const Section = ({ books, setCurrentBook }) => {
  return (
    <div className="section">
      {books.map((book) => (
        <BookCard key={book.id} book={book} setBook={setCurrentBook} />
      ))}
      {books.length === 0 ? <p>No Books added</p> : null}
    </div>
  )
}

export default Section
