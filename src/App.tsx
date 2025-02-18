
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Main from './pages/Main'
import Home from './pages/Home'
import BlogWrite from './pages/BlogWrite'
import Profile from './pages/Profile'
import BlogPage from './pages/BlogPage'
import UpdateBlog from './pages/UpdateBlog'

function App() {
  const token = localStorage.getItem("token")

  return (
    <>
     <Routes>
        <Route  path={'/'} element={ (token)?<Home/> :<Main/>}/>
        <Route  path={'/home'} element={<Home/>}/>
        <Route  path={'/blog/:id'} element={<BlogPage/>}/>
        <Route  path={'/profile/:id'} element={<Profile/>}/>
        <Route  path={'/update/blog/:id'} element={<UpdateBlog/>}/>
        <Route path = {'/write/blog'} element={<BlogWrite/>}/>
        <Route  path={'/login'} element={<Login/>}/>
        <Route  path={'/signup'} element={<Singup/>}/>
     </Routes>
    </>
  )
}

export default App
