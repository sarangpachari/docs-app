import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { TextField } from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   SIGN UP FUNCTION
  const signUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Account Already Exists ! Please Sign In");
      navigate("/");
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <p className="text-gray-600 text-center mb-6">
          Create an account and make your docs safe
        </p>
        <form onSubmit={signUp}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Create Account
          </button>
          <p className="text-center mt-4 ">Already have an Account ? <Link to={"/"} className="hover:underline text-red-500">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
