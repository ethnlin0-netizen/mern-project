function ClassFeed() {
  function postResource(event: any): void {
    event.preventDefault()
    alert('postResource')
  }

  function searchResource(event: any): void {
    event.preventDefault()
    alert('searchResource')
  }

  return (
    <div id="classFeedDiv">
      <br />
      <input type="text" id="searchText" placeholder="Search Resources" />
      <button type="button" onClick={searchResource}>
        Search
      </button><br />
      <span id="searchResult"></span>
      <p id="resourceList"></p><br /><br />

      <input type="text" id="resourceTitle" placeholder="Resource Title" />
      <input type="text" id="resourceLink" placeholder="Resource Link" />
      <button type="button" onClick={postResource}>
        Post Resource
      </button><br />
      <span id="postResult"></span>
    </div>
  )
}

export default ClassFeed