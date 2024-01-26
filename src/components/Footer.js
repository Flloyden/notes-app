import React from 'react'
import img from '../images/notehub-logo.svg';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

  return (
    <div className='border-t py-16'>
        <div className='flex flex-col justify-center items-center align-middle'>
            <img src={img} alt='' className='h-[34px] cursor-pointer hover:scale-105 duration-300 ease-in-out' onClick={() => navigate("/")} />
            <div className='pt-8'>
                <ul className='flex gap-14 text-base font-medium text-gray-600'>
                    <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/")}>Home</li>
                    <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/pricing")}>Pricing</li>
                    <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/about")}>About</li>
                    <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/contact")}>Contact</li>
                </ul>
            </div>
            <div className='pt-4'>
                <ul className='flex gap-14 text-sm font-medium text-gray-600'>
                    <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/Terms")}>Terms of Use</li>
                    <li className='cursor-pointer hover:text-black duration-150' onClick={() => navigate("/Privacy")}>Privacy Policy</li>
                </ul>
            </div>
            <h2 className='text-xs pt-10'>© 2024 NoteHub</h2>
        </div>
        
    </div>
  )
}

export default Footer