import { useState } from 'react'
import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    try {
      const response = await fetch('https://groupstudyhub.xyz/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Login: login, Password: password })
      })
      const data = await response.json()
      if (response.ok) {
        const payload = JSON.parse(atob(data.token.split('.')[1]))
        auth?.login(data.token, payload.userId.toString(), login)
        navigate('/dashboard')
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('Server error, please try again')
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(4px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }} />
      <div className="container-fluid" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="row justify-content-center pt-4">
            <div className="col-12 text-center">
              <h1 style={{ 
                color: '#fbf2c0', 
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                marginBottom: '0'
              }}>
                Group Study Hub
              </h1>
            </div>
          </div>
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-sm" style={{ 
              backgroundColor: 'rgba(72, 57, 42, 0.85)', 
              border: '1px solid #000',
              borderRadius: '12px',
              marginTop: '60px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4" style={{ color: '#fbf2c0', fontFamily: 'Poppins, sans-serif' }}>Login</h2>
                
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={login}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>

                  <div className="mb-3 text-center">
                    <a href="/forgot-password" className="text-decoration-none" style={{ color: '#fbf2c0', fontSize: '0.85rem' }}>
                      Forgot password?
                    </a>
                  </div>

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn w-100"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: 'rgba(67, 40, 28, 0.67)',
                        color: '#fbf2c0',
                        border: '1px solid #000',
                        padding: '10px'
                      }}
                    >
                      Login
                    </button>
                  </div>

                  {message && (
                    <div className="alert alert-danger py-2" role="alert" style={{ backgroundColor: 'rgba(220, 53, 69, 0.8)', color: '#fff', border: 'none' }}>
                      {message}
                    </div>
                  )}

                  <div className="text-center">
                    <span style={{ color: '#fbf2c0', fontSize: '0.85rem' }}>
                      Don't have an account?{' '}
                      <a href="/register" className="text-decoration-none fw-bold" style={{ color: '#fbf2c0' }}>
                        Register
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login