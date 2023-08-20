import { useState } from 'react'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import bookService from '../services/books'
import BookInfoHeader from './BookInfoHeader'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Slider from '@mui/joy/Slider'
import { ModalClose } from '@mui/joy'

const BookInfoModal = ({ book, open, setOpen, setBook }) => {
  const [status, setStatus] = useState(book.status)
  const [page, setPage] = useState(book.currentPage)
  const [startDate, setStartDate] = useState(
    book.startDate ? book.startDate.toString().slice(0, 10) : ''
  )
  const [rating, setRating] = useState(book.rating)
  const [endDate, setEndDate] = useState(
    book.endDate ? book.endDate.toString().slice(0, 10) : ''
  )

  const handleSubmit = async (event) => {
    const bookUpdated = {
      title: book.title,
      apiId: book.apiId,
      author: book.author,
      status: status,
      image: book.image,
      pageCount: book.pageCount,
      currentPage: parseInt(page),
      startDate: startDate,
      endDate: endDate,
      rating: rating,
      user: book.user.id,
    }
    await bookService.update(book.id, bookUpdated).then()
    setBook(bookUpdated.id)
    setOpen(false)
  }

  const handleClose = (event) => {
    setPage(book.currentPage)
    setStatus(book.status)
    setStartDate(book.startDate ? book.startDate.toString().slice(0, 10) : '')
    setEndDate(book.endDate ? book.endDate.toString().slice(0, 10) : '')
    setRating(book.rating)
    setOpen(false)
  }

  const handleSelect = (event, newValue) => {
    setStatus(newValue)
    if (newValue === 'reading') {
      setStartDate(new Date().toISOString().toString().slice(0, 10))
      setEndDate('')
    } else if (newValue === 'planning') {
      setEndDate('')
    } else if (newValue === 'finished') {
      setEndDate(new Date().toISOString().toString().slice(0, 10))
      setPage(book.pageCount)
    }
  }

  const handleDelete = async (event) => {
    await bookService.remove(book.id)
    setBook(page) //to trigger rerender
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog sx={{ width: 500, p: 3, gap: 2 }}>
        <ModalClose
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.surface',
          }}
        />
        <BookInfoHeader book={book} />
        <div className="bookinforow">
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={handleSelect}
              sx={{ width: '215px' }}
            >
              <Option value="reading">Reading</Option>
              <Option value="finished">Finished</Option>
              <Option value="planning">Planning</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Progress</FormLabel>
            <Input
              type="number"
              value={page}
              onChange={({ target }) => setPage(target.value)}
              slotProps={{
                input: {
                  min: 0,
                  max: book.pageCount,
                  step: 1,
                },
              }}
            />
          </FormControl>
        </div>
        <div className="bookinforow">
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              slotProps={{
                input: {
                  max: endDate,
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Finished Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              slotProps={{
                input: {
                  min: startDate,
                  max: new Date().toISOString().toString().slice(0, 10),
                },
              }}
            />
          </FormControl>
        </div>
        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Slider
            value={rating}
            color="neutral"
            onChange={({ target }) => setRating(target.value)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={1}
          />
        </FormControl>
        <div className="bookinfobuttons">
          <Button onClick={handleDelete} color="danger" variant="soft">
            Delete
          </Button>
          <Button variant="soft" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </ModalDialog>
    </Modal>
  )
}

export default BookInfoModal
