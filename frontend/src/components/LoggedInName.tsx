import { useAuth } from '../context/AuthContext.tsx'

function LoggedInName() {
  const auth = useAuth()

  const handleLogout = () => {
    auth?.logout()
    window.location.href = '/login'
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#43281c', borderBottom: '1px solid #000' }}>
      <div className="container text-center py-3">
        <div style={{ color: '#fbf2c0', marginBottom: '12px' }}>
          Welcome, <strong>{auth?.username || 'Student'}</strong>!
        </div>
        <button
        onClick={handleLogout}
        className="btn"
        style={{
          backgroundColor: 'rgba(67, 40, 28, 0.67)',
          color: '#fbf2c0',
          border: '1px solid #000',
          padding: '8px 24px',  
          fontSize: '1rem',      
          width: 'auto',
          minWidth: '120px'     
        }}
      >
        Logout
      </button>
      </div>
    </div>
  )
}

export default LoggedInName