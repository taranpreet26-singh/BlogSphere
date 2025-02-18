import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const [tag, setTag] = useState("")
    const [id, setId] = useState("")
    async function main() {
        try {
            const response = await axios.get('https://blogsphere-backend-qnih.onrender.com/api/v1/user/info', {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(response)
            if (response.status === 200) {
                const str = response.data.msg.firstName
                setTag(str.substring(0, 1).toUpperCase())
                setId(response.data.msg.id)
            }

        } catch (error: any) {
            toast.error(error.response.data.msg)
        }

    }
    useEffect(() => {
        main()
    }, [tag, id])
    return (
        <div className='flex justify-between items-center  gap-2 p-2 px-10'>
            <div className='flex gap-4 items-center justify-center'>
                <div className='text-4xl cursor-pointer font-semibold ' onClick={() => {
                    navigate('/home')
                }}>
                    BlogSphere
                </div>
                {/* <div className=' text-xl hidden lg:flex w-full'>
                <input type="text" name="text" id="text" placeholder='search...' className='rounded-full h-10 px-4 bg-white w-[12rem]' />
            </div> */}
            </div>
            <div className='flex w-fit      items-center '>
                <div className='flex cursor-pointer   items-center  w-[12rem]  justify-end  '>
                    <div className=' hidden  md:flex  items-center justify-center  md:text-lg lg:text-xl w-full '>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => navigate('/write/blog')}
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
                        <div>
                            Write
                        </div>
                    </div>
                    <button onClick={() => {
                        navigate(`/profile/${id}`)
                    }} className='bg-black cursor-pointer  rounded-full h-10 w-12  text-white text-sm md:text-lg lg:text-xl p-2 flex items-center justify-center  font-semibold'>
                        {(tag) ? tag : <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="8" r="4" stroke-opacity="0.3" />
                            <rect x="4" y="14" width="16" height="6" rx="3" stroke-opacity="0.3" />
                        </svg>
                        }
                    </button>

                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Navbar