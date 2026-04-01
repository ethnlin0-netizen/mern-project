import Register from '../components/Register.tsx'
import PageTitle from '../components/PageTitle.tsx'

const RegisterPage = () => {
  return (
    <div style={{ 
      backgroundColor: '#43281c', 
      minHeight: '100vh'
    }}>
      <PageTitle />
      <Register />
    </div>
  )
}

export default RegisterPage