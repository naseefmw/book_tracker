import './style.css'

const BookCard = ({ book }) => {
  return (
    <div className="currentBook">
      <img
        className="bookCover"
        src="https://covers.openlibrary.org/b/id/14362634-L.jpg"
        alt="img"
      />
      <div className="bookInfo">
        <h2>{book.title}</h2>
        <h6>{book.author}</h6>
        <progress max={book.pageCount} value={book.currentPage} />
      </div>
    </div>
  )
}
export default BookCard