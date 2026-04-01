import { useState } from 'react'
import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: React.MouseEvent<HTMLInputElement>): Promise<void> {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Login: login, Password: password })
      })
      const data = await response.json()
      if (response.ok) {
        auth?.login(data.token, data.token, login)
        navigate('/dashboard')
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('Server error, please try again')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Login" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
      <a href="/forgot-password">Forgot your password?</a><br />
      <input type="submit" value="Login" onClick={handleSubmit} />
      <span>{message}</span><br />
      <span>Don't have an account? <a href="/register">Register</a></span>
    </div>
  )
}

export default Login