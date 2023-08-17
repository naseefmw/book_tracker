import { useState } from 'react'
import loginService from '../services/login'
import registerService from '../services/register'
import bookService from '../services/books'

const Login = ({ setUser }) => {
  const [newUser, setNewUser] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

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
      setMessage('wrong username or password')
      console.log(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
    } catch (exception) {
      setMessage('Validation error or already exists')
      console.log(message)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      <button onClick={() => setNewUser(true)}>sign up</button>
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
  return <div>{newUser === false ? loginForm() : registerForm()}</div>
}

export default Login
