import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import {motion} from 'motion/react';

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");

      if(data.success){
        setIsOwner(true);
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message
      toast.error(msg);
      // toast.error(error.message);
    }
  }

  return (
    <motion.div 
      initial={{y: -20, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
      className={`flex items-center justify-between px-6 md:px-16 
        lg:px-24 xl:px-32 py-4 border-b border-borderColor
         relative transition-all ${location.pathname === "/" ? "text-black" : ""
        }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center font-bold text-2xl gap-1">
        <motion.img whileHover={{scale: 1.05}}
          src={assets.logo}
          alt="logo"
          className="h-8"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(62%) sepia(98%) saturate(749%) hue-rotate(72deg) brightness(97%) contrast(101%)",
          }}
        />
        <span style={{ color: "#08d708" }}></span>
      </Link>

      {/* Menu Links */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50
        ${open
            ? "max-sm:translate-x-0 max-sm:bg-blue-950 text-white"
            : "max-sm:translate-x-full"
          }`}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className={`relative px-1 py-0.5 transition-colors hover:underline hover:underline-offset-4
             
              `}
          >
            {link.name}
          </Link>
        ))}

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border px-3 rounded-full max-w-56">
          <input
            type="text"
            id="search"
            className={`py-1.5 w-full bg-transparent outline-none`}
            placeholder="Search products"
          />
          <label htmlFor="search">
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-100"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            onClick={() => { isOwner ?
              navigate("/owner") : changeRole();
              setOpen(false);
            }}
            className={`cursor-pointer relative px-1 py-0.5 transition-colors hover:underline hover:underline-offset-4 max-sm:text-white`}
          >
            {isOwner ? 'Dashboard' : 'List Cars'}
          </button>

          <button
            onClick={() => {user ? logout() :
              setShowLogin(true);
              // setOpen(false);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden cursor-pointer p-2 rounded-md"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          style={{ filter: "invert(1)" }}
        />
      </button>
    </motion.div>
  );
};

export default Navbar;
