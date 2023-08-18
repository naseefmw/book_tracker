import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import bookService from '../services/books'

const SearchList = ({ results }) => {
  const addBook = (volume) => {
    console.log(volume)
    const bookToAdd = {
      title: volume.volumeInfo.title,
      apiId: volume.id,
      author: volume.volumeInfo.authors,
      status: 'planning',
      image: volume.volumeInfo.imageLinks.smallThumbnail,
      pageCount: volume.volumeInfo.pageCount,
      currentPage: 0,
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      rating: 0,
    }
    console.log(bookToAdd)
    bookService.create(bookToAdd).then()
  }

  return (
    <List>
      {results.map((r) => (
        <ListItem key={r.id}>
          <>
            {r.volumeInfo.title}
            <button onClick={() => addBook(r)}>Add to Planning</button>
          </>
        </ListItem>
      ))}
    </List>
  )
}

export default SearchList
