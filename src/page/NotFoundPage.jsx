import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-sky-950 dark:text-sky-400 my-10 py-10">
      <div className="relative text-[12rem] font-extrabold leading-none mb-8 ">
        <span className="relative z-10 ">4</span>
        <span className="relative z-10 ">0</span>
        <span className="relative z-10">4</span>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <svg className="w-150 h-150 opacity-10 text-blue-500" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
      </div>
      
      <div className="flex space-x-8 text-center text-blue-600">
        <div className="relative">
          <p className="p-2 mb-2 bg-blue-100 rounded-lg shadow-md">Oops</p>
          <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-blue-100 transform rotate-45 -translate-y-1/2"></div>
          <div className="w-12 h-12 bg-blue-300 rounded-full mx-auto"></div>
        </div>
        <div className="relative">
          <p className="p-2 mb-2 bg-blue-100 rounded-lg shadow-md">Not Found</p>
          <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-blue-100 transform rotate-45 -translate-y-1/2"></div>
          <div className="w-12 h-12 bg-blue-300 rounded-full mx-auto"></div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-sky-950 dark:text-sky-400">Page Not Found</h1>
        <p className="text-lg text-sky-600 dark:text-sky-950">The page you're looking for doesn't exist or has been moved.</p>
        <Link to={"/"} className="mt-4 inline-block px-6 py-3 text-lg font-semibold text-sky-400 bg-sky-950  dark:bg-sky-400 dark:text-sky-950 rounded-full shadow-lg hover:bg-sky-800 transition-colors">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;