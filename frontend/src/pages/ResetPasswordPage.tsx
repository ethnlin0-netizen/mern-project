import PageTitle from '../components/PageTitle.tsx'
import ResetPassword from '../components/ResetPassword.tsx'

const ResetPasswordPage = () => {
  return (
    <div style={{ 
      backgroundColor: '#43281c', 
      minHeight: '100vh'
    }}>
      <PageTitle />
      <ResetPassword />
    </div>
  )
}

export default ResetPasswordPage