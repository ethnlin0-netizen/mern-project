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

    fetch(`http://localhost:5001/api/auth/verify-email/${token}`)
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
    fetch('http://localhost:5001/api/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email })
    })
      .then(res => res.json())
      .then(data => setResendMessage(data.message))
      .catch(() => setResendMessage('Failed to resend email'))
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#43281c', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm mt-4" style={{ backgroundColor: '#48392a', borderRadius: '12px' }}>
            <div className="card-body p-5 text-center">
              <h2 style={{ color: '#fbf2c0' }}>Email Verification</h2>
              {loading ? (
                <p style={{ color: '#fbf2c0' }}>Verifying your email, please wait...</p>
              ) : (
                <>
                  <p style={{ color: message.includes('successfully') ? '#90EE90' : '#FFB6C1' }}>
                    {message}
                  </p>
                  <a href="/login" className="btn" style={{ color: '#fbf2c0' }}>Go to Login</a>

                  <hr style={{ borderColor: '#fbf2c0', marginTop: '20px' }} />
                  <p style={{ color: '#fbf2c0' }}>Didn't receive an email?</p>
                  <button onClick={handleResend} className="btn" style={{ backgroundColor: '#7a5533', color: '#fbf2c0' }}>
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
  )
}

export default VerifyEmail