import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/spotify-logo.png";

export default function Login() {
  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //validate, send data, connect to backend
  //   navigate("/home")
  // }
  return (
    <motion.section
      initial={{ opacity: 0.5, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="h-screen flex flex-col items-center justify-center rounded"
    >
      {/* Spotify Image Div */}
      <div>
        <motion.img
          whileHover={{ scale: 0.9, rotateZ: 5 }}
          src={Logo}
          alt="Logo"
          className="mx-auto mb-4 max-w-20 "
        />
      </div>

      {/* Form Div */}
      <div className="w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-md p-6 bg-white rounded-lg shadow-lg text-center space-y-5">
        <form action="" className="space-y-3">
          <input
            type="text"
            placeholder="Enter username"
            className="w-full px-3 py-2 border rounded-md bg-green-400"
          />
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md bg-green-400"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-md bg-green-400 text-white"
          />
        </form>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
          hover:bg-gradient-to-br  
          font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36"
        >
          <Link to="/home">Login</Link>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
          hover:bg-gradient-to-br  
          font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36"
        >
          Sign Up
        </motion.button>
      </div>
    </motion.section>
  );
}
