import PageTitle from '../components/PageTitle.tsx'
import LoggedInName from '../components/LoggedInName.tsx'
import Dashboard from '../components/Dashboard.tsx'

const DashboardPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Dashboard />
    </div>
  )
}

export default DashboardPage