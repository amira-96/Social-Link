

import React, { useContext, useEffect, useState } from "react";
import userphoto from "../assets/userphoto.jpg"; 
import {handleFileInputImage} from '../Helper/helper.js'
import { uploadProfilePhotoApi } from "../Services/authServices.js";
import { Button } from "@heroui/react";
import { authContext } from "../Context/authcontex.jsx"; 

export default function ProfilePage({onClose,getAllPosts}) {
 // 1. تعريف حالتين (state) لتخزين الملف والصورة المعروضة
 const [imageFile, setImageFile] = useState(null);
 const [imagePreview, setImagePreview] = useState(userphoto);
 const [isUpdating, setIsUpdating] = useState(false);

 // الوصول إلى بيانات المستخدم من السياق
 const { userData } = useContext(authContext);


 // 2. دالة لرفع الصورة عند الضغط على زر منفصل
 async function uploadPhoto() {
  setIsUpdating(true);
  if (!imageFile) {
   console.log("No file selected.");
   return;
  }

  const formData = new FormData();
  formData.append("photo", imageFile);

  // استدعاء دالة الـ API
  const response = await uploadProfilePhotoApi(formData);
  console.log("Upload response:", response);
  onClose()
  setIsUpdating(false);
  setImagePreview(userphoto);
 }

 return (
  <div className="flex justify-center items-center min-h-screen py-10">
   <div className="relative flex flex-col items-center justify-center max-w-sm px-8 py-12 rounded-xl shadow-xl border-1 border-stone-200 backdrop-blur-md bg-white">
    <button
     onClick={onClose}
     className="absolute cursor-pointer top-2 right-2  rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
     </svg> </button>
    
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-6">
     <img
      src={imagePreview}
      alt="User Profile"
      className="w-full h-full object-cover rounded-full shadow-lg"
     />

     <label className="absolute top-0 right-0 cursor-pointer">
      <input
       type="file"
       className="hidden"
       onChange={(e) =>
        handleFileInputImage(e, setImageFile, setImagePreview)
       }
       accept="image/*"
      />
      {/* أيقونة الكاميرا SVG */}
      <svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
       className="w-8 h-8 text-black rounded-full p-1 border-2 border-gray-400 transform translate-x-1/4 -translate-y-1/4 shadow"
      >
       <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
       <circle cx="12" cy="13" r="4" />
      </svg>
     </label>
    </div>

    {/* إضافة اسم المستخدم والبريد الإلكتروني هنا */}
    <div className="text-center">
     <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">{userData?.name}</h2>
 <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
    <span>{userData?.email}</span>
  </p>    </div>

    <Button
     isLoading={isUpdating}
     className=" bg-sky-950 dark:bg-sky-400 mt-4 p-5 text-sky-400 dark:text-sky-950"
     isDisabled={!imageFile}
     onPress={uploadPhoto}
    >
     Upload
    </Button>
   </div>
  </div>
 );
}