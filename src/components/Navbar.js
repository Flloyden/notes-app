import React, { useEffect, useState } from 'react'
import img from '../images/notehub-logo.svg';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("")

    useEffect(() => {
        auth.onAuthStateChanged(user => {
          if(user) {
            setText("My notes");
          } else if (!user) {
            setText("Sign in");
          }
      })
    }, [])

  return (
    <div className='flex justify-between max-w-7xl items-center align-middle m-auto py-4 px-4 md:px-10'>
        <img src={img} alt='' className='h-[34px] cursor-pointer hover:scale-105 duration-300 ease-in-out' onClick={() => navigate("/")} />
        <ul className='gap-10 text-lg font-medium text-gray-600 hidden md:flex'>
            <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/")}>Home</li>
            <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/pricing")}>Pricing</li>
            <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/about")}>About</li>
            <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/contact")}>Contact</li>
        </ul>
        <div className='flex gap-4 items-center'>
          <button className='bg-black rounded text-white px-6  hover:scale-105 duration-300 ease-in-out min-w-28 min-h-10 max-h-10 md:max-h-20' onClick={() => navigate("/login")}>{text}</button>
          <IoMenu className='w-12 h-12 cursor-pointer md:hidden' onClick={() => alert("NAV")} />
        </div>
    </div>
  )
}

export default Navbar