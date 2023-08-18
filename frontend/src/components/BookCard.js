import './style.css'
import { useState } from 'react'
import IconButton from '@mui/joy/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import BookInfoModal from './BookInfoModal'

const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="currentBook">
        <img className="bookCover" src={book.image} alt="img" />
        <div className="bookInfo">
          <div className="title">
            <h2>{book.title}</h2>
            <IconButton
              sx={{ '--IconButton-size': '10px', color: 'white' }}
              onClick={() => setOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </div>
          {book.author.map((a) => (
            <h6 key={a}>{a}</h6>
          ))}
          <progress max={book.pageCount} value={book.currentPage} />
        </div>
      </div>
      <BookInfoModal open={open} setOpen={setOpen} book={book} />
    </>
  )
}
export default BookCard
