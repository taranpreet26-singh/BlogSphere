import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cards from '../components/Cards'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const Profile: React.FC = () => {

  type blogType = {
    title: String,
    subtitle: String,
    name: String,
    date: String
  }


  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [userBlog, setUserBlog] = useState<blogType[]>([])
  const [firstName, setfirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmailName] = useState("")
  const [count, setCount] = useState(0)

  const [isProfile, setIsProfile] = useState<HTMLDivElement | Boolean>(false)

  async function allBlog() {
    const response = await axios.get(`https://blogsphere-backend-qnih.onrender.com/api/v1/blog/read?searchStr=${search}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    setUserBlog(response.data.msg)
  }

  async function userInfo() {
    const response = await axios.get('https://blogsphere-backend-qnih.onrender.com/api/v1/user/info', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })

    console.log(response)
    setfirstName(response.data.msg.firstName)
    setLastName(response.data.msg.lastName)
    setEmailName(response.data.msg.email)

  }

  async function onDeleteHandler(id: string) {
    console.log(id)
    const response = await axios.delete('https://blogsphere-backend-qnih.onrender.com/api/v1/blog/delete', {
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data: {
        id
      }
    })
    console.log(response)
    setCount(count + 1)
  }


  useEffect(() => {

  }, [isProfile])
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      allBlog()
    }, 500);

    return () => {
      clearTimeout(delaySearch)
    }
  }, [search, count])
  useEffect(() => {
    userInfo()
  }, [])




  return (
    <div>
      <Navbar />
      <hr />
      <div className='bg-gray-200 w-[21rem] mx-auto rounded-xl h-20 text-3xl font-semibold  flex items-center justify-center gap-14 mt-10'>
        <div className='cursor-pointer hover:scale-105 duration-200' onClick={() => {
          setIsProfile(false)
          console.log(isProfile)
        }}>
          My Blog
        </div>
        <div className='cursor-pointer hover:scale-105 duration-200' onClick={() => {
          setIsProfile(true)
          console.log(isProfile)
        }}>
          My Profile
        </div>
      </div>

      {(isProfile) ?
        <div className=' w-full h-screen flex items-center pt-10 justify-start flex-col'>
          <div className=" w-full h-screen flex flex-col items-center pt-10">
            <h2 className="text-3xl font-bold">My Profile</h2>
            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg w-fit">
              <p className="text-xl">
                <strong>Name:</strong> {firstName} {lastName}
              </p>
              <p className="text-xl mt-2 ">
                <strong>Email:</strong> {email}
              </p>
              <p className="text-xl mt-2 ">
                <strong>Total Blogs:</strong> {userBlog.length}
              </p>
            </div>
          </div>
        </div>
        :
        <div className=' w-full h-screen flex items-center pt-10 justify-start flex-col'>
          <div>
            <input type="text" name="search" id="search" placeholder='Search Your Blog.....' value={search} onChange={(e) => {
              setSearch(e.target.value)
            }} className='bg-gray-300 w-full h-14 px-4 text-xl rounded-xl' />
          </div>
          <div className='overflow-y-scroll scrollbar-none hide-scrollbar'>
            {(userBlog.length > 0) ?
              userBlog.map((element: any, index: number) => {
                return <div key={index} className='m-10 '>
                  <div className=' w-full bg-gray-200 rounded-xl'>
                    <div className=' flex gap-2 items-center justify-end px-4'>

                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className='cursor-pointer'
                        onClick={() => {
                          navigate(`/update/blog/${element.id}`)
                        }}

                      >
                        <path
                          d="M3 20h18M6 4h12a2 2 0 0 1 2 2v12H4V6a2 2 0 0 1 2-2z"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10h8M8 14h5M15 10l-3 3"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                      </svg>
                      <img src='/public/delete.png' className='w-6 h-full cursor-pointer ' onClick={() => {
                        onDeleteHandler(element.id)
                      }} />
                    </div>
                    <div onClick={() => {
                      console.log(element.id)
                      navigate(`/blog/${element.id}`)
                    }}>
                      <Cards name={firstName} title={element.title} content={element.content} subtitle={element.subtitle} date={element.date} />
                    </div>
                  </div>
                </div>
              }):"No Blog Yet Posted"
            }:
          </div>
        </div>
      }
    </div>
  )
}

export default Profile