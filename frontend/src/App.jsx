import { Route, Routes } from 'react-router-dom'
import './App.css'
import ContactPage from './pages/ContactPage'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Sidebar from './components/SideBar'
import { useState } from 'react'
import Admin from './admin/Admin'

import UpdateCar from './admin/Update'
import Cars from './pages/Cars'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'


function App() {
  const [user, setUser] = useState()

  return (
    <>
      <div className="d-flex d-lg-none">
        <Sidebar  />
      </div>
     
      

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/update/:id" element={<UpdateCar />} />
      </Routes>

    </>
  )
}

export default App
