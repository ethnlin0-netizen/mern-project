import { useState } from 'react'

function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.MouseEvent<HTMLInputElement>): void {
    event.preventDefault()
    alert('Login: ' + login + ' ' + password)
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Login" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
      <input type="submit" value="Login" onClick={handleSubmit} />
      <span>{message}</span>
    </div>
  )
}

export default Login