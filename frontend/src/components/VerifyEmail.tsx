import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

function VerifyEmail() {
  const { token } = useParams()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [resendMessage, setResendMessage] = useState('')
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    fetch(`https://groupstudyhub.xyz/api/auth/verify-email/${token}`)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
        setLoading(false)
      })
      .catch(() => {
        setMessage('Verification failed')
        setLoading(false)
      })
  }, [token])

  const handleResend = () => {
    if (!email) {
      setResendMessage('Please enter your email')
      return
    }
    fetch('https://groupstudyhub.xyz/api/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email })
    })
      .then(res => res.json())
      .then(data => setResendMessage(data.message))
      .catch(() => setResendMessage('Failed to resend email'))
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
              <div className="card-body p-5 text-center">
                <h2 style={{ color: '#fbf2c0', fontFamily: 'Poppins, sans-serif' }}>Email Verification</h2>
                {loading ? (
                  <p style={{ color: '#fbf2c0' }}>Verifying your email, please wait...</p>
                ) : (
                  <>
                    <p style={{ color: message.includes('successfully') ? '#90EE90' : '#FFB6C1' }}>
                      {message}
                    </p>
                    <a href="/login" className="btn" style={{ 
                      backgroundColor: 'rgba(67, 40, 28, 0.67)',
                      color: '#fbf2c0',
                      border: '1px solid #000',
                      padding: '8px 24px'
                    }}>
                      Go to Login
                    </a>

                    <hr style={{ borderColor: 'rgba(251, 242, 192, 0.3)', marginTop: '20px' }} />
                    <p style={{ color: '#fbf2c0' }}>Didn't receive an email?</p>
                    <button 
                      onClick={handleResend} 
                      className="btn" 
                      style={{ 
                        backgroundColor: 'rgba(67, 40, 28, 0.67)',
                        color: '#fbf2c0',
                        border: '1px solid #000',
                        padding: '8px 24px'
                      }}
                    >
                      Resend Verification Email
                    </button>
                    {resendMessage && (
                      <p style={{ color: '#fbf2c0', marginTop: '10px' }}>{resendMessage}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail