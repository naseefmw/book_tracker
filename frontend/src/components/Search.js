import googleBooksService from '../services/googleBooks'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import Input from '@mui/joy/Input'
import { useState } from 'react'
import SearchList from './SearchList'

const Search = ({ open, setOpen }) => {
  const [searchEntry, setSearchEntry] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (event) => {
    if (searchEntry.length > 3) {
      try {
        const results = await googleBooksService.getBooks(searchEntry)
        setSearchResults(results.items)
      } catch (exception) {
        console.log(exception)
      }
    }
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
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            <Input
              placeholder="Search Books..."
              variant="outlined"
              onChange={({ target }) => setSearchEntry(target.value)}
            />
            <button onClick={handleSearch}>search</button>
          </Typography>

          <SearchList results={searchResults} />
        </Sheet>
      </Modal>
    </>
  )
}
export default Search
