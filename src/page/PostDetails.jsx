
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getSinglePostsApi} from '../Services/PostServices.js'
import Post from '../Components/Posts/Posts.jsx';
import { AppBlurContext } from '../Context/AppBlurContext.jsx';
import { useContext } from 'react';

export default function PostDetailsPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // 1. استدعاء useNavigate

  async function getSinglePost() {
    const response = await getSinglePostsApi(id);
    console.log(response);
    if (response.message === "success") {
      setPost(response.post);
    }
  }

  // 3. دالة للتنقل إلى الصفحة الرئيسية
  const handleClose = () => {
    navigate('/'); 
  };

  useEffect(() => {
    getSinglePost();
   
  },[]);
  

  return (
    <div className=" flex items-center justify-center my-8">
      <div className="relative container max-w-sm sm:max-w-lg  lg:max-w-md  py-3 my-4 mx-auto rounded-xl shadow-xl border-1 border-stone-200 backdrop-blur-md bg-white">
        
        {/* 2. أيقونة الـ "X" في الزاوية العلوية اليمنى */}
        <button
          onClick={handleClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {post && <Post post={post} />}
      </div>
    </div>
  );
}
