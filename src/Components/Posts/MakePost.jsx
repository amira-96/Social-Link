 
import React, { useRef, useState, useContext } from "react";
import userphoto from '/src/assets/userphoto.jpg'; // صورة افتراضية
import { addPostsApi } from "../../Services/PostServices";
import { handleFileInputImage } from "../../Helper/helper.js";
import { authContext } from "../../Context/authcontex.jsx";

export default function MakePost({ getAllPosts }) {
    // جلب بيانات المستخدم من الـ AuthContext
    const { userData } = useContext(authContext);

    const [showForm, setShowForm] = useState(false);
    const [postCaption, setpostCaption] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagPreview, setImagePreview] = useState("");
    const [isPostSumbiting, setIsPostSumbitting] = useState(false);
    const inputfile = useRef();

    async function handleCreatePOSTsubmiting(e) {
        e.preventDefault();

        if (postCaption.trim() === "" && imageFile === null) {
            return;
        }

        setIsPostSumbitting(true);

        const formData = new FormData();
        if (postCaption) {
            formData.append("body", postCaption);
        }
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const response = await addPostsApi(formData);
        console.log(response);

        if (response && response.message === "success") {
            await getAllPosts();
            restForm();
            setShowForm(false);
        }
        setIsPostSumbitting(false);
    }

    function restForm() {
        setImageFile(null);
        setImagePreview("");
        setpostCaption("");
        inputfile.current.value = "";
    }

    return (
        <div    className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* show image profile and form post*/}
            <div className="flex items-center space-x-4 mb-4">
                {/* صورة البروفايل */}
                <img
                    src={userData?.photo || userphoto} // استخدام صورة المستخدم من الـ Context
                    alt="User Profile"
                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                    onClick={() => setShowForm(true)} // عند الضغط عليها، تفتح الفورم
                />
                
                {/* حقل الإدخال أو الزر الذي يفتح الفورم */}
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex-grow text-left text-sky-950 hover:text-sky-700 bg-gray-100 rounded-full px-4 py-3 transition duration-200 cursor-pointer"
                    >
                        What's on your mind? Share a post...
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleCreatePOSTsubmiting} className="space-y-4">
                    {/* حقل النص (caption) */}
                    <div>
                        <textarea
                            autoFocus
                            value={postCaption}
                            onChange={(e) => setpostCaption(e.target.value)}
                            placeholder="What's on your mind?..."
                            className="w-full px-4 py-4 text-gray-700  border border-gray-300 rounded-lg focus:ring-1 focus:bg-gray-100"
                            rows="3"
                        />
                    </div>
                    {/* معاينة الصورة */}
                    {imagPreview && (
                        <div className="relative">
                            <img
                                src={imagPreview}
                                alt="Preview"
                                className="w-full max-h-64 object-cover rounded-lg"
                            />
                            <button
                                onClick={restForm}
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200 cursor-pointer"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    {/* أزرار الإجراءات */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* زر تحميل الصورة */}
                            <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
                                <input
                                    onChange={(e) => handleFileInputImage(e, setImageFile, setImagePreview)}
                                    type="file"
                                    ref={inputfile}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-6 h-6 text-sky-700"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm text-sky-950  dark:text-sky-400 font-medium">Photo</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowForm(false)}
                                type="button"
                                className="px-4 py-2 text-sky-950 dark:text-sky-400 hover:text-gray-800 transition duration-200 disabled:opacity-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={(postCaption.trim() === "" && imageFile === null) || isPostSumbiting}
                                type="submit"
                                
                                className="bg-sky-950 text-sky-400 dark:bg-sky-400 dark:text-sky-950 px-6 py-2 rounded-4xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
                            >
                                {isPostSumbiting ? (
                                    <span className="flex items-center space-x-2">
                                        <svg
                                            className="animate-spin h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Posting...</span>
                                    </span>
                                ) : (
                                    "Post"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}


