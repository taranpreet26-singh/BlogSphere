import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {  useParams } from 'react-router-dom'
import Navbar from './Navbar'

const UpdateBlog:React.FC = () => {
    type blogType = {
        id:string,
        title:string,
        subtitle:string,
        content:string,
        image:string
    }
    const [blog,setBlog]  = useState<blogType | null>(null)
    const [title, setTitle] = useState("");
      const [subTitle, setSubTitle] = useState("");
      const [content, setContent] = useState("");
      const [imagePreview, setImagePreview] = useState("");
      const [file, setFile] = useState<File | null>(null);


    const params = useParams()
    const [id,setId] = useState<string>('')
    async function updateBlog() {
        const response = await axios.get('https://blogsphere-backend-qnih.onrender.com/api/v1/blog',{
            params:{
                id:params.id
            },
           
        })
        console.log(response)
        setBlog(response.data.msg)
        setId(response.data.msg.id)
        setTitle(response.data.msg.title)
            setSubTitle(response.data.msg.subtitle)
            setContent(response.data.msg.content)
            setImagePreview(response.data.msg.image)
    }
    
    useEffect(()=>{
        updateBlog()
    },[])

     function onChangeImageHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
          const selectedFile = e.target.files[0];
          setImagePreview(URL.createObjectURL(selectedFile));
          setFile(selectedFile);
        }
      }


       async function uploadBlogServer() {
    try {
      if (!title || !subTitle || !file || !content) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("id",id)
      formData.append("title", title);
      formData.append("subtitle", subTitle);
      formData.append("content", content);
      formData.append("image", file); // Correct key "image"

      console.log([...formData]); // Debugging form data before sending

      const response = await axios.put(
        "https://blogsphere-backend-qnih.onrender.com/api/v1/blog/update",
        formData,
        {
          headers:{
            Authorization:localStorage.getItem("token")
          }
        }
       
      );

      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  }
    
  return (
    <div>
        <Navbar/>
        <hr/>
    <div className="min-h-screen flex items-center justify-center  p-4">
    {blog ? (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Blog</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e)=>{
                        console.log(e.target.value)
                        setTitle(e.target.value)
                    }}
                    value={title}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    onChange={(e)=>{
                        setSubTitle(e.target.value)
                    }}
                    value={subTitle}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                <input
                    type="file"
                    name="image"
                    onChange={onChangeImageHandler}
                    id="image"
                    
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
                    />
                {(imagePreview)?<img src={imagePreview}/>:<img src={blog.image}/>}
                <textarea
                    name="content"
                    id="content"
                    onChange={(e)=>{
                        setContent(e.target.value)
                    }}
                    value={content}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                <button onClick={uploadBlogServer} className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Update
                </button>
            </div>
        </div>
    ) : (
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
    )}
    </div>
    <Toaster/>
</div>
);
}

export default UpdateBlog