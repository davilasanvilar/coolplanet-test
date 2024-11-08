import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UserDetailsPage } from './pages/UserDetailsPage'
import { HomePage } from './pages/HomePage'

function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
