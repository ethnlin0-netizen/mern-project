import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('error')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setMessageType('error')
      return
    }

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
    
    setIsLoading(true)
    
    try {
      const response = await fetch(`http://localhost:5001/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Password: password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('Password has been reset successfully! Redirecting to login...')
        setMessageType('success')
        
        setPassword('')
        setConfirmPassword('')
        
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setMessage(data.message || 'Failed to reset password. Please try again.')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Server error, please try again later')
      setMessageType('error')
    } finally {
      setIsLoading(false)
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
              <h2 className="text-center mb-4" style={{ color: '#fbf2c0' }}>Reset Password</h2>
              
              <div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
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
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
                      color: '#fbf2c0',
                      border: '1px solid #000'
                    }}
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn w-100"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: 'rgba(67, 40, 28, 0.67)',
                      color: '#fbf2c0',
                      border: '1px solid #000',
                      padding: '10px'
                    }}
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
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

                <div className="text-center mt-3">
                  <a href="/login" className="text-decoration-none" style={{ color: '#fbf2c0', fontSize: '0.85rem' }}>
                    ← Return to login page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword