import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'

function LoggedInName() {
  const auth = useAuth()
  const navigate = useNavigate()

  function doLogout(event: any): void {
    event.preventDefault()
    auth?.logout()
    navigate('/login')
  }

  return (
    <div id="loggedInDiv">
      <span id="userName">Logged In As John Doe</span><br />
      <button type="button" onClick={doLogout}>Log Out</button>
    </div>
  )
}

export default LoggedInName