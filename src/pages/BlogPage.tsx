import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const BlogPage = () => {
  type blogType = {
    title: string,
    subtitle: string,
    image: string,
    content: string,
    date: string
  }

  const obj = {
    title: "",
    subtitle: "",
    image: "",
    content: '',
    date: ""
  }
  const [blogData, setBlogData] = useState<blogType>(obj)

  const params = useParams()
  console.log(params.id, "params")

  async function blogGet() {
    const response = await axios.get('https://blogsphere-backend-qnih.onrender.com/api/v1/blog', {
      params: {
        id: params.id
      }
    })
    console.log(response)
    setBlogData(response.data.msg)
  }
  useEffect(() => {
    blogGet()
  }, [params])

  return (
    <div>
      <Navbar />
      <hr />
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{blogData.title}</h1>
          <h3 className="text-xl italic text-gray-700">{blogData.subtitle}</h3>

          {/* Image placed here after subtitle */}
          <div className="mb-8">
            {(blogData.image) ? <img
              src={blogData.image}
              alt="Blog visual"
              className="w-full h-auto rounded-lg shadow-lg"
            /> : <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 250"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" fill="#E0E0E0">
                <animate attributeName="fill" values="#E0E0E0; #F5F5F5; #E0E0E0" dur="1.5s" repeatCount="indefinite" />
              </rect>
              <rect x="20" y="200" rx="4" ry="4" width="60%" height="20" fill="#D6D6D6">
                <animate attributeName="fill" values="#D6D6D6; #E0E0E0; #D6D6D6" dur="1.5s" repeatCount="indefinite" />
              </rect>
            </svg>
            }
          </div>

          <p className="text-sm text-gray-500">Posted On : {blogData.date.substring(0, blogData.date.indexOf("T"))}</p>
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">{blogData.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
