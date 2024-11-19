import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from "../assets/logo.png"

const Header = () => {
   const  navigate = useNavigate()
    const logout = async (e) => {
        e.preventDefault();
        try {
          let result = confirm("Are you sure to Logout ?");
          if (result === true) {
            await signOut(auth);
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
       <div className="flex items-center w-full justify-between p-5 shadow-lg">
        <div className="flex gap-2 items-center">
          <img className='w-[42px]' src={logo} alt="" />
        <h1 className='text-2xl font-bold text-purple-700'>Docs <span className='text-black'>App</span></h1>
        </div>
        <Button variant='outlined' onClick={(e) => logout(e)}>Logout</Button>
        </div> 
    </>
  )
}

export default Header