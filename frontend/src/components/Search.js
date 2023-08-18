import googleBooksService from '../services/googleBooks'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Sheet from '@mui/joy/Sheet'
import Input from '@mui/joy/Input'
import { useState } from 'react'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import bookService from '../services/books'

const Search = ({ open, setOpen }) => {
  const [searchEntry, setSearchEntry] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (event) => {
    event.preventDefault()
    if (searchEntry.length > 3) {
      try {
        const results = await googleBooksService.getBooks(searchEntry)
        setSearchResults(results.items)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const addBook = async (volume) => {
    const bookToAdd = {
      title: volume.volumeInfo.title,
      apiId: volume.id,
      author: volume.volumeInfo.authors,
      status: 'planning',
      image: volume.volumeInfo.imageLinks.smallThumbnail,
      pageCount: volume.volumeInfo.pageCount,
      currentPage: 0,
      rating: 0,
    }
    await bookService.create(bookToAdd).then()
    setSearchResults([])
    setOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
          setSearchResults([])
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          mt: 5,
          position: 'fixed',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 800,

            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
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
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search Books..."
              variant="outlined"
              onChange={({ target }) => setSearchEntry(target.value)}
            />
            <button type="submit">search</button>
          </form>

          <List>
            {searchResults.map((r) => (
              <ListItem key={r.id}>
                <>
                  {r.volumeInfo.title}
                  <button onClick={() => addBook(r)}>Add to Planning</button>
                </>
              </ListItem>
            ))}
          </List>
        </Sheet>
      </Modal>
    </>
  )
}
export default Search
