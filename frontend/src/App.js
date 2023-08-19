import Main from './components/Main'
import Login from './components/Login'
import bookService from './services/books'
import { useState, useEffect } from 'react'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookTrackerUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      bookService.setToken(user.token)
    }
  }, [])

  return (
    <>
      {user === null ? <Login setUser={setUser} /> : <Main setUser={setUser} />}
    </>
  )
}
export default App
