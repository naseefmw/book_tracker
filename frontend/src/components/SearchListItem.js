import ListItem from '@mui/joy/ListItem'
import { Button } from '@mui/joy'

const SearchListItem = ({ book, handle }) => {
  return (
    <ListItem>
      <div className="listitem">
        <div className="listdetails">
          <div> {book.volumeInfo.title} </div>
          <div className="listsubtext">
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.join(', ')
              : null}
          </div>
          <div className="listsubtext">
            {book.volumeInfo.publishedDate
              ? book.volumeInfo.publishedDate.slice(0, 4)
              : null}
          </div>
        </div>

        <Button
          variant="plain"
          color="neutral"
          size="sm"
          onClick={() => handle(book)}
        >
          Add to Planning
        </Button>
      </div>
    </ListItem>
  )
}

export default SearchListItem
