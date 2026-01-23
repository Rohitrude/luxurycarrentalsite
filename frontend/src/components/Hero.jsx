import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import AIChatWidget from '../AI/AiChatBot';

const Hero = () => {

  const [pickupLocation, setPickupLocation] = useState('');

  const { pickupDate, navigate, setPickupDate, returnDate, setReturnDate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/cars?pickupLocation=' + pickupLocation +
      '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='min-h-screen flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 text-center bg-light px-4 py-8 sm:py-12 md:py-0'>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight">Luxury Cars on Rent</motion.h1>

      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}

        onSubmit={handleSearch} className='mt-4 md:mt-6 md:mb-[-25px] flex flex-col md:flex-row md:items-center justify-between p-3 sm:p-4 md:p-6 rounded-lg md:rounded-full w-full max-w-sm md:max-w-4xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex gap-3 sm:gap-4 flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto'>
          <div className='flex flex-col items-start gap-1 w-full md:w-auto'>
            <select required onChange={(e) => setPickupLocation(e.target.value)} className='w-full md:w-auto'>
              <option value="">Pickup Location</option>
              {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
            <p className='px-1 text-xs sm:text-sm text-gray-500'>{pickupLocation ? pickupLocation : "Please select location"}</p>
          </div>
          <div className='flex flex-col items-start gap-1 w-full md:w-auto'>
            <label htmlFor="pickupDate" className='text-xs sm:text-sm'>Pick-up Date</label>
            <input value={pickupDate} onChange={e => setPickupDate(e.target.value)}
              type='date' id='pickupDate' min={new Date().toISOString().split('T')[0]} className='text-xs sm:text-sm text-gray-500 w-full md:w-auto' required />
          </div>
          <div className='flex flex-col items-start gap-1 w-full md:w-auto'>
            <label htmlFor="pickupDate" className='text-xs sm:text-sm'>Return Date</label>
            <input value={returnDate} onChange={e => setReturnDate(e.target.value)} type='date' id='pickupDate' className='text-xs sm:text-sm text-gray-500 w-full md:w-auto' required />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex items-center justify-center gap-1 px-6 sm:px-8 md:px-9 py-2 sm:py-3 mt-3 md:mt-0 w-full md:w-auto bg-primary hover:bg-[#08ca08] text-white rounded-full cursor-pointer text-sm sm:text-base'>
          <img src={assets.search_icon} alt="search-icon" className='brightness-500 w-4 h-4 sm:w-5 sm:h-5' />
          Search
        </motion.button>
      </motion.form>

      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car} alt="car" className='max-h-48 sm:max-h-64 md:max-h-80 w-auto object-contain' />

      {/* AI Assistant */}
      <AIChatWidget />
    </motion.div>
  );
}

export default Hero;