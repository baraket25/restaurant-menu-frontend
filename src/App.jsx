import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Spinner from './components/ui/Spinner'

// Pages
import Home       from './pages/Home'
import Login      from './pages/admin/Login'
import Dashboard  from './pages/admin/Dashboard'
import Categories from './pages/admin/Categories'
import Items      from './pages/admin/Items'
import Settings   from './pages/admin/Settings'

// Guard: redirect to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return admin ? children : <Navigate to="/admin/login" replace />
}

// Guard: redirect to dashboard if already logged in
const GuestRoute = ({ children }) => {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return admin ? <Navigate to="/admin" replace /> : children
}

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />

    {/* Admin auth */}
    <Route path="/admin/login" element={
      <GuestRoute><Login /></GuestRoute>
    } />

    {/* Admin protected */}
    <Route path="/admin" element={
      <ProtectedRoute><Dashboard /></ProtectedRoute>
    } />
    <Route path="/admin/categories" element={
      <ProtectedRoute><Categories /></ProtectedRoute>
    } />
    <Route path="/admin/items" element={
      <ProtectedRoute><Items /></ProtectedRoute>
    } />
    <Route path="/admin/settings" element={
      <ProtectedRoute><Settings /></ProtectedRoute>
    } />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' },
          success: { duration: 3000 },
          error:   { duration: 4000 },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
)

export default App
