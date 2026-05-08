import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api/admin'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe()
        .then((res) => setAdmin(res.data.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const loginAdmin = (token, adminData) => {
    localStorage.setItem('token', token)
    setAdmin(adminData)
  }

  const logoutAdmin = () => {
    localStorage.removeItem('token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
