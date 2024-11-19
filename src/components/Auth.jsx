import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { FaGoogle } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //SIGN IN FUNCTION
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email/Password");
      console.error("Login failed:", error.message);
    }
  };
  //SIGN IN WITH GOOGLE FUNCTION
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-lvh bg-cyan-950 flex flex-col gap-5 justify-center items-center">
        
        <div
          className="flex flex-col gap-3 w-80 min-w-max border p-5 rounded-xl bg-blue-50"
        >
          <h1 className="text-xl font-thin text-slate-500">Welcome to Docs App</h1>
          <h1 className="text-2xl font-semibold text-blue-900">Login</h1>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={signIn}>
            Login
          </Button>
          <button
            className="flex items-center gap-2 justify-center border-2 hover:bg-gray-700 hover:text-gray-100 border-gray-400 p-2"
            onClick={(e) => signInWithGoogle(e)}
          >
           <FaGoogle className="text-lg"/>  Sign In With Google
          </button>
        </div>
        <div className="">
          <p className="text-blue-400 hover:text-white hover:underline">
          <Link to="/signup">Don't have an account? Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
