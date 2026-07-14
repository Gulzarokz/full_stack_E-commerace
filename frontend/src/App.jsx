import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import EmailVerify from './pages/EmailVerify'



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/verify/:token' element={<EmailVerify />} />

      </Routes>

    </>
  )
}

export default App
