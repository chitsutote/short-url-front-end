import { Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
