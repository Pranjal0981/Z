import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Signup } from './components/Auth'

function App() {

  return (
    <>
    <Routes>

      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
