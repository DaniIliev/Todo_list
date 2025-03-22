import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Dashboard from "./components/Dashboard/Dashboard"

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
