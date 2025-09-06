import React from 'react'

export default function Postbody({caption,image}) {
  return (
    <>
            {caption&&<p className='dark:text-black'>{caption}</p>}
            {image&&<img className='w-full h-100 object-cover mt-2  ' src={image}alt="image profile" />}
    
    </>
  )
}
