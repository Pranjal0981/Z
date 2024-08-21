import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Profile, Signup } from './components/Auth'
import Navbar from './components/Nav'
import { Footer } from 'antd/es/layout/layout'
import FooterComponent from './components/Footer'
import { DeletePost, PublishPost, UpdatePost, ViewPost, ViewPostById } from './components/Post'
import { useSelector } from 'react-redux'
import { NotFound, Unauthorized } from './components/OtherPages'

function App() {
const {user,isAuth} =useSelector((state)=>state.user)
console.log(isAuth)
  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/publish-post' element={isAuth?<PublishPost/>:<Unauthorized/>}/>
      <Route path='/view-posts' element={<ViewPost/>}/>
      <Route path='/view-post/:id' element={<ViewPostById/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/update-post/:id' element={isAuth?<UpdatePost/>:<Unauthorized/>}/>
      <Route path='/delete-post/:id' element={isAuth?<DeletePost/>:<Unauthorized/>}/>
    </Routes>
    <FooterComponent/>
    </>
  )
}

export default App
