import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { decrementNestedValue } from "./Decrement";
import notification from "./SimpleNotification";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaCar, FaTrashAlt, FaRoute } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JoinRide = () => {
  const navigate = useNavigate();
  
  const { currentValue, newItem } = useSelector((store) => store.items);
  const [filteredRides, setFilteredRides] = useState([]);
  const [showride, hideride] = useState(1);
  const [isLeaving, setIsLeaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const handleRemove = async (docID, key) => {
    setIsLeaving(true);
    try {
      await decrementNestedValue(docID, key);
      hideride(0);
      localStorage.removeItem("ridedata");
      localStorage.removeItem("joinedRide");
      notification.showSuccess("Successfully left the ride.");
      
      // Redirect to available rides after short delay
      setTimeout(() => {
        navigate('/available');
      }, 2000);
      
    } catch (error) {
      console.error("Error leaving ride:", error);
      notification.showError("There was a problem leaving the ride. Please try again.");
    } finally {
      setIsLeaving(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    
    const getRideData = () => {
      try {
        let rideData = localStorage.getItem("ridedata");
        
        if (rideData) {
          if (rideData.startsWith('"') || rideData.startsWith('{')) {
            try {
              rideData = JSON.parse(rideData);
            } catch (error) {
              console.error("Error parsing ridedata as JSON:", error);
            }
          }
          
          if (newItem && newItem.length > 0) {
            // Find the ride in the Redux store
            const filtered = newItem.filter((trip) => trip.id === rideData);
            
            if (filtered.length > 0) {
              setFilteredRides(filtered);
            } else {
              console.warn("Joined ride not found in available rides");
              localStorage.removeItem("ridedata");
              localStorage.removeItem("joinedRide");
            }
            
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error processing ride data:", error);
        setLoading(false);
      }
    };
    
    if (newItem && newItem.length > 0) {
      getRideData();
    }
  }, [newItem, navigate]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeOut"
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
            Your Joined Rides
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 relative z-10 font-light px-2">
              Track and manage your upcoming journeys. View details of the rides you've joined and make changes when needed.
            </p>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#d92626] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700">Loading your rides...</p>
          </div>
        ) : filteredRides.length === 0 || showride === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-white rounded-xl shadow-lg"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-[#f8efe4] rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaCar className="text-3xl sm:text-4xl md:text-5xl text-[#d92626]" />
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins mb-3 sm:mb-4 bg-gradient-to-r from-[#d92626] to-[#ff4f4f] bg-clip-text text-transparent">
              No Joined Rides
            </h2>
            
            <div className="bg-[#f8efe4]/30 rounded-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 max-w-md">
              <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
                You haven't joined any rides yet. Browse available rides to find your perfect journey partner and start traveling together.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/available')}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#d92626] to-[#ff4f4f] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <FaRoute className="mr-2" />
              Find Available Rides
            </button>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {filteredRides.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white overflow-hidden shadow-xl rounded-xl mb-6 sm:mb-8 transform transition-all duration-300"
              >
                {/* Card Header with gradient background */}
                <div className="bg-gradient-to-r from-[#d92626] to-[#ff4f4f] px-4 sm:px-6 py-3 sm:py-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-white opacity-10 rounded-full transform translate-x-8 sm:translate-x-12 md:translate-x-16 -translate-y-8 sm:-translate-y-12 md:-translate-y-16"></div>
                  <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 -left-3 sm:-left-4 md:-left-6 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-white">Your Joined Ride</h3>
                    <span className="text-2xs sm:text-xs bg-white/20 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-white">
                      ID: {trip.id.substring(0, 6)}...
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  {/* Date and Time Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 gap-3 sm:gap-0">
                    <div className="flex items-center p-2 bg-[#f8efe4]/50 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 sm:mr-3">
                        <FaCalendarAlt className="text-sm sm:text-base text-[#d92626]" />
                      </div>
                      <div>
                        <p className="text-2xs sm:text-xs text-gray-500 uppercase tracking-wide font-medium">Date</p>
                        <span className="font-medium text-gray-800">{trip.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-2 bg-[#f8efe4]/50 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 sm:mr-3">
                        <FaClock className="text-sm sm:text-base text-[#d92626]" />
                      </div>
                      <div>
                        <p className="text-2xs sm:text-xs text-gray-500 uppercase tracking-wide font-medium">Time</p>
                        <span className="font-medium text-gray-800">{trip.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Route Section */}
                  <div className="mb-6 sm:mb-8 relative">
                    <div className="absolute top-0 bottom-0 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-[#d92626] to-[#ff4f4f] z-0 rounded-full"></div>
                    
                    <div className="flex items-start mb-5 sm:mb-6 relative z-10">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-white border-2 border-[#d92626] flex items-center justify-center shadow-md">
                        <FaMapMarkerAlt className="h-3 w-3 sm:h-5 sm:w-5 text-[#d92626]" />
                      </div>
                      <div className="ml-3 sm:ml-4 bg-[#f8efe4]/30 p-2 sm:p-3 rounded-lg w-full">
                        <p className="text-2xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">FROM</p>
                        <p className="text-sm sm:text-base md:text-xl text-gray-800 font-medium leading-tight">{trip.leaving}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start relative z-10">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-white border-2 border-[#ff4f4f] flex items-center justify-center shadow-md">
                        <FaMapMarkerAlt className="h-3 w-3 sm:h-5 sm:w-5 text-[#ff4f4f]" />
                      </div>
                      <div className="ml-3 sm:ml-4 bg-[#f8efe4]/30 p-2 sm:p-3 rounded-lg w-full">
                        <p className="text-2xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">TO</p>
                        <p className="text-sm sm:text-base md:text-xl text-gray-800 font-medium leading-tight">{trip.going}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rider Details Section */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1 sm:mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#f8efe4] flex items-center justify-center mr-2">
                            <FaUser className="text-xs sm:text-sm text-[#d92626]" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">Ride Published By</span>
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-800 ml-8 sm:ml-10">{trip.name}</p>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1 sm:mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#f8efe4] flex items-center justify-center mr-2">
                            <FaCar className="text-xs sm:text-sm text-[#d92626]" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">Vehicle Type</span>
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-800 ml-8 sm:ml-10 capitalize">{trip.vehicleType}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemove(trip.id, "count")}
                      disabled={isLeaving}
                      className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#d92626]/10 text-[#d92626] rounded-lg text-xs sm:text-sm font-medium transition-all hover:bg-[#d92626]/20 ${isLeaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FaTrashAlt className="mr-2" />
                      {isLeaving ? 'Leaving Ride...' : 'Leave Ride'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinRide;
