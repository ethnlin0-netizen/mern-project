import { useState } from 'react'
import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event: React.MouseEvent<HTMLInputElement>): void {
    event.preventDefault()
    auth?.login('faketoken123', 'fakeuserid')
    navigate('/dashboard')
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Login" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
      <input type="submit" value="Login" onClick={handleSubmit} />
      <span>{message}</span><br />
      <span>Don't have an account? <a href="/register">Register</a></span>
    </div>
  )
}

export default Login