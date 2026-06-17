import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Navbar from './components/navbar'
import Verify from './pages/verify'
import EmailVerify from './pages/EmailVerify'
import Login from './pages/Login'








const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Verify' element={<Verify />} />
        <Route path='/verify/:token' element={<EmailVerify />} />



      </Routes>

    </BrowserRouter>



  )
}

export default App
