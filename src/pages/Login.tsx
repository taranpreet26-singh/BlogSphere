import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Leaf from '../components/Leaf'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword]  = useState("")

  async function onLoginHandler() {
   try {
     if(!email || !password){
       toast.error("Following field is empty")
     }else{
       const response = await axios.post('https://blogsphere-backend-qnih.onrender.com/api/v1/login',{
         email,
         password
       })
       if(response.data.token){

         toast.success(response.data.msg)
         localStorage.setItem("token",response.data.token)
         if(localStorage.getItem("token")){
           navigate('/home')
          }        
        }
     }
   } catch (error:any) {
      if(error.response.status === 402){
        toast.error(error.response.data.msg + "or" + "You're not Registered")

      }
   }
  }



  return (
    <div className='flex items-center justify-center  w-screen h-screen'>
      <Leaf />
      <div className='login flex flex-col p-10 items-center w-[30rem] lg:w-[40rem] justify-center relative z-[1000] opacity-90 bg-white rounded-xl h-fit'>
        <div className='text-2xl lg:text-4xl font-semibold'>
          Log In with email
        </div>
        <div className='flex flex-wrap  w-full text-center mt-2 text-2xl'>
          Enter the email address associated with your account, and we’ll provide amazing blogs
        </div>
        <div className='flex flex-col   w-full mt-10'>
          <label htmlFor="email" className='flex items-center justify-center text-xl'>Your Email</label>
          <input type="email" name="email" id="email" className='bg-gray-100 rounded-lg h-10 p-2 px-4' value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }} />
        </div>
        <div className='flex flex-col   w-full mt-10'>
          <label htmlFor="password" className='flex items-center justify-center text-xl'>Your Password</label>
          <input type="password" name="password" className='bg-gray-100 rounded-lg h-10 p-2 px-4' id="password"  onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
        </div>
        <div className='mt-10'>
          <button className='bg-black text-white cursor-pointer rounded-full h-12 text-xl font-semibold w-[12rem] ' onClick={onLoginHandler}>Continue</button>
        </div>
        <div className='mt-4 text-2xl hover:text-green-500 cursor-pointer' onClick={()=>{
                  navigate('/signup')
        }}>
          Sign Up
        </div>
      </div>
          <Toaster/>
    </div>
  )
}

export default Login