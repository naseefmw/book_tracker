import { useEffect, useState } from 'react'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import bookService from '../services/books'
import BookInfoHeader from './BookInfoHeader'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Slider from '@mui/joy/Slider'

const BookInfoModal = ({ book, open, setOpen, setBook }) => {
  const [status, setStatus] = useState(book.status)
  const [page, setPage] = useState(book.currentPage)
  const [startDate, setStartDate] = useState(
    book.startDate.toString().slice(0, 10)
  )
  const [rating, setRating] = useState(book.rating)
  const [endDate, setEndDate] = useState(book.endDate.toString().slice(0, 10))
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
    setStartDate(book.startDate.toString().slice(0, 10))
    setEndDate(book.endDate.toString().slice(0, 10))
    setRating(book.rating)
    setOpen(false)
  }
  const handleSelect = (event, newValue) => {
    setStatus(newValue)
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog sx={{ width: 800 }}>
        <BookInfoHeader book={book} />

        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={handleSelect}>
              <Option value="reading">Reading</Option>
              <Option value="finished">Finished</Option>
              <Option value="planning">Planning</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>current Page</FormLabel>
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
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Slider
              value={rating}
              onChange={({ target }) => setRating(target.value)}
              valueLabelDisplay="on"
              variant="solid"
              min={0}
              max={10}
              step={1}
            />
          </FormControl>
          <Button>Delete</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default BookInfoModal
