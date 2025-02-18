import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Leaf from '../components/Leaf'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast';

const Singup:React.FC = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [password,setPassword] = useState("")

  async function onSignUp(){
   try {
     if(!email || !firstName || !lastName || !password ){ 
       toast.error("Enter the all field")
       return
      }else{
          const response = await axios.post('https://blogsphere-backend-qnih.onrender.com/api/v1/signup',{
          email,
          firstName,
          lastName,
          password
        })
       toast.success(response.data.msg)
       navigate('/login')
      } 
      
      
    } catch (error:any) {
      if(error.response.status === 402){
       
       toast.error(error.response.data.msg)
      }
   }
  }

  return (
    <div className='flex items-center justify-center  w-screen h-screen'>
      <Leaf />
      <div className='login flex flex-col p-10 items-center w-[30rem] lg:w-[40rem] justify-center relative z-[1000] opacity-90 bg-white rounded-xl h-fit'>
        <div className='text-2xl lg:text-4xl font-semibold'>
          Sign up
        </div>
        <div className='flex flex-wrap  w-full text-center mt-2 text-2xl'>
          Enter the email address associated with your account, and we’ll send a magic link to your inbox.
        </div>
        <div className='flex flex-col   w-full mt-10'>
          <label htmlFor="email" className='flex items-center justify-center text-xl'>Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e)=>{
            setEmail(e.target.value)
            console.log(e.target.value)
          }} className='bg-gray-100 rounded-lg h-10 p-2 px-4'  required/>
        </div>
        <div className='flex flex-col   w-full mt-10'>
          <label htmlFor="firstName" className='flex items-center justify-center text-xl'>FirstName</label>
          <input type="text" name="firstName" value={firstName} onChange={(e)=>{
            setFirstName(e.target.value)
          }} id="firstName" className='bg-gray-100 rounded-lg h-10 p-2 px-4'  required/>
        </div>
        <div className='flex flex-col   w-full mt-10'>
          <label htmlFor="lastName" className='flex items-center justify-center text-xl'>LastName</label>
          <input type="text" value={lastName} onChange={(e)=>{
            setLastName(e.target.value)
          }}  name="lastName" id="lastName" className='bg-gray-100 rounded-lg h-10 p-2 px-4'  required/>
        </div>
        <div className='flex flex-col   w-full mt-10'>
          <label htmlFor="password" className='flex items-center justify-center text-xl'>Password</label>
          <input type="password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}  name="password" className='bg-gray-100 rounded-lg h-10 p-2 px-4'  id="password"  />
        </div>
        <div className='mt-10'>
          <button className='bg-black text-white cursor-pointer rounded-full h-12 text-xl font-semibold w-[12rem] ' onClick={onSignUp}>Continue</button>
        </div>
      </div>
      <Toaster position="top-center"  />
    </div>
  )
}

export default Singup