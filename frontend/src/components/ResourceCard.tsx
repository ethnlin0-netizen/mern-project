function ResourceCard({ id, title, type, link, uploadedBy, tags, onDelete, onFavorite, currentUser }: {
  id: string
  title: string
  type: string
  link: string
  uploadedBy: string
  tags: string[]
  onDelete: (id: string) => void
  onFavorite: (id: string) => void
  currentUser?: string | null
}) {
  const handleFavorite = (event: React.MouseEvent) => {
    event.preventDefault()
    onFavorite(id)
  }

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this resource?')) {
      onDelete(id)
    }
  }

  const getResourceIcon = () => {
    switch (type) {
      case 'link': return '🔗'
      case 'video': return '🎥'
      case 'document': return '📄'
      case 'pdf': return '📑'
      default: return '📎'
    }
  }

  return (
    <div className="mb-3 p-3" style={{ 
      backgroundColor: 'rgba(72, 139, 73, 0.2)',
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,0.2)'
    }}>
      <div className="d-flex align-items-start">
        <div style={{ fontSize: '2rem', marginRight: '15px' }}>
          {getResourceIcon()}
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong style={{ color: '#fbf2c0', fontSize: '1.1rem' }}>{title}</strong>
              <div style={{ color: '#fbf2c0', opacity: 0.7, fontSize: '0.85rem', marginTop: '4px' }}>
                Type: {type} • Uploaded By: {uploadedBy}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button 
                type="button" 
                onClick={handleFavorite}
                className="btn btn-sm"
                style={{
                  backgroundColor: 'rgba(255, 193, 7, 0.8)',
                  color: '#000',
                  border: 'none',
                  padding: '4px 12px',
                  fontSize: '0.75rem'
                }}
              >
                ⭐ Favorite
              </button>
              {currentUser === uploadedBy && (
                <button 
                  type="button" 
                  onClick={handleDelete}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 12px',
                    fontSize: '0.75rem'
                  }}
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#fbf2c0', textDecoration: 'underline', fontSize: '0.9rem' }}
            >
              {link}
            </a>
          </div>
          {tags && tags.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              {tags.map((tag, idx) => (
                <span 
                  key={idx}
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(72, 139, 73, 0.4)',
                    color: '#fbf2c0',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    marginRight: '6px'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourceCard