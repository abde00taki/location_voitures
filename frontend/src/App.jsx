import { Route, Routes } from 'react-router-dom'
import './App.css'
import ContactPage from './pages/ContactPage'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Sidebar from './components/SideBar'


function App() {


  return (
    <>
      <div className="d-none d-lg-flex">
        <NavBar />
      </div>
      <div className="d-flex d-lg-none">
        <Sidebar  />
      </div>
     
      

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

    </>
  )
}

export default App
