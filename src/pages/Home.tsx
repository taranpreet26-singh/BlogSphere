import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cards from "../components/Cards";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  type BlogType = {
    id:string,
    title: string;
    subtitle: string;
    image: string;
    date: string;
    content: string;
    userId: string;
  };

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate()
  async function allBlog() {
    try {
      const response = await axios.get(`https://blogsphere-backend-qnih.onrender.com/api/v1/allblog`);
      const blogData: BlogType[] = response.data.msg;
      setBlogs(blogData);

      const userPromises = blogData.map((blog) => userInfo(blog.userId));

      const names = await Promise.all(userPromises);

      const nameMap: { [key: string]: string } = {};
      blogData.forEach((blog, index) => {
        nameMap[blog.userId] = names[index];
      });

      setUserNames(nameMap);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  async function userInfo(userId: string) {
    try {
      const response = await axios.get("https://blogsphere-backend-qnih.onrender.com/api/v1/userinfo", {
        params: { id: userId },
      });
      return response.data.msg.firstName;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return "Unknown"; 
    }
  }

  useEffect(() => {
    allBlog();
    
  }, []);

  return (
    <div>
      <Navbar />
      <hr />
      {(blogs.length >= 1)? blogs.map((blog, index) => (
        <div key={index} className="m-10" onClick={()=>{
          console.log(blog.id)
          navigate(`/blog/${blog.id}`)
        }}>
          <Cards name={userNames[blog.userId] || "Loading..."} title={blog.title} content = {blog.content} subtitle={blog.subtitle} date={blog.date} />
        </div>
      )) : 
          "No Blog Posted Yet"  }
    </div>
  );
};

export default Home;
