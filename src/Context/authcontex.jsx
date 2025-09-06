import React, { createContext, useEffect, useState } from 'react'
import { getuserDaTaApi } from '../Services/authServices'
export const authContext=createContext()
   
     export default function AuthContextProveder({children}) {
       const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("token")!=null)


const [userData,setUserData]=useState(null)

       async function getUserData(){
        const response=await getuserDaTaApi()
        // console.log(response)
        if(response.message=="success"){
          setUserData(response.user)

        }

       }
       useEffect(()=>{
        if(isLoggedIn){
getUserData()

        }else{
          setUserData(null)
        }
        
       },[isLoggedIn])
     return <authContext.Provider value={{isLoggedIn,setIsLoggedIn,userData,setUserData}}>
       {children}
     </authContext.Provider>
   
   
   
   
   }