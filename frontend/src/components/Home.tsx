import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div id="homeDiv">
      <h2>Welcome to Group Study Hub</h2>
      <p>A place to share and organize study resources with your classmates.</p>
      <button type="button" onClick={() => navigate('/login')}>Login</button>
      <button type="button" onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default Home