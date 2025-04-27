import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaCompass } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';


const PageNotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
   <div>
    <Header theme="dark" />
    <div className="min-h-screen bg-[#f8efe4] flex flex-col justify-center pt-20 sm:pt-24 md:pt-28
     items-center px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28">
      <motion.div 
        className="max-w-3xl lg:max-w-[90%] xl:max-w-[85%] mx-auto w-full text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Error code */}
        <div className="relative mb-6 sm:mb-8">
          <h1 className="text-[100px] sm:text-[130px] md:text-[160px] lg:text-[220px] font-black text-[#222]/10 leading-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
            <FaCompass className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-[#d92626] animate-pulse" />
          </div>
        </div>

        {/* Error message */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#222] mb-3 sm:mb-4">
          Destination Not Found
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto">
          It seems like you've taken a wrong turn. The ride you're looking for doesn't exist or has been moved to a different location.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#222] text-white text-sm sm:text-base font-semibold rounded-md hover:bg-[#333] transition-colors"
          >
            <FaHome /> Back to Home
          </Link>
          
          <Link 
            to="/available" 
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white border border-[#222] text-[#222] text-sm sm:text-base font-semibold rounded-md hover:bg-[#f5f5f5] transition-colors"
          >
            <FaSearch /> Find Available Rides
          </Link>
        </div>
        
      </motion.div>
    </div>
    <Footer />
   </div>
  );
};

export default PageNotFound; 