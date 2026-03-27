function Dashboard() {
  function createClass(event: any): void {
    event.preventDefault()
    alert('createClass')
  }

  function joinClass(event: any): void {
    event.preventDefault()
    alert('joinClass')
  }

  function searchClass(event: any): void {
    event.preventDefault()
    alert('searchClass')
  }

  return (
    <div id="dashboardDiv">
      <br />
      <input type="text" id="searchText" placeholder="Search Classes" />
      <button type="button" id="searchClassButton" onClick={searchClass}>
        Search
      </button><br />
      <span id="classSearchResult"></span>
      <p id="classList"></p><br /><br />

      <input type="text" id="joinCode" placeholder="Enter Join Code" />
      <button type="button" id="joinClassButton" onClick={joinClass}>
        Join Class
      </button><br />
      <span id="joinResult"></span><br /><br />

      <input type="text" id="className" placeholder="Class Name" />
      <button type="button" id="createClassButton" onClick={createClass}>
        Create Class
      </button><br />
      <span id="createResult"></span>
    </div>
  )
}

export default Dashboard