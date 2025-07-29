import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Sidebar from './components/SideBar'
import { useState } from 'react'
import Admin from './admin/Admin'

import UpdateCar from './admin/Update'
import Cars from './pages/Cars'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Reservation from './pages/reservation'
import Reserve from './admin/Reserv'
import MyReserv from './components/MyReserv'
import Accepted from './admin/Accept'
import Comond from './pages/Comond'
import Drop from './admin/Drop'
import Seved from './pages/Saved'
import AboutUs from './pages/About'
import { AnimatePresence } from "framer-motion";


function App() {
  const [user, setUser] = useState()

  return (
    <>
      <div className="d-flex d-lg-none">
        <Sidebar />
      </div>



      <AnimatePresence mode="wait">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route path="/admin" element={<Admin />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/myreserv" element={<MyReserv />} />
          <Route path="/accepted" element={<Accepted />} />
          <Route path="/drop" element={<Drop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/seved" element={<Seved />} />
          <Route path="/update/:id" element={<UpdateCar />} />
          <Route path="/resrvation/:id" element={<Reservation />} />
          <Route path="/comond/:id" element={<Comond />} />
        </Routes>
      </AnimatePresence>

    </>
  )
}

export default App
