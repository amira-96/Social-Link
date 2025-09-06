import React from 'react'
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';



export default function DarckMood() {
 const [theme, setTheme] = useState(null);



  useEffect(() => {
          if (localStorage.getItem("theme") == null) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              document.documentElement.classList.add("dark");
              setTheme("dark");
            } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
              setTheme("light");
            }
          }
          if (localStorage.getItem("theme") != null) {
            if (localStorage.getItem("theme") == "dark") {
              document.documentElement.classList.add("dark");
              setTheme("dark");
            } else if (localStorage.getItem("theme") == "light") {
              setTheme("light");
            }
          }
        }, []);
        function toggleTheme() {
          document.documentElement.classList.toggle("dark");
          if (theme == "dark") {
            setTheme("light");
            localStorage.setItem("theme", "light");
          } else if (theme == "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          }
        }

  return (
    

 <div
      onClick={toggleTheme}
      className={`
        relative flex h-8 w-16 cursor-pointer items-center rounded-full transition-colors duration-300 animate-up-down-pulse
        ${theme === 'dark' ? 'bg-sky-500' : 'bg-sky-950'}
      `}
    >

          {/* sun icon*/}
        <svg
          className={`h-5 w-5 fill-white transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
          <path d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
        </svg>

        {/*moon icon*/}
        <svg
          className={`absolute h-5 w-5 fill-gray-600 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
          <path d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>
      {/* circle*/}
      <motion.div
        className="h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center"
        initial={false}
        animate={{
          x: theme === 'dark' ? '0.27rem' : '1rem', // تحديد موقع الدائرة بناءً على الوضع
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
      
      </motion.div>
    </div>
  )
}
