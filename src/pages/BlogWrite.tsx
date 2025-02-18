import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BlogWrite: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function addBlog() {
    try {
      if (!title || !subTitle || !file || !content) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subTitle);
      formData.append("content", content);
      formData.append("image", file); // Correct key "image"

      console.log([...formData]); // Debugging form data before sending

      const response = await axios.post(
        "https://blogsphere-backend-qnih.onrender.com/api/v1/blog/add",
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

  function onChangeImageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImagePreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  }
  function onkeydownHandler(e:React.KeyboardEvent<HTMLTextAreaElement>){
    if(e.key == "Enter"){
      setContent(prev=>prev + "\n")
    }
  }

  return (
    <div>
      <Navbar />
      <hr />
      <br />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
          Write a Blog
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <label className="block text-gray-700 font-medium mb-2">
          Upload an Image
        </label>
        <input
          type="file"
          className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:bg-green-500 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none file:hover:bg-green-600 transition-all"
          onChange={onChangeImageHandler}
        />

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-60 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onkeydownHandler}
          className="w-full p-3 mt-4 whitespace-pre-wrap h-40 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <button
          onClick={addBlog}
          className="mt-6 w-full cursor-pointer bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
        >
          Publish Blog
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default BlogWrite;
