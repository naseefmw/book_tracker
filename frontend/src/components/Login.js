import { useState } from 'react'
import loginService from '../services/login'
import registerService from '../services/register'
import bookService from '../services/books'
import Notification from './Notification'

const Login = ({ setUser }) => {
  const [newUser, setNewUser] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(2)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBookTrackerUser', JSON.stringify(user))

      bookService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setName('')
    } catch (exception) {
      setType(2)
      setMessage('Wrong username or password!')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await registerService.register({
        username,
        password,
        name,
      })
      setUsername('')
      setPassword('')
      setName('')
      setNewUser(false)
      setType(0)
      setMessage('Username successfully registered!')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setType(2)
      if (error.response.data.error.includes('allowed length (3)')) {
        setMessage('Username is too short! Must have at least 3 characters')
      } else if (error.response.data.error.includes('password length')) {
        setMessage('Password is too short! Must have at least 8 characters')
      } else if (error.response.data.error.includes('unique')) {
        setType(1)
        setMessage('Username already exists')
      } else {
        setMessage(error.response.data.error)
      }

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      username:
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      password:
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit">login</button>
      <button
        onClick={() => {
          setNewUser(true)
          setUsername('')
          setPassword('')
        }}
      >
        sign up
      </button>
    </form>
  )

  const registerForm = () => (
    <form onSubmit={handleRegister}>
      name:
      <input
        type="text"
        value={name}
        name="Name"
        onChange={({ target }) => setName(target.value)}
      />
      <br />
      username:
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      password:
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit">register</button>
    </form>
  )
  return (
    <div>
      <Notification message={message} type={type} />
      {newUser === false ? loginForm() : registerForm()}
    </div>
  )
}

export default Login
