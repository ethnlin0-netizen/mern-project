import { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()
    alert('sendResetEmail: ' + email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /><br />
      <input type="submit" value="Send Reset Link" />
      <br />
      <a href="/login">Return to login page</a>
      <br />
      <span>{message}</span>
    </form>
  )
}

export default ForgotPassword