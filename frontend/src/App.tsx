import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import ClassFeedPage from './pages/ClassFeedPage.tsx'
import HomePage from './pages/HomePage.tsx'
import { useAuth } from './context/AuthContext.tsx'

function App() {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={auth?.token ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/class/:id" element={auth?.token ? <ClassFeedPage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App