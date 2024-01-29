import React, { useEffect, useState } from 'react'
import img from '../images/notehub-logo.svg';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

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
        <div className='flex gap-4 items-center'>
          <button className='bg-black rounded text-white px-6  hover:scale-105 duration-300 ease-in-out min-w-28 min-h-10 max-h-10 md:max-h-20' onClick={() => navigate("/login")}>{text}</button>
        </div>
    </div>
  )
}

export default Navbar