import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import ResourceCard from './ResourceCard.tsx'

interface Resource {
  _id: string
  title: string
  type: string
  link: string
  tags: string[]
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

  // Fetch resources on component mount
  useEffect(() => {
    fetchResources()
  }, [id])

  const fetchResources = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/resources/class/${id}`, {
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
      const response = await fetch('http://localhost:5001/api/resources/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          title: resourceTitle,
          type: 'link',
          link: resourceLink,
          tags: [],
          uploadedBy: auth?.username,
          classID: id
        })
      })
      const data = await response.json()
      if (response.ok) {
        setPostResult('✓ Resource posted successfully!')
        setPostResultType('success')
        setResourceTitle('')
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
      const response = await fetch(`http://localhost:5001/api/resources/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth?.token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setPostResult('✓ Resource deleted successfully!')
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

  async function handleFavorite(resourceId: string): Promise<void> {
    // This would connect to a favorites endpoint when implemented
    alert(`Added resource ${resourceId} to favorites`)
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
      r.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
    )
    setFilteredResources(filtered)
    setSearchResult(`Found ${filtered.length} resources matching "${searchText}"`)
  }

  function clearSearch() {
    setSearchText('')
    setFilteredResources(resources)
    setSearchResult('')
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#43281c', minHeight: '100vh' }}>
      <div className="container py-4">
        
        
        <div className="mb-4">
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
            ← Back to Dashboard
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">

            
            <div className="card mb-4" style={{ 
              backgroundColor: '#48392a', 
              border: '1px solid #000',
              borderRadius: '12px'
            }}>
              <div className="card-body p-4">
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>Search Resources</h3>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by title or tags..."
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
                    <div className="alert alert-info py-2" style={{ 
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
              backgroundColor: '#48392a', 
              border: '1px solid #000',
              borderRadius: '12px'
            }}>
              <div className="card-body p-4">
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>Class Resources</h3>
                
                {filteredResources.length === 0 ? (
                  <p style={{ color: '#fbf2c0', opacity: 0.7 }}>
                    No resources yet. Be the first to share something!
                  </p>
                ) : (
                  <div id="resourceList">
                    {filteredResources.map((resource) => (
                      <ResourceCard
                        key={resource._id}
                        id={resource._id}
                        title={resource.title}
                        type={resource.type}
                        link={resource.link}
                        uploadedBy={resource.uploadedBy}
                        tags={resource.tags}
                        onDelete={deleteResource}
                        onFavorite={handleFavorite}
                        currentUser={auth?.username}
                      />
                    ))}
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
                <h3 className="mb-3" style={{ color: '#fbf2c0' }}>Share a Resource</h3>
                
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Resource Title"
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
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
                      backgroundColor: 'rgba(72, 139, 73, 0.5)',
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
  )
}

export default ClassFeed