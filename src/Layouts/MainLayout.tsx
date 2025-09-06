import { Navbar } from '@heroui/react'
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import CustomNavbar from '../Components/Navbar/CustomNavbar'
import { AppBlurContext } from '../Context/AppBlurContext'
export default function MainLayout() {
   const {isBlurred}=useContext(AppBlurContext)
  return (
    <div className='relative'>
      <CustomNavbar/>
      <main className={`transition-all duration-500 ${isBlurred ? 'blur-md pointer-events-none' : ''}`}>
        <Outlet />
      </main>

      
    </div>
  )
}
