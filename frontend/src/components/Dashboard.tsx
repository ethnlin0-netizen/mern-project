import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [className, setClassName] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [joinResult, setJoinResult] = useState('')
  const [createResult, setCreateResult] = useState('')
  const [myClasses, setMyClasses] = useState<any[]>([])
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [isLoading, setIsLoading] = useState(false)

  // Get username from auth
  const username = auth?.username || 'Student'
  const userId = auth?.userId

  // Fetch user's classes on component mount
  useEffect(() => {
    fetchUserClasses()
  }, [])

  const fetchUserClasses = async () => {
    if (!userId) return
    
    try {
      // Need endpoint to get classes by user
      setMyClasses([])
    } catch (error) {
      console.error('Error fetching classes:', error)
    }
  }

  async function createClass(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    if (!className.trim()) {
      setCreateResult('Please enter a class name')
      setMessageType('error')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/classes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ className, owner: userId })
      })
      const data = await response.json()
      if (response.ok) {
        setCreateResult(`✓ Created class "${data.class.className}". Join code: ${data.class.joinCode}`)
        setMessageType('success')
        setClassName('')
        fetchUserClasses()
      } else {
        setCreateResult(data.message)
        setMessageType('error')
      }
    } catch (error) {
      setCreateResult('Server error, please try again')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  async function joinClass(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    if (!joinCode.trim()) {
      setJoinResult('Please enter a join code')
      setMessageType('error')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/classes/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ joinCode, userId })
      })
      const data = await response.json()
      if (response.ok) {
        setJoinResult(`✓ Successfully joined class "${data.class.className}"`)
        setMessageType('success')
        setJoinCode('')
        fetchUserClasses()
      } else {
        setJoinResult(data.message)
        setMessageType('error')
      }
    } catch (error) {
      setJoinResult('Server error, please try again')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  async function searchClass(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    if (!searchText.trim()) {
      setSearchResult('Please enter a search term')
      setMessageType('error')
      return
    }
    setSearchResult('🔍 Search coming soon...')
    setMessageType('success')
  }

  const navigateToClass = (classId: string) => {
    navigate(`/class/${classId}`)
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#43281c', minHeight: '100vh' }}>
      <div className="container py-4">

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
  
            <div className="card mb-4" style={{ 
              backgroundColor: '#48392a', 
              border: '1px solid #000',
              borderRadius: '12px'
            }}>
              <div className="card-body p-4">
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>🔍 Search Classes</h3>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for classes by name or topic..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(72, 139, 73, 0.5)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn w-100"
                      onClick={searchClass}
                      disabled={isLoading}
                      style={{
                        backgroundColor: 'rgba(67, 40, 28, 0.67)',
                        color: '#fbf2c0',
                        border: '1px solid #000',
                        padding: '10px'
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
                {searchResult && (
                  <div className="mt-3">
                    <div 
                      className={`alert ${messageType === 'success' ? 'alert-info' : 'alert-danger'} py-2`}
                      style={{ 
                        backgroundColor: messageType === 'success' ? 'rgba(72, 139, 73, 0.3)' : 'rgba(220, 53, 69, 0.8)',
                        color: '#fbf2c0',
                        border: 'none'
                      }}
                    >
                      {searchResult}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card mb-4" style={{ 
              backgroundColor: '#48392a', 
              border: '1px solid #000',
              borderRadius: '12px'
            }}>
              <div className="card-body p-4">
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>🔗 Join a Class</h3>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 6-digit join code"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                      style={{
                        backgroundColor: 'rgba(72, 139, 73, 0.5)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn w-100"
                      onClick={joinClass}
                      disabled={isLoading}
                      style={{
                        backgroundColor: 'rgba(67, 40, 28, 0.67)',
                        color: '#fbf2c0',
                        border: '1px solid #000',
                        padding: '10px'
                      }}
                    >
                      {isLoading ? 'Joining...' : 'Join Class'}
                    </button>
                  </div>
                </div>
                {joinResult && (
                  <div className="mt-3">
                    <div 
                      className={`alert ${joinResult.includes('✓') ? 'alert-success' : 'alert-danger'} py-2`}
                      style={{ 
                        backgroundColor: joinResult.includes('✓') ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)',
                        color: '#fff',
                        border: 'none'
                      }}
                    >
                      {joinResult}
                    </div>
                  </div>
                )}
              </div>
            </div>

 
            <div className="card mb-4" style={{ 
              backgroundColor: '#48392a', 
              border: '1px solid #000',
              borderRadius: '12px'
            }}>
              <div className="card-body p-4">
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>✨ Create a Class</h3>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter class name"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(72, 139, 73, 0.5)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn w-100"
                      onClick={createClass}
                      disabled={isLoading}
                      style={{
                        backgroundColor: 'rgba(67, 40, 28, 0.67)',
                        color: '#fbf2c0',
                        border: '1px solid #000',
                        padding: '10px'
                      }}
                    >
                      {isLoading ? 'Creating...' : 'Create Class'}
                    </button>
                  </div>
                </div>
                {createResult && (
                  <div className="mt-3">
                    <div 
                      className={`alert ${createResult.includes('✓') ? 'alert-success' : 'alert-danger'} py-2`}
                      style={{ 
                        backgroundColor: createResult.includes('✓') ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)',
                        color: '#fff',
                        border: 'none'
                      }}
                    >
                      {createResult}
                    </div>
                  </div>
                )}
              </div>
            </div>


            <div className="card" style={{ 
              backgroundColor: '#48392a', 
              border: '1px solid #000',
              borderRadius: '12px'
            }}>
              <div className="card-body p-4">
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>📚 Your Classes</h3>
                {myClasses.length > 0 ? (
                  <div className="row g-3">
                    {myClasses.map((classItem) => (
                      <div key={classItem._id} className="col-md-6">
                        <div 
                          className="p-3"
                          style={{ 
                            backgroundColor: 'rgba(72, 139, 73, 0.3)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                          }}
                          onClick={() => navigateToClass(classItem._id)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
                          <h5 style={{ color: '#fbf2c0', marginBottom: '8px' }}>
                            {classItem.className}
                          </h5>
                          <p style={{ color: '#fbf2c0', opacity: 0.7, margin: 0, fontSize: '0.85rem' }}>
                            Join Code: <strong>{classItem.joinCode}</strong>
                          </p>
                          <p style={{ color: '#fbf2c0', opacity: 0.6, margin: '8px 0 0 0', fontSize: '0.8rem' }}>
                            {classItem.members?.length || 1} members
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#fbf2c0', opacity: 0.7 }}>
                    No classes yet. Join or create a class to get started!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard