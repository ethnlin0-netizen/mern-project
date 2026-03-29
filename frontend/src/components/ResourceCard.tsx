function ResourceCard({ title, type, link, uploadedBy, tags }: {
  title: string
  type: string
  link: string
  uploadedBy: string
  tags: string[]
}) {
  function handleFavorite(event: any): void {
    event.preventDefault()
    alert('addToFavorites')
  }

  function handleDelete(event: any): void {
    event.preventDefault()
    alert('deleteResource')
  }

  return (
    <div id="resourceCard">
      <span><strong>{title}</strong></span><br />
      <span>Type: {type}</span><br />
      <span>Uploaded By: {uploadedBy}</span><br />
      <span>Tags: {tags.join(', ')}</span><br />
      <a href={link} target="_blank">View Resource</a><br />
      <button type="button" onClick={handleFavorite}>Favorite</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ResourceCard