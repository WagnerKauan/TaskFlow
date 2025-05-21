import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import Register from "./pages/formRegisterLogin/register"
import Login from './pages/formRegisterLogin/Login'
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./pages/dashboard/Dashboard"
import Tasks from "./pages/dashboard/Tasks"
import Profile from "./pages/dashboard/profile"
import { UserProvider } from "./contexts/UserContext"
import Trash from './pages/dashboard/Trash'
import { NotFound } from "./pages/NotFund"

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Tasks />} />
              <Route path="profile" element={<Profile />} />
              <Route path="Trash" element={<Trash />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
