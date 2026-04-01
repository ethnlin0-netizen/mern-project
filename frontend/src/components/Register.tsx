import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('error')
  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters')
      setMessageType('error')
      return
    }
    if (!/[A-Z]/.test(password)) {
      setMessage('Password must contain at least one uppercase letter')
      setMessageType('error')
      return
    }
    if (!/[0-9]/.test(password)) {
      setMessage('Password must contain at least one number')
      setMessageType('error')
      return
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Login: login,
          Password: password
        })
      })
      const data = await response.json()
      if (response.ok) {
        setMessage('Registration successful! Please check your email to verify your account.')
        setMessageType('success')
        // Optional: redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setMessage(data.message)
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Server error, please try again')
      setMessageType('error')
    }
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#43281c' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm mt-4" style={{ 
            backgroundColor: '#48392a', 
            border: '1px solid #000',
            borderRadius: '12px'
          }}>
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4" style={{ color: '#fbf2c0' }}>Register</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
                      color: '#fbf2c0',
                      border: '1px solid #000'
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
                      color: '#fbf2c0',
                      border: '1px solid #000'
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
                      color: '#fbf2c0',
                      border: '1px solid #000'
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={login}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
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
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
                      color: '#fbf2c0',
                      border: '1px solid #000'
                    }}
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: 'rgba(67, 40, 28, 0.67)',
                      color: '#fbf2c0',
                      border: '1px solid #000',
                      padding: '10px'
                    }}
                  >
                    Register
                  </button>
                </div>

                {message && (
                  <div 
                    className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} py-2`} 
                    role="alert" 
                    style={{ 
                      backgroundColor: messageType === 'success' ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)', 
                      color: '#fff', 
                      border: 'none' 
                    }}
                  >
                    {message}
                  </div>
                )}

                <div className="text-center">
                  <span style={{ color: '#fbf2c0', fontSize: '0.85rem' }}>
                    Already have an account?{' '}
                    <a href="/login" className="text-decoration-none fw-bold" style={{ color: '#fbf2c0' }}>
                      Login
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register