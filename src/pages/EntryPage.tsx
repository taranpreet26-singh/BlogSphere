import React from 'react'
import { useNavigate } from 'react-router-dom'

const EntryPageHome:React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='flex  h-screen justify-between '>
      <div className='left-side  p-14 w-screen lg:w-[70%]'>

        <div className=' text-[4rem] lg:text-[6rem] xl:text-[8rem] flex-col   font-semibold flex '>
          <div className=' flex items-center   '>
            Human
          </div>
          <div className='h-[10rem] flex items-center flex-wrap  mb-10   '>
          stories & idea
          </div> 
        </div>
        <div className='text-2xl '>
          <p className='flex flex-wrap'>A place to read, write, and deepen your understanding</p>
        </div>
        <div>
          <button onClick={()=>{
            if(localStorage.getItem('token')){
              navigate('/home')
            }else{
              navigate('/login')
            }
          }} className=' cursor-pointer bg-green-500 lg:bg-black p-2 text-white w-[12rem] rounded-full text-lg lg:text-2xl mt-10'>
            Start reading
          </button>
        </div>
      </div>
      <div className='right-side hidden lg:flex w-[30%] h-screen'>
        <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" className='h-[90%]' alt="pic" />
      </div>
    </div>
  )
}

export default EntryPageHome