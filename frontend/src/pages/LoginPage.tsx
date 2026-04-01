import Login from '../components/Login.tsx'
import PageTitle from '../components/PageTitle.tsx'

const LoginPage = () => {
  return (
    <div style={{ 
      backgroundColor: '#43281c', 
      minHeight: '100vh'
    }}>
      <PageTitle />
      <Login />
    </div>
  )
}

export default LoginPage