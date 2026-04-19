import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import ResourceCard from './ResourceCard.tsx'

interface Resource {
  _id: string
  title: string
  description: string
  link: string
  uploadedBy: string
  classID: string
  createdAt?: string
}

function ClassFeed() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const auth = useAuth()
  const [resources, setResources] = useState<Resource[]>([])
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceLink, setResourceLink] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [postResult, setPostResult] = useState('')
  const [postResultType, setPostResultType] = useState<'success' | 'error'>('success')
  const [searchResult, setSearchResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resourceDescription, setResourceDescription] = useState('')
  const [classFeedName, setClassFeedName] = useState('')
  const [isOwner, setIsOwner] = useState(false)


  // Fetch resources on component mount
  useEffect(() => {
    fetchResources()
  }, [id])

  const fetchResources = async () => {
    try {
      const response = await fetch(`https://groupstudyhub.xyz/api/resources/class/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth?.token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setResources(data)
        setFilteredResources(data)
      } else {
        setPostResult(data.message || 'Error loading resources')
        setPostResultType('error')
      }
      const classResponse = await fetch(`https://groupstudyhub.xyz/api/classes/${id}`, {
        headers: { 'Authorization': `Bearer ${auth?.token}` }
      })
      const classData = await classResponse.json()
      if (classResponse.ok) {
        setClassFeedName(classData.className)
        console.log("Class owner:", classData.owner)
        console.log("Auth userId:", auth?.userId)
        console.log("Match:", classData.owner === auth?.userId?.toString())
        setIsOwner(classData.owner === auth?.userId?.toString())
      }
    } catch (error) {
      setPostResult('Error loading resources')
      setPostResultType('error')
    }
  }

  async function postResource(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    
    if (!resourceTitle.trim()) {
      setPostResult('Please enter a resource title')
      setPostResultType('error')
      return
    }
    if (!resourceLink.trim()) {
      setPostResult('Please enter a resource link')
      setPostResultType('error')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await fetch('https://groupstudyhub.xyz/api/resources/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          title: resourceTitle,
          description: resourceDescription,
          link: resourceLink,
          uploadedBy: auth?.username,
          classID: id
        })
      })
      const data = await response.json()
      if (response.ok) {
        setPostResult('✓ Resource posted successfully!')
        setPostResultType('success')
        setResourceTitle('')
        setResourceDescription('')
        setResourceLink('')
        fetchResources() // Refresh the list
      } else {
        setPostResult(data.message || 'Failed to post resource')
        setPostResultType('error')
      }
    } catch (error) {
      setPostResult('Server error, please try again')
      setPostResultType('error')
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteResource(resourceId: string): Promise<void> {
    try {
      const response = await fetch(`https://groupstudyhub.xyz/api/resources/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth?.token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setPostResult('Resource deleted successfully!')
        setPostResultType('success')
        fetchResources() // Refresh the list
      } else {
        setPostResult(data.message || 'Failed to delete resource')
        setPostResultType('error')
      }
    } catch (error) {
      setPostResult('Server error, please try again')
      setPostResultType('error')
    }
  }

  

  function searchResource(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    if (!searchText.trim()) {
      setSearchResult('Please enter a search term')
      setFilteredResources(resources)
      return
    }
    
    const filtered = resources.filter(r => 
      r.title.toLowerCase().includes(searchText.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredResources(filtered)
    setSearchResult(`Found ${filtered.length} resources matching "${searchText}"`)
  }

  function clearSearch() {
    setSearchText('')
    setFilteredResources(resources)
    setSearchResult('')
  }

  async function leaveClass(): Promise<void> {
    if (!window.confirm('Are you sure you want to leave this class?')) return
    try {
        const response = await fetch(`https://groupstudyhub.xyz/api/classes/leave/${id}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${auth?.token}` }
        })
        const data = await response.json()
        if (response.ok) {
            navigate('/dashboard')
        } else {
            setPostResult(data.message)
            setPostResultType('error')
        }
    } catch (error) {
        setPostResult('Server error, please try again')
        setPostResultType('error')
    }
  }

  async function deleteClass(): Promise<void> {
      if (!window.confirm('Are you sure you want to delete this class forever?')) return
      try {
          const response = await fetch(`https://groupstudyhub.xyz/api/classes/delete/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${auth?.token}` }
          })
          const data = await response.json()
          if (response.ok) {
              navigate('/dashboard')
          } else {
              setPostResult(data.message)
              setPostResultType('error')
          }
      } catch (error) {
          setPostResult('Server error, please try again')
          setPostResultType('error')
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
      <div className="container-fluid" style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
        <div className="container py-4">
          <h1 className="text-center mb-4" style={{ 
            color: '#fbf2c0', 
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            Group Study Hub
          </h1>
          <div className="mb-4">
            <div className="d-flex gap-2 align-items-center justify-content-center mb-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn"
                style={{
                  backgroundColor: 'rgba(67, 40, 28, 0.67)',
                  color: '#fbf2c0',
                  border: '1px solid #000',
                  padding: '8px 20px'
                }}
              >
                Back to Dashboard
              </button>

              {isOwner ? (
                <button
                  onClick={deleteClass}
                  className="btn"
                  style={{
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    color: '#fff',
                    border: '1px solid #000',
                    padding: '8px 20px'
                  }}
                >
                  🗑️ Delete Class
                </button>
              ) : (
                <button
                  onClick={leaveClass}
                  className="btn"
                  style={{
                    backgroundColor: 'rgba(67, 40, 28, 0.67)',
                    color: '#fbf2c0',
                    border: '1px solid #000',
                    padding: '8px 20px'
                  }}
                >
                  Leave Class
                </button>
              )}
            </div>

            {classFeedName && (
              <h2 className="text-center" style={{ 
                color: '#fbf2c0', 
                fontFamily: 'Poppins, sans-serif',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                {classFeedName}
              </h2>
            )}
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">

              <div className="card mb-4" style={{ 
                backgroundColor: 'rgba(72, 57, 42, 0.85)', 
                border: '1px solid #000',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <div className="card-body p-4">
                  <h3 className="mb-3" style={{ color: '#fbf2c0', fontFamily: 'Poppins, sans-serif' }}>
                    <i className="bi bi-search me-2"></i>Search Resources
                  </h3>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or description..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#fbf2c0',
                          border: '1px solid #000'
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn flex-grow-1"
                          onClick={searchResource}
                          style={{
                            backgroundColor: 'rgba(67, 40, 28, 0.67)',
                            color: '#fbf2c0',
                            border: '1px solid #000',
                            padding: '10px'
                          }}
                        >
                          Search
                        </button>
                        {searchText && (
                          <button
                            type="button"
                            className="btn"
                            onClick={clearSearch}
                            style={{
                              backgroundColor: 'rgba(220, 53, 69, 0.8)',
                              color: '#fff',
                              border: '1px solid #000',
                              padding: '10px'
                            }}
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {searchResult && (
                    <div className="mt-3">
                      <div className="alert py-2" style={{ 
                        backgroundColor: 'rgba(72, 139, 73, 0.3)', 
                        color: '#fbf2c0', 
                        border: 'none' 
                      }}>
                        {searchResult}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mb-4" style={{ 
                backgroundColor: 'rgba(72, 57, 42, 0.85)', 
                border: '1px solid #000',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <div className="card-body p-4">
                  <h3 className="mb-3" style={{ color: '#fbf2c0', fontFamily: 'Poppins, sans-serif' }}>
                    <i className="bi bi-collection me-2"></i>Class Resources
                  </h3>
                  {filteredResources.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="bi bi-journal-x" style={{ fontSize: '3rem', color: '#fbf2c0', opacity: 0.4 }}></i>
                      <p style={{ color: '#fbf2c0', opacity: 0.7, marginTop: '12px' }}>
                        No resources yet. Be the first to share something!
                      </p>
                    </div>
                  ) : (
                    <div id="resourceList">
                      {filteredResources.map((resource) => (
                        <ResourceCard
                          key={resource._id}
                          id={resource._id}
                          title={resource.title}
                          description={resource.description}
                          link={resource.link}
                          uploadedBy={resource.uploadedBy}
                          onDelete={deleteResource}
                          currentUser={auth?.username}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="card" style={{ 
                backgroundColor: 'rgba(72, 57, 42, 0.85)', 
                border: '1px solid #000',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <div className="card-body p-4">
                  <h3 className="mb-3" style={{ color: '#fbf2c0', fontFamily: 'Poppins, sans-serif' }}>
                    <i className="bi bi-plus-circle me-2"></i>Share a Resource
                  </h3>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Resource Title"
                      value={resourceTitle}
                      onChange={(e) => setResourceTitle(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description (optional)"
                      value={resourceDescription}
                      onChange={(e) => setResourceDescription(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Resource Link (URL)"
                      value={resourceLink}
                      onChange={(e) => setResourceLink(e.target.value)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fbf2c0',
                        border: '1px solid #000'
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn w-100"
                    onClick={postResource}
                    disabled={isLoading}
                    style={{
                      backgroundColor: 'rgba(67, 40, 28, 0.67)',
                      color: '#fbf2c0',
                      border: '1px solid #000',
                      padding: '10px'
                    }}
                  >
                    {isLoading ? 'Posting...' : 'Post Resource'}
                  </button>
                  {postResult && (
                    <div className="mt-3">
                      <div
                        className={`alert ${postResultType === 'success' ? 'alert-success' : 'alert-danger'} py-2`}
                        style={{ 
                          backgroundColor: postResultType === 'success' ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)',
                          color: '#fff',
                          border: 'none'
                        }}
                      >
                        {postResult}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassFeed