import './style.css'
import { useState, useEffect } from 'react'
import IconButton from '@mui/joy/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import BookInfoModal from './BookInfoModal'

const BookCard = ({ book, setBook }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bookcard">
        <img src={book.image} alt="img" className="bookCover" />

        <div className="bookInfo">
          <div className="title">
            <h2>{book.title}</h2>
            <IconButton
              variant="plain"
              color="warning"
              sx={{ '--IconButton-size': '1px' }}
              onClick={() => setOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </div>
          <div className="author">
            <div>{book.author.join(', ')}</div>
            <div>Rating: {book.rating} / 10</div>
          </div>
          <div className="progress">
            <label>Progress </label>
            <progress max={book.pageCount} value={book.currentPage} />
          </div>
        </div>
      </div>

      <BookInfoModal
        open={open}
        setOpen={setOpen}
        book={book}
        setBook={setBook}
      />
    </>
  )
}
export default BookCard
