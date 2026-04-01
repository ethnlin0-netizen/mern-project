import { useState } from 'react'
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

  async function createClass(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5001/api/classes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ className, owner: auth?.userId })
      })
      const data = await response.json()
      if (response.ok) {
        setCreateResult(`Created class ${data.class.className}. Join code is: ${data.class.joinCode}`)
      } else {
        setCreateResult(data.message)
      }
    } catch (error) {
      setCreateResult('Server error, please try again')
    }
  }

  async function joinClass(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5001/api/classes/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ joinCode, userId: auth?.userId })
      })
      const data = await response.json()
      if (response.ok) {
        setJoinResult(`Successfully joined class ${data.class.className}`)
      } else {
        setJoinResult(data.message)
      }
    } catch (error) {
      setJoinResult('Server error, please try again')
    }
  }

  async function searchClass(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()
    setSearchResult('Search coming soon')
  }

  return (
    <div id="dashboardDiv">
      <br />
      <input type="text" id="searchText" placeholder="Search Classes" onChange={(e) => setSearchText(e.target.value)} />
      <button type="button" id="searchClassButton" onClick={searchClass}>
        Search
      </button><br />
      <span id="classSearchResult">{searchResult}</span>
      <p id="classList"></p><br /><br />

      <input type="text" id="joinCode" placeholder="Enter Join Code" onChange={(e) => setJoinCode(e.target.value)} />
      <button type="button" id="joinClassButton" onClick={joinClass}>
        Join Class
      </button><br />
      <span id="joinResult">{joinResult}</span><br /><br />

      <input type="text" id="className" placeholder="Class Name" onChange={(e) => setClassName(e.target.value)} />
      <button type="button" id="createClassButton" onClick={createClass}>
        Create Class
      </button><br />
      <span id="createResult">{createResult}</span>
    </div>
  )
}

export default Dashboard