import './style.css'

import BookCard from './BookCard'
const Section = ({ books }) => {
  return (
    <div className="reading">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default Section
