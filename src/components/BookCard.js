import './style.css'

const BookCard = () => {
  return (
    <div className="currentBook">
      <img
        className="bookCover"
        src="https://covers.openlibrary.org/b/id/14362634-L.jpg"
        alt="img"
      />
      <div className="bookInfo">
        <h2>Harry Potter</h2>
        <h6>J K Rowling</h6>
        <progress max="100" value="70">
          70%
        </progress>
      </div>
    </div>
  )
}
export default BookCard
