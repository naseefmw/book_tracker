import { useState } from 'react'
import loginService from '../services/login'
import registerService from '../services/register'
import bookService from '../services/books'
import Notification from './Notification'
import Input from '@mui/joy/Input'
import loginImage from '../assets/pic1.svg'
import Button from '@mui/joy/Button'

import './style.css'

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
    <div className="loginformdiv">
      <h1 className="logo">Read Sync</h1>
      <form onSubmit={handleLogin}>
        <Notification message={message} type={type} />
        <h1>Sign in</h1>
        <div className="lightText">
          Welcome back! Please enter your details.
        </div>
        Username
        <Input
          type="text"
          placeholder="Username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        Password
        <Input
          type="password"
          placeholder="Password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">Sign in</Button>
        <div className="lightText">
          Don't have account?
          <Button
            variant="plain"
            size="sm"
            onClick={() => {
              setNewUser(true)
              setUsername('')
              setPassword('')
            }}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  )

  const registerForm = () => (
    <div className="loginformdiv">
      <h1 className="logo">Read Sync</h1>
      <form onSubmit={handleRegister}>
        <Notification message={message} type={type} />
        <h1>Sign up</h1>
        Name
        <Input
          type="text"
          placeholder="Username"
          value={name}
          name="Name"
          onChange={({ target }) => setName(target.value)}
        />
        Username
        <Input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        Password
        <Input
          type="password"
          placeholder="Password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">Sign up</Button>
        <div className="lightText">
          Already have an account?
          <Button
            variant="plain"
            size="sm"
            onClick={() => {
              setNewUser(false)
              setUsername('')
              setPassword('')
              setName('')
            }}
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
  return (
    <div className="loginRoot">
      <img src={loginImage} alt="img" />

      <div className="login">
        {newUser === false ? loginForm() : registerForm()}
      </div>
    </div>
  )
}

export default Login
