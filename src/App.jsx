import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Profile, Signup } from './components/Auth'
import Navbar from './components/Nav'
import { Footer } from 'antd/es/layout/layout'
import FooterComponent from './components/Footer'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    <FooterComponent/>
    </>
  )
}

export default App
