import React from 'react'
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <div className='flex justify-center items-center gap-10 font-bold text-lg shadow-md py-3'>
     <Link to='/' >Home</Link>
     <Link to='/create' >Create Blog</Link>

    </div>
  )
}
