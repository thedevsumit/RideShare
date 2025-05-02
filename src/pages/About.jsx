import React from "react";
import { FaUsers, FaMapMarkedAlt, FaClock, FaShieldAlt, FaCode, FaDownload, FaUserGraduate, FaEnvelope, FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import image6 from "../assets/HeroImages/Image6.jpg"
import image7 from "../assets/HeroImages/Image7.jpg"

const AboutUs = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <FaMapMarkedAlt className="text-2xl sm:text-3xl md:text-4xl" />,
      title: "Smart Matching",
      desc: "We help you discover rides based on your pickup & drop points with real-time smart suggestions."
    },
    {
      icon: <FaUsers className="text-2xl sm:text-3xl md:text-4xl" />,
      title: "Community Focused",
      desc: "Ride with people you trust. Verified drivers form the core of our trusted network."
    },
    {
      icon: <FaClock className="text-2xl sm:text-3xl md:text-4xl" />,
      title: "On-Time Service",
      desc: "Reliability is our promise. Count on us to get you to your destination promptly, every time."
    },
    {
      icon: <FaShieldAlt className="text-2xl sm:text-3xl md:text-4xl" />,
      title: "Safety First",
      desc: "Your security is our priority with verified drivers and real-time ride tracking."
    }
  ];


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Header theme="dark" />
      {/* <Navigaton /> */}
      <section className="bg-[#f8efe4] py-10 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28 pt-[100px] sm:pt-[120px] md:pt-[150px] min-h-screen">
        <div className="max-w-6xl lg:max-w-[90%] xl:max-w-[85%] mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-bold mb-4 sm:mb-6 text-[#222] tracking-wide" style={{ WebkitTextStroke: "1.5px  #222", WebkitTextFillColor: "transparent" }}>
              About Our Service
            </h1>
            <div className="relative max-w-3xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 relative z-10 font-light px-2">
                At our ride-sharing platform, we're dedicated to providing you with a seamless and enjoyable experience. 
                Our curated network of trusted drivers ensures you arrive at your destination safely and on time.
              </p>
            </div>
          </motion.div>

          {/* Main Content Section */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-16 sm:mb-20 md:mb-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="flex items-center h-full"
            >
              <div className="relative w-full">
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#d92626] opacity-20"></div>
                <img 
                  src={image6} 
                  alt="Vintage Car" 
                  className="w-full h-auto rounded-lg shadow-xl object-cover"
                />
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-[#d92626] opacity-30"></div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins mb-4 sm:mb-6 md:mb-8 text-[#222] tracking-wide" style={{ WebkitTextStroke: "0.9px #222", WebkitTextFillColor: "transparent" }}>
                Our Commitment    
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 md:mb-6 font-light">
                Our mission is to revolutionize the way you move, offering a reliable and affordable alternative to traditional transportation. 
                We believe in creating a community where riders and drivers connect seamlessly for a better travel experience.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 md:mb-8 font-light">
                From the bustling city streets to the serene suburbs, our ride-sharing platform connects you to a world of possibilities. 
                Whether you're commuting to work, running errands, or seeking a night out on the town, we've got you covered.
              </p>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins text-center mb-8 sm:mb-12 md:mb-16 text-[#222] tracking-wide" style={{ WebkitTextStroke: "0.9px #222", WebkitTextFillColor: "transparent" }}>
              Why Choose Us?
            </h2>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -8 }}
                  className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 border-t-2 border-[#d92626]"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#d92626] rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-gray-800 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center font-light">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Destinations Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20 md:mb-24"
          >
            <div className="relative overflow-hidden rounded-xl bg-[#222] text-white p-6 sm:p-10 md:p-16">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins mb-4 sm:mb-6 md:mb-8 text-center tracking-wide" style={{ WebkitTextStroke:  "1px white", WebkitTextFillColor: "transparent" }}>
                  Explore Our Destinations
                </h2>
                <p className="text-sm sm:text-base text-center max-w-3xl mx-auto opacity-90 mb-6 sm:mb-8 md:mb-12 font-light">
                  From the bustling city streets to the serene suburbs, our ride-sharing platform connects you to a world of possibilities
                </p>
                <div className="flex justify-center">
                  <button 
                  onClick={() => navigate('/available')}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-[#d92626] text-white rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-[#c31e1e] transition duration-300">
                    Book a Ride
                  </button>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: `url(${image7})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
          </motion.div>

          {/* Made By Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-16 sm:mb-20 md:mb-24"
          >
            <div className="p-6 sm:p-8 md:p-10 text-center">
              <FaCode className="text-2xl sm:text-3xl md:text-4xl text-[#d92626] opacity-90 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-elegant font-medium text-gray-800 mb-3 sm:mb-4">
                Built by Dr B R Ambedkar National Institute of Technology, Jalandhar
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto font-light">
                RideShare started as a college project in 2025 and has since evolved into a platform that addresses real transportation challenges. 
                Our application combines technical innovation with environmental consciousness.
              </p>
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                <span className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 bg-[#f8efe4] text-gray-700 rounded-full text-xs sm:text-sm font-medium">DTI Project</span>
                <span className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 bg-[#f8efe4] text-gray-700 rounded-full text-xs sm:text-sm font-medium">Open Source</span>
                <span className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 bg-[#f8efe4] text-gray-700 rounded-full text-xs sm:text-sm font-medium">React • Node • MongoDB</span>
                <span className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 bg-[#f8efe4] text-gray-700 rounded-full text-xs sm:text-sm font-medium">© 2025-2026</span>
              </div>
            </div>
          </motion.div>

          {/* Contributions Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-16 sm:mb-20 md:mb-24"
          >
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <FaUserGraduate className="text-2xl sm:text-3xl md:text-4xl text-[#d92626] opacity-90 mx-auto mb-4 sm:mb-6" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins font-medium text-gray-800 mb-3 sm:mb-4">
                  Our Contributions
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-light">
                  The RideShare platform was developed as a solution to address transportation challenges and promote sustainable commuting options.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-10">
                <div className="bg-[#f8efe4] p-4 sm:p-6 md:p-8 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-gray-800">Project Information</h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                    <li className="flex items-center">
                      <FaUniversity className="mr-2 sm:mr-3 text-[#d92626] flex-shrink-0" />
                      <span><strong>Institution:</strong> Dr B R Ambedkar National Institute of Technology, Jalandhar</span>
                    </li>
                    <li className="flex items-center">
                      <FaEnvelope className="mr-2 sm:mr-3 text-[#d92626] flex-shrink-0" />
                      <span><strong>Contact:</strong> rideshare.nitj@gmail.com</span>
                    </li>
                    <li className="flex items-center">
                      <FaCode className="mr-2 sm:mr-3 text-[#d92626] flex-shrink-0" />
                      <span><strong>Branch:</strong> Computer Science & Engineering</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#f8efe4] p-4 sm:p-6 md:p-8 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-gray-800">Problem Solved</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                    Our project addresses the growing need for efficient and sustainable transportation solutions. 
                    We identified several key challenges in the current transportation ecosystem:
                  </p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700 ml-2">
                    <li>High carbon footprint from individual transportation</li>
                    <li>Rising commuting costs for students and professionals</li>
                    <li>Limited ride-sharing options for campus communities</li>
                    <li>Safety concerns in traditional ride-sharing models</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#f8efe4] p-4 sm:p-6 md:p-8 rounded-xl mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-gray-800">Our Solution</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                  The RideShare platform implements an innovative approach to campus transportation by creating a trusted 
                  community of drivers and riders from the same institution. Our application features intelligent 
                  route-matching algorithms, real-time ride tracking, and a reputation system to ensure safety and reliability.
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                  Through this platform, we've been able to reduce the carbon footprint of campus commuting, provide affordable 
                  transportation options, and foster a sense of community among users.
                </p>
                <div className="flex justify-center mt-6 sm:mt-8">
                  <a 
                    href="#" 
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#d92626] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#c31e1e] transition duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("https://drive.google.com/file/d/1N-ljUBgIvS3shitZJJ49HrXJHSQ7qNN8/view?usp=drive_link", "_blank");
                    }}
                  >
                    <FaDownload className="mr-2" />
                    Download Project Report
                  </a>
                </div>
              </div>
              
              
            </div>
          </motion.div>


        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;