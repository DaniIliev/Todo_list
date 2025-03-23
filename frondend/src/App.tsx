import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import { UserProvider } from "./context/UserContext"

function App() {


  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard/:username" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
  )
}

export default App
