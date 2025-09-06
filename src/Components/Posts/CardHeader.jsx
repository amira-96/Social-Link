import React from 'react'
import userphoto from '/src/assets/userphoto.jpg'
// import userphoto from '../assets/userphoto.jpg'


export default function CardHeader({avatar,header,subheader}) {
  return (
                    <div className="flex  justify-center  ">
                    <img onError={(e)=>e.target.src=userphoto}className=" rounded-full w-10 h-10 mr-3" src={avatar} alt="user Avatar"/>
                    <div>
                        <h3 className="text-md font-semibold text-sky-950 dark:text-sky-400">{header}</h3>
                        <p className="text-xs  text-sky-400 dark:text-sky-950">{subheader}</p>
                    </div>
                </div>
          
  )
}
