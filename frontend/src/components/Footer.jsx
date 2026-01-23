import React from 'react';
import { assets } from '../assets/assets';
import {motion} from 'motion/react';

const Footer = () => {
  return (
    <motion.div 
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6}}
    className='px-6 md:px-16 lg:px-24 xl:px-40
        py-10 mt-32 text-sm bg-blue-950 text-white'>

            <motion.div 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}

            className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <div>        
                    <motion.img 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.2}}

                     src={assets.logo} alt="logo" className='h-8 md:h-9' style={{
                    filter:"brightness(0) saturate(100%) invert(62%) sepia(98%) saturate(749%) hue-rotate(72deg) brightness(97%) contrast(101%)",
                              }} />
                    <motion.p 
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5, delay: 0.4}}

                        className='max-w-80 mt-3'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for
                        all your driving needs.
                    </motion.p>
                    
                    <motion.div 
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5, delay: 0.5}}

                    className='flex items-center gap-3 mt-4'>
                        <a href="#"><img src={assets.facebook_logo} alt="facebook" className='h-6 w-6' /></a>
                        <a href="#"><img src={assets.instagram_logo} alt="twitter" className='h-6 w-6' /></a>
                        <a href="#"><img src={assets.twitter_logo} alt="instagram" className='h-6 w-6' /></a>
                        <a href="#"><img src={assets.gmail_logo} alt="linkedin" className='h-6 w-6' /></a>
                    </motion.div>
                </div>

               <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.4}}

                className="flex flex-wrap justify-between w-1/2 gap-8">

                    <div>
                        <h2 className='text-base font-medium uppercase '>Quick Links</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Browse Cars</a></li>
                            <li><a href="#">List Your Car</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-base font-medium uppercase'>Resources</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-base font-medium uppercase'>Contact</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li>Sec-26 New Mumbai Vashi</li>
                            <li> Maharashtra, Mumbai India </li>
                            <li>+91 9021951750</li>
                            <li>ruderohit@gmail.com</li>
                        </ul>
                    </div>

                </motion.div>

            </motion.div>

            <motion.div 
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.6}}

            className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </motion.div>
    </motion.div>
  );
};

export default Footer;