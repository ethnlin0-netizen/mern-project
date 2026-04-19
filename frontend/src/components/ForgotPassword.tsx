import { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('error')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      setMessageType('error')
      return
    }
    
    try {
      const response = await fetch('https://groupstudyhub.xyz/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('Password reset link has been sent to your email. Please check your inbox.')
        setMessageType('success')
        setEmail('')
      } else {
        setMessage(data.message || 'Failed to send reset link. Please try again.')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Server error, please try again later')
      setMessageType('error')
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
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-sm mt-4" style={{ 
              backgroundColor: 'rgba(72, 57, 42, 0.85)', 
              border: '1px solid #000',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4" style={{ color: '#fbf2c0', fontFamily: 'Poppins, sans-serif' }}>Forgot Password</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                      Send Reset Link
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
                      Return to login page
                    </a>
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

export default ForgotPassword