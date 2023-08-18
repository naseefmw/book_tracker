import './style.css'
import BookCard from './BookCard'
const Section = ({ books, setCurrentBook }) => {
  return (
    <div className="reading">
      {books.map((book) => (
        <BookCard key={book.id} book={book} setBook={setCurrentBook} />
      ))}
    </div>
  )
}

export default Section
