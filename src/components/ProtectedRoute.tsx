import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}
const ProtectedRoute:FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken')

  if (!token) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute