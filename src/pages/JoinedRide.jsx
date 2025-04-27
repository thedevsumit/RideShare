import React, { useEffect } from 'react';
import JoinedRide from "../components/JoinRide"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { motion } from "framer-motion";

const JoinedRidePage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8efe4] relative overflow-hidden">

      <Header theme="dark" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <JoinedRide />
      </motion.div>
      <Footer />
    </div>
  )
}

export default JoinedRidePage
