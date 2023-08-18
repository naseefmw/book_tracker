import { useState } from 'react'
import './style.css'
import Search from './Search'

const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="navbar">
      <h3>Reading | Finished | Planning</h3>
      <h1>Book Tracker</h1>
      <div className="searchBar">
        <button onClick={() => setModalOpen(true)}>search</button>
        <Search open={modalOpen} setOpen={setModalOpen} />
      </div>
    </div>
  )
}
export default NavBar
