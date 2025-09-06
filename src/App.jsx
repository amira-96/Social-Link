import { useState } from 'react'
import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import MainLayout from './Layouts/MainLayout'
import FeedPage from './page/FeedPage'
import PostDetails from './page/PostDetails'
import ProfilePage from './page/ProfilePage'
import ChangePassword from './page/ChangePassword'
import NotFoundPage from './page/NotFoundPage'
import ProtectedAuthRout from './ProtectedRout/ProtectedAuthRout'
import ProtectedRout from './ProtectedRout/ProtectedRout'
import { AppBlurProvider } from './Context/AppBlurContext'

function App() {
  const router =createBrowserRouter([
    {path:"", element:<AuthLayout/>,children:[
      {path:"login", element:<ProtectedAuthRout> <LoginPage/> </ProtectedAuthRout> },
      {path:"register",element:<ProtectedAuthRout><RegisterPage/> </ProtectedAuthRout>}
  ]}
  ,{path:"",element:<MainLayout/>,children:[
    {index:true,element:<ProtectedRout> <FeedPage/></ProtectedRout>},
    {path:'post-details/:id',element: <ProtectedRout> <PostDetails/></ProtectedRout> },
    {path:'profile',element:<ProtectedRout> <ProfilePage/></ProtectedRout> },
    {path:'changepassword',element:<ProtectedRout> <ChangePassword/></ProtectedRout> },
    {path:'*' ,element:<NotFoundPage/>}
  ]}
  ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
