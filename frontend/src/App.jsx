import React from 'react'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import AllCourses from '../components/AllCourses'
import CourseDetail from '../components/CourseDetail'
import Navbar from '../components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from '../components/Profile'
import Contact from '../components/Contact'
import MyCourses from '../components/MyCourses'
import CourseVideoPage from '../components/CourseVideoPage'
import Reviews from '../components/Reviews'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
    
      <Routes>
        <Route path='/' element={<AllCourses/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/login' element={<Signin/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/my-courses' element={<MyCourses/>}></Route>
        <Route path='/my-courses/:id' element={<CourseVideoPage/>}></Route>
        <Route path="/course/:id" element={<CourseDetail/>} /> {/* Dynamic route */}
      </Routes>
    </BrowserRouter>
  )
}

export default App