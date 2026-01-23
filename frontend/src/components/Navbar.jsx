import React, { useEffect, useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import {AnimatePresence, motion} from 'motion/react';

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner,searchInput, setSearchInput} = useAppContext()

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);


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

    useEffect(() => {
    const closePopup = () => setShowProfile(false);
    window.addEventListener("click", closePopup);
    return () => window.removeEventListener("click", closePopup);
  }, []);


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
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 
          max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row 
          items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50
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
            value={searchInput} 
            onChange={(e)=> { 
               const value = e.target.value; 
              setSearchInput(value)

              if (value.trim() === '') {
                if (location.pathname !== '/') {
                  navigate('/')
                }
              }else{
                if (location.pathname !== '/cars') {
                  navigate('/cars')
                }
              }
            }}
            type="text"
            id="search"
            className={`py-1.5 w-full bg-transparent outline-none`}
            placeholder="Search products"
          />
          <label htmlFor="search">
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-100 cursor-pointer"
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

                
            {user ? (
              <div
                className="hidden sm:block relative" title="Account">
                {/* Avatar */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowProfile(!showProfile)
                  }}
                  className="cursor-pointer w-10 h-10 rounded-full bg-gray-700 text-white font-bold flex items-center justify-center"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </motion.button>

                {/* Popup */}
                <AnimatePresence>
                {showProfile && ( 
                  <motion.div 
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                      y: 0
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 12
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                      y: 0
                    }}
                    transition={{
                      duration: 0.50,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{
                      transformOrigin: "top center"
                    }}
                    className="absolute right-[-92px] py-5 mt-3 w-55 bg-white 
                    shadow-[0_5px_5px_rgba(0,0,0,0.25)] rounded-xl border z-50 border-none">

                    <div className="flex items-center justify-center">
                    <button className="
                      cursor-pointer w-10 h-10 rounded-full
                      bg-[rgb(136,147,151)]
                      text-white font-bold flex items-center justify-center">

                        {user.name?.charAt(0).toUpperCase()}

                      </button>
                    </div>

                    {/* User Info */}
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-center">{user.name}</p>
                      <p className="text-sm text-gray-400 text-center">{user.email}</p>
                    </div>

                    {/* Actions */}
                     <div className="flex flex-col p-2 text-sm"> 

                      <button onClick={() => navigate('/')} className="text-left px-3 py-2 hover:bg-gray-100 rounded">
                        Home
                      </button>
                      <button onClick={() => navigate('/cars')} className="text-left px-3 py-2 hover:bg-gray-100 rounded">
                        Cars
                      </button>
                      <button onClick={() => navigate('/my-bookings')} className="text-left px-3 py-2 hover:bg-gray-100 rounded">
                        My Bookings
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setShowProfile(false);
                        }}
                        className="text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                      >
                        Logout
                      </button>

                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>

            ) : (
              <button
                onClick={(e) =>{
                  setShowLogin(true)
                }}
                className="cursor-pointer px-8 py-2 bg-primary text-white rounded-lg"
              >
                Login
              </button>
            )}

            {/* Mobile: Logout button */}
            <button
              onClick={logout}
              className="block sm:hidden px-4 py-2 bg-primary text-white rounded-lg"
            >
              Logout
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
