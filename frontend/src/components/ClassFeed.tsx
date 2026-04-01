import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import ResourceCard from './ResourceCard.tsx'

function ClassFeed() {
  const { id } = useParams()
  const auth = useAuth()
  const [resources, setResources] = useState<any[]>([])
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceLink, setResourceLink] = useState('')
  const [searchText, setSearchText] = useState('')
  const [postResult, setPostResult] = useState('')
  const [searchResult, setSearchResult] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5001/api/resources/${id}`)
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(() => setPostResult('Error loading resources'))
  }, [id])

  async function postResource(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5001/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setPostResult('Resource posted successfully')
        setResources([...resources, data.resource])
      } else {
        setPostResult(data.message)
      }
    } catch (error) {
      setPostResult('Server error, please try again')
    }
  }

  async function searchResource(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    const filtered = resources.filter(r => 
      r.title.toLowerCase().includes(searchText.toLowerCase())
    )
    setResources(filtered)
  }

  return (
    <div id="classFeedDiv">
      <br />
      <input type="text" placeholder="Search Resources" onChange={(e) => setSearchText(e.target.value)} />
      <button type="button" onClick={searchResource}>Search</button><br />
      <span>{searchResult}</span>

      <div id="resourceList">
        {resources.map((resource: any) => (
          <ResourceCard
            key={resource._id}
            title={resource.title}
            type={resource.type}
            link={resource.link}
            uploadedBy={resource.uploadedBy}
            tags={resource.tags}
          />
        ))}
      </div>
      <br />

      <input type="text" placeholder="Resource Title" onChange={(e) => setResourceTitle(e.target.value)} />
      <input type="text" placeholder="Resource Link" onChange={(e) => setResourceLink(e.target.value)} />
      <button type="button" onClick={postResource}>Post Resource</button><br />
      <span>{postResult}</span>
    </div>
  )
}

export default ClassFeed