import PageTitle from '../components/PageTitle.tsx'
import ForgotPassword from '../components/ForgotPassword.tsx'

const ForgotPasswordPage = () => {
  return (
    <div style={{ 
      backgroundColor: '#43281c', 
      minHeight: '100vh'
    }}>
      <PageTitle />
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage