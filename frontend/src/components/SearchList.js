import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'

const SearchList = ({ results }) => {
  return (
    <List>
      {!results ? (
        <ListItem>
          <ListItemButton onClick={() => alert('You clicked')}>
            No results
          </ListItemButton>
        </ListItem>
      ) : (
        results.map((r) => (
          <ListItem key={r.id}>
            <ListItemButton>{r.volumeInfo.title}</ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  )
}

export default SearchList
