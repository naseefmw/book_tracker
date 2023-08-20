import './style.css'

const BookInfoHeader = ({ book }) => {
  return (
    <div className="bookinfoheader">
      <img src={book.image} alt="book cover" />
      <div className="headertext">
        <h2>{book.title}</h2>
        <h5>{book.author.join(', ')}</h5>
        <p>{book.pageCount} pages</p>
      </div>
    </div>
  )
}

export default BookInfoHeader
