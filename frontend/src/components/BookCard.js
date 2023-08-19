import './style.css'
import { useState, useEffect } from 'react'
import IconButton from '@mui/joy/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import BookInfoModal from './BookInfoModal'
import Skeleton from '@mui/joy/Skeleton'
import AspectRatio from '@mui/joy/AspectRatio'

const BookCard = ({ book, setBook }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  })
  return (
    <>
      <div className="currentBook">
        <img src={book.image} alt="img" className="bookCover" />

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
