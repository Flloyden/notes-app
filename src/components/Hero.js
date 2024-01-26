import React from 'react'
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl px-10 flex h-[95vh] mx-auto'>
        <div className='m-auto flex  pb-40 flex-col gap-6 max-w-2xl items-center'>
            <h1 className='text-5xl md:text-7xl font-bold capitalize'>Yes, Your personal Notes matters</h1>
            <h2 className='font-semibold text-gray-500'>
                NoteHub is a versatile and intuitive notes app designed to streamline 
                your daily organization and boost productivity. With its user-friendly 
                interface and powerful features, NoteHub ensures that organizing,
                and accessing your thoughts has never been easier.
            </h2>
            <button className='bg-blue-600 rounded text-white px-6 py-2 hover:scale-95 duration-300 ease-in-out' onClick={() => navigate("/login")}>Start now</button>
        </div>
    </div>
  )
}

export default Hero