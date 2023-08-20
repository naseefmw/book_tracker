import googleBooksService from '../services/googleBooks'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Sheet from '@mui/joy/Sheet'
import Input from '@mui/joy/Input'
import { useState } from 'react'
import List from '@mui/joy/List'
import bookService from '../services/books'
import { IconButton } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search'
import SearchListItem from './SearchListItem'
import ListDivider from '@mui/joy/ListDivider'

const Search = ({ open, setOpen, bookList }) => {
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
    const booksAdded = bookList.map((b) => b.apiId)
    if (booksAdded.includes(volume.id)) {
      console.log('doop')
      return
    }
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
          overflowY: 'scroll',
          px: 1.5,
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
              mt: 0.8,
              mr: 1,
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.surface',
            }}
          />
          <form onSubmit={handleSearch} className="searchbar">
            <Input
              fullWidth
              placeholder="Search Books..."
              variant="outlined"
              onChange={({ target }) => setSearchEntry(target.value)}
            />
            <IconButton type="submit" variant="plain">
              <SearchIcon />
            </IconButton>
          </form>

          <List>
            {searchResults.map((r) => (
              <>
                <SearchListItem key={r.id} book={r} handle={addBook} />
                <ListDivider inset="gutter" />
              </>
            ))}
          </List>
        </Sheet>
      </Modal>
    </>
  )
}
export default Search
