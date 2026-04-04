import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5001/api/auth/verify-email/${token}`)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
        setLoading(false)
        setTimeout(() => navigate('/login'), 3000)
      })
      .catch(() => {
        setMessage('Verification failed')
        setLoading(false)
      })
  }, [token])

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
