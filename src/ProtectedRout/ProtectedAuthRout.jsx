import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../Context/authcontex'
export default function ProtectedAuthRout({children}) {
const{isLoggedIn}=useContext(authContext)

  return !isLoggedIn? children:<Navigate to={'/'}/>
 
}
