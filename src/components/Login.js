import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import img from '../images/splash.jpg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistring, setIsRegistring] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                navigate("/notes");
            }
        })
    }, [navigate]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate("/notes")
        }).catch((err) => alert(err.message));
    };

    const handleRegister = () => {
        if (registerInformation.password !== registerInformation.confirmPassword) {
            alert("Password must match");
            return
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
        .then(() => {
            navigate("/notes")
        }).catch((err) => alert(err.message));
    };

  return (
    <div className={isRegistring ? 'h-screen w-screen flex' : "h-screen w-screen flex flex-row-reverse"}>
        <div className='w-full md:w-1/2'>
            <div className='w-full flex justify-center items-center align-middle bg-white h-full'>
                {isRegistring ? (
                    <div className='flex flex-col gap-3 w-full bg-white max-w-sm p-2'>
                        <div className='flex flex-col gap-0 pb-3'>
                            <h2 className='font-semibold text-sm text-gray-500'>Sign up to</h2>
                            <h2 className='font-bold text-3xl -mt-1'>NoteHub</h2>
                        </div>
                        <div className=''>
                            <MdOutlineEmail className='text-xl absolute mt-3 ml-2 opacity-50' />
                            <input placeholder="Email" className='pl-10 border w-full py-2 rounded-lg outline-none duration-150 ease-in-out focus:shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px] border-black border-opacity-20 shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' type='email' value={registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})} />
                        </div>
                        <div>
                            <MdLockOutline className='text-xl absolute mt-3 ml-2 opacity-50' />
                            <input placeholder="Password" className='pl-10 border w-full py-2 rounded-lg outline-none duration-150 ease-in-out focus:shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px] border-black border-opacity-20 shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' type='password' value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})} />
                        </div>
                        <div>
                            <MdLockOutline className='text-xl absolute mt-3 ml-2 opacity-50' />
                            <input placeholder="Confirm Password" className='pl-10 border w-full py-2 rounded-lg outline-none duration-150 ease-in-out focus:shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px] border-black border-opacity-20 shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' type='password' value={registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})} />
                        </div>
                        <button className='bg-[#efefef] border outline-none border-black border-opacity-20 text-black py-2 rounded-lg shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' onClick={handleRegister}>Register</button>
                        <h2 className='mt-4 font-semibold text-sm cursor-pointer w-fit mx-auto text-gray-500' onClick={() => setIsRegistring(false)}>Already have an account? <span className='font-bold text-black'>Sign in</span></h2>
                        
                        <div className='relative flex py-2 items-center'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink mx-4 pb-1 font-semibold text-sm text-gray-500'>or</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>
                        <h2 className='font-semibold text-sm cursor-pointer w-fit mx-auto text-gray-500' onClick={() => navigate("/")}>Go back <span className='font-bold text-black'>Home</span></h2>
                    </div>
                    ):(
                    <div className='flex flex-col gap-3 w-full bg-white max-w-sm p-2'>
                        <div className='flex flex-col gap-0 pb-3'>
                            <h2 className='font-semibold text-sm text-gray-500'>Log in to</h2>
                            <h2 className='font-bold text-3xl -mt-1'>NoteHub</h2>
                        </div>
                        <div className=''>
                            <MdOutlineEmail className='text-xl absolute mt-3 ml-2 opacity-50' />
                            <input placeholder="Email" className='pl-10 border w-full py-2 rounded-lg outline-none duration-150 ease-in-out focus:shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px] border-black border-opacity-20 shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' type='email' onChange={handleEmailChange} value={email} />
                        </div>
                        <div>
                            <MdLockOutline className='text-xl absolute mt-3 ml-2 opacity-50' />
                            <input placeholder="Password" type='password' className='pl-10 border w-full py-2 outline-none duration-150 ease-in-out focus:shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px] rounded-lg border-black border-opacity-20 shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' onChange={handlePasswordChange} value={password} />
                        </div>
                        <button className='bg-[#efefef] border border-black outline-none border-opacity-20 text-black py-2 rounded-lg shadow-[rgba(0,_0,_0,_0.3)_0px_0px_10px]' onClick={handleSignIn}>Log in</button>
                        <h2 className='mt-4 font-semibold text-sm cursor-pointer w-fit mx-auto text-gray-500' onClick={() => setIsRegistring(true)}>Dont have an account? <span className='font-bold text-black'>Sign up</span></h2>

                        <div className='relative flex py-2 items-center'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink mx-4 pb-1 font-semibold text-sm text-gray-500'>or</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>
                        <h2 className='font-semibold text-sm cursor-pointer w-fit mx-auto text-gray-500' onClick={() => navigate("/")}>Go back <span className='font-bold text-black'>Home</span></h2>
                    </div>
                    )
                
                }
            </div>
        </div>
        <div className="hidden md:block w-1/2">
            <img src={img} alt='hero' className=' object-cover w-full h-full' />
        </div>
    </div>
  )
}

export default Login