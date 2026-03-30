import { useState } from 'react'
import { useParams } from 'react-router-dom'

function ResetPassword() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }
    alert('resetPassword: ' + token)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input type="password" placeholder="New Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
      <input type="password" placeholder="Confirm Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} /><br />
      <input type="submit" value="Reset Password" /> <br />
      <a href="/login">Return to login page</a>
      <span>{message}</span>
    </form>
  )
}

export default ResetPassword