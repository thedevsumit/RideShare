import { useEffect, useRef, useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import notification from "./SimpleNotification";
import { FaCar, FaTaxi, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRoute } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PublishRide = () => {
  const leavingfrom = useRef();
  const goingto = useRef();
  const dateofride = useRef();
  const timeride = useRef();
  const dispatch = useDispatch();
  const refTest = collection(db, "RideData");
  const navigate = useNavigate();

  const [vehicleType, setVehicleType] = useState("auto");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
  const width = isMobile ? "80vw" : "550px";
  const height = isMobile ? "80vw" : "550px";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState("auto");
  const [hasJoinedRide, setHasJoinedRide] = useState(false);

  useEffect(() => {
    // Check if user has already joined a ride
    const checkJoinedRide = () => {
      const joinedRide = localStorage.getItem("joinedRide");
      setHasJoinedRide(joinedRide === "1");
    };

    checkJoinedRide();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };
    window.addEventListener("resize", handleResize);

    const loadAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const options = {
          types: ["geocode"],
          componentRestrictions: { country: "in" },
        };

        const autocompleteLeaving = new window.google.maps.places.Autocomplete(
          leavingfrom.current,
          options
        );

        const autocompleteGoing = new window.google.maps.places.Autocomplete(
          goingto.current,
          options
        );

        autocompleteLeaving.addListener("place_changed", () => {
          const place = autocompleteLeaving.getPlace();
          console.log("Leaving From:", place.formatted_address);
          if (place.geometry) {
            console.log("Lat:", place.geometry.location.lat());
            console.log("Lng:", place.geometry.location.lng());
          }
        });

        autocompleteGoing.addListener("place_changed", () => {
          const place = autocompleteGoing.getPlace();
          console.log("Going To:", place.formatted_address);
          if (place.geometry) {
            console.log("Lat:", place.geometry.location.lat());
            console.log("Lng:", place.geometry.location.lng());
          }
        });
      }
    };

    if (document.readyState === "complete") {
      loadAutocomplete();
    } else {
      window.addEventListener("load", loadAutocomplete);
    }

    const preventSubmitOnEnter = (e) => {
      if (e.key === 'Enter' && (e.target === leavingfrom.current || e.target === goingto.current)) {
        e.preventDefault();
      }
    };

    leavingfrom.current?.addEventListener('keydown', preventSubmitOnEnter);
    goingto.current?.addEventListener('keydown', preventSubmitOnEnter);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", loadAutocomplete);
      leavingfrom.current?.removeEventListener('keydown', preventSubmitOnEnter);
      goingto.current?.removeEventListener('keydown', preventSubmitOnEnter);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);

    const hasJoined = localStorage.getItem("joinedRide") === "1";
    if (hasJoined) {
      notification.showError("You have already joined a ride. Please leave that ride before publishing a new one.");
      setIsSubmitting(false);
      return;
    }

    const leaving = leavingfrom.current.value;
    const going = goingto.current.value;
    const date = dateofride.current.value;
    const time = timeride.current.value;

    if (!leaving || !going || !date || !time) {
      notification.showError("Please fill in all the details first.");
      setIsSubmitting(false);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      notification.showError("You cannot publish a ride for a past date.");
      setIsSubmitting(false);
      return;
    }
    
    const username = window.localStorage.getItem("currLoggedInUser");
    
    if (!username) {
      notification.showError("Please login first to publish a ride.");
      setIsSubmitting(false);
      return;
    }
    
    const data = {
      leaving,
      going,
      date,
      time,
      vehicleType,
      count: 0,
      name: username,
    };

    try {
      await addDoc(refTest, data);
      notification.showSuccess("Successfully posted the ride.");
      
      leavingfrom.current.value = "";
      goingto.current.value = "";
      dateofride.current.value = "";
      timeride.current.value = "";
      setVehicleType("auto");
      setActiveVehicle("auto");
    } catch (err) {
      notification.showError("Error posting ride. Try again.");
      console.log(err)
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectVehicle = (type) => {
    setVehicleType(type);
    setActiveVehicle(type);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-[#f8efe4] min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28 lg:max-w-[90%] xl:max-w-[85%]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold mb-3 sm:mb-4 md:mb-6 text-[#222] tracking-wide" 
            style={{ 
              WebkitTextStroke: "1px #222", 
              WebkitTextFillColor: "transparent",
            }}
          >
            Publish Your Ride
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 relative z-10 font-light px-2">
              Share your journey and connect with fellow travelers. Make your commute more efficient and enjoyable.
            </p>
          </div>
        </motion.div>

        {/* Show warning banner if user has already joined a ride */}
        {hasJoinedRide && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have already joined a ride. Please leave that ride before publishing a new one.
                </p>
                <div className="mt-2">
                  <button 
                    className="text-sm font-medium text-yellow-700 hover:text-yellow-600 underline"
                    onClick={() => navigate('/joined')}
                  >
                    View my joined ride
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-[#222] py-3 sm:py-4 px-4 sm:px-6 md:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins text-white tracking-wide">Ride Details</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 font-poppins font-light">Fill in your journey information</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 font-poppins">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 sm:space-y-4"
                >
                  <motion.div variants={fadeIn}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Leaving From</label>
                    <div className="relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="h-4 w-4 sm:h-5 sm:w-5 text-[#d92626]" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                        placeholder="Enter starting point"
                        ref={leavingfrom}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Going To</label>
                    <div className="relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="h-4 w-4 sm:h-5 sm:w-5 text-[#d92626]" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                        placeholder="Enter destination"
                        ref={goingto}
                      />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <motion.div variants={fadeIn}>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
                      <div className="relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="h-4 w-4 sm:h-5 sm:w-5 text-[#d92626]" />
                        </div>
                        <input
                          type="date"
                          className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                          ref={dateofride}
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Time</label>
                      <div className="relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaClock className="h-4 w-4 sm:h-5 sm:w-5 text-[#d92626]" />
                        </div>
                        <input
                          type="time"
                          className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                          ref={timeride}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div variants={fadeIn}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                    <div className="grid grid-cols-2 gap-3 md:gap-5">
                      <button
                        type="button"
                        onClick={() => selectVehicle("auto")}
                        className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 border-2 rounded-lg transition-all ${
                          activeVehicle === "auto"
                            ? "border-[#d92626] bg-[#d92626]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <FaTaxi className={`text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2 ${
                          activeVehicle === "auto" ? "text-[#d92626]" : "text-gray-500"
                        }`} />
                        <span className={`text-xs sm:text-sm font-medium ${
                          activeVehicle === "auto" ? "text-[#d92626]" : "text-gray-700"
                        }`}>
                          Auto / Bus (8)
                        </span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => selectVehicle("taxi")}
                        className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 border-2 rounded-lg transition-all ${
                          activeVehicle === "taxi"
                            ? "border-[#d92626] bg-[#d92626]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <FaCar className={`text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2 ${
                          activeVehicle === "taxi" ? "text-[#d92626]" : "text-gray-500"
                        }`} />
                        <span className={`text-xs sm:text-sm font-medium ${
                          activeVehicle === "taxi" ? "text-[#d92626]" : "text-gray-700"
                        }`}>
                          Taxi / Car (3)
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
                
                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || hasJoinedRide}
                    className={`w-full flex items-center justify-center py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                      isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : hasJoinedRide
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-[#d92626] to-[#ff4f4f] hover:shadow-lg transform hover:scale-[1.01]"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publishing...
                      </>
                    ) : hasJoinedRide ? (
                      "Already joined a ride"
                    ) : (
                      "Publish Ride"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins mb-3 sm:mb-4 md:mb-6 text-[#222]">Why Share Your Ride?</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <FaRoute className="text-lg sm:text-xl text-[#d92626]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-800">Reduce Your Carbon Footprint</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Sharing rides helps reduce the number of vehicles on the road, decreasing emissions and traffic congestion.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d92626]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-800">Save on Travel Costs</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Split fuel costs and reduce expenses on your daily commute or long-distance travel by sharing rides.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d92626]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-800">Reduce Stress</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Sharing driving responsibilities can reduce fatigue and stress, especially on longer journeys.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d92626]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-800">Build Community</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Connect with fellow travelers, make new friends, and strengthen your campus community through shared journeys.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 md:mt-10 bg-[#f8efe4]/30 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-800 flex items-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#d92626]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                    Important Note
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    For safety and verification purposes, only NIT Jalandhar students can publish and join rides. All users are authenticated with their institutional email addresses.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublishRide;
