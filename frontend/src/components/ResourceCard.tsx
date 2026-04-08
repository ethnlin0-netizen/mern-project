function ResourceCard({ id, title, description, link, uploadedBy, onDelete, currentUser }: {
  id: string
  title: string
  description: string
  link: string
  uploadedBy: string
  onDelete: (id: string) => void
  currentUser?: string | null
}) {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this resource?')) {
      onDelete(id)
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
          
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong style={{ color: '#fbf2c0', fontSize: '1.1rem' }}>{title}</strong>
              <div style={{ color: '#fbf2c0', opacity: 0.7, fontSize: '0.85rem', marginTop: '4px' }}>
                {description && <span>{description} • </span>}
                <span>Uploaded by: {uploadedBy}</span>
              </div>
            </div>
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
                Delete
              </button>
            )}
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
        </div>
      </div>
    </div>
  )
}

export default ResourceCard