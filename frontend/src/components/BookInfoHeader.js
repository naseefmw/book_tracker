import './style.css'

const BookInfoHeader = ({ book }) => {
  console.log(book)
  return (
    <div className="bookinfoheader">
      <img src={book.image} alt="book cover" />
      <div>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <h5>pages: {book.pageCount}</h5>
      </div>
    </div>
  )
}

export default BookInfoHeader
