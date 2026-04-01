import { createContext, useState, useContext } from 'react'

interface AuthContextType {
  token: string | null
  userId: string | null
  username: string | null
  login: (token: string, userId: string, username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'))
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))

  function login(token: string, userId: string, username: string): void {
    setToken(token)
    setUserId(userId)
    setUsername(username)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('username', username)
  }

  function logout(): void {
    setToken(null)
    setUserId(null)
    setUsername(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
  }

  return (
    <AuthContext.Provider value={{ token, userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)