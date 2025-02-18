import React from 'react'
import { useNavigate } from 'react-router-dom'

const EntryNavbar:React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center   p-8'>
        <div className='text-4xl  font-semibold '>
        BlogSphere
        </div>
        <div className='flex w-[42rem]  gap-6    items-center '>
            <div className=' text-xl w-full'>
                <ul className=' hidden  lg:flex gap-10 w-full justify-center items-center  '>
                    <li>Our Story</li>
                    <li>Membership</li>
                    <li>Write</li>
                    
                </ul>
            </div>
            <div className='flex   items-center  w-full  justify-center '>
            <div className=' hidden md:flex  md:text-lg lg:text-xl w-full  cursor-pointer' onClick={()=>{
                navigate('/signup')
            }} >Sign Up</div>
                <button onClick={()=>{
                    if(localStorage.getItem('token')){
                        navigate('/home')
                    }else{
                        navigate('/login')
                    }
                }} className='bg-black cursor-pointer  rounded-full h-10 w-full  text-white text-sm md:text-lg lg:text-xl p-2 flex items-center justify-center  font-semibold'>
                    Get Started
                </button>
            </div>
        </div>
    </div>
  )
}

export default EntryNavbar