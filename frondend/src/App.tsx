import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import { UserProvider } from "./context/UserContext"
import ProjectDetails from "./components/ProjectDetails/ProjectDetails"

function App() {
  
  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:projectId" element={<ProjectDetails/>}/>
      </Routes>
    </BrowserRouter>
  </UserProvider>
  )
}

export default App
