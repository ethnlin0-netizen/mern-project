import PageTitle from '../components/PageTitle.tsx'
import LoggedInName from '../components/LoggedInName.tsx'
import ClassFeed from '../components/ClassFeed.tsx'

const ClassFeedPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <ClassFeed />
    </div>
  )
}

export default ClassFeedPage