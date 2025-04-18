import React from "react";
import { FaUsers, FaLeaf, FaMapMarkedAlt, FaCar, FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "./Header";
import Navigaton from "./Navigation";
import Footer from "./Footer";

const AboutUs = () => {
  const features = [
    {
      icon: <FaMapMarkedAlt className="text-4xl" />,
      title: "Smart Matching",
      desc: "We help you discover rides based on your pickup & drop points with real-time smart suggestions."
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community Focused",
      desc: "Ride with people you trust. Verified students and locals form the core of RideShare's trusted network."
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Eco Friendly",
      desc: "By sharing rides, you save fuel, reduce traffic, and help make transportation greener for everyone."
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Header />
      <Navigaton />
      <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-6 md:px-24 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-green-700 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-400">
                About RideShare
              </span>
            </h1>
            <div className="relative max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 relative z-10">
                RideShare is a smart, sustainable ride-sharing platform designed by
                students of NITJ. We make daily commutes safer, greener, and more
                affordable by connecting people heading the same way.
              </p>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-50 group"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Origin Story */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-green-600 p-8 flex items-center justify-center">
                <FaUniversity className="text-8xl text-white opacity-90" />
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  Built with ❤️ at NITJ
                </h2>
                <p className="text-gray-700 mb-6">
                  What began as a campus idea is now driving a greener, safer, and
                  smarter way to travel — one ride at a time. Join us in
                  transforming how India shares rides.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Student Project</span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Sustainable</span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Community First</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mt-20 grid md:grid-cols-4 gap-6 text-center"
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">1k+</div>
              <div className="text-gray-600">Rides Shared</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">5k+</div>
              <div className="text-gray-600">KMs Saved</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">2T+</div>
              <div className="text-gray-600">CO₂ Reduced</div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;