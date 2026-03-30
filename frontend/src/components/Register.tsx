import { useState } from 'react'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.MouseEvent<HTMLInputElement>): void {
    event.preventDefault()
    alert('Register: ' + firstName + ' ' + lastName + ' ' + login)
  }

  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="First Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} /><br />
      <input type="text" placeholder="Last Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} /><br />
      <input type="email" placeholder="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /><br />
      <input type="text" placeholder="Login" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
      <input type="submit" value="Register" onClick={handleSubmit} />
      <span>{message}</span><br />
      <span>Already have an account? <a href="/login">Login</a></span>
    </div>
  )
}

export default Register