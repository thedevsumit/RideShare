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



  return (
    <div className="bg-[#f8efe4] min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-16 xl:px-24 lg:max-w-[90%] xl:max-w-[85%]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins font-bold mb-2 sm:mb-3 md:mb-4 text-[#222] tracking-wide" 
            style={{ 
              WebkitTextStroke: "1px #222", 
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Joined Rides
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm md:text-base text-gray-700 relative z-10 font-light px-2">
              Track and manage your upcoming journeys. View details of the rides you've joined and make changes when needed.
            </p>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-3 sm:border-4 border-[#d92626] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-700">Loading your rides...</p>
          </div>
        ) : filteredRides.length === 0 || showride === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 bg-white rounded-xl shadow-lg"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 sm:mb-5 md:mb-6">
              <div className="absolute inset-0 bg-[#f8efe4] rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaCar className="text-2xl sm:text-3xl md:text-4xl text-[#d92626]" />
              </div>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-poppins mb-2 sm:mb-3 bg-gradient-to-r from-[#d92626] to-[#ff4f4f] bg-clip-text text-transparent">
              No Joined Rides
            </h2>
            
            <div className="bg-[#f8efe4]/30 rounded-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 md:mb-6 max-w-md">
              <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                You haven't joined any rides yet. Browse available rides to find your perfect journey partner and start traveling together.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/available')}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#d92626] to-[#ff4f4f] text-white rounded-lg text-xs sm:text-sm md:text-base font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <FaRoute className="mr-1.5 sm:mr-2" />
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
                className="bg-white overflow-hidden shadow-xl rounded-xl mb-4 sm:mb-6 transform transition-all duration-300"
              >
                {/* Card Header with gradient background */}
                <div className="bg-gradient-to-r from-[#d92626] to-[#ff4f4f] px-3 sm:px-4 py-2 sm:py-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 bg-white opacity-10 rounded-full transform translate-x-6 sm:translate-x-10 -translate-y-6 sm:-translate-y-10"></div>
                  <div className="absolute -bottom-3 -left-3 w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 bg-white opacity-10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-white">Your Joined Ride</h3>
                    <span className="text-[0.6rem] sm:text-xs bg-white/20 rounded-full px-1 sm:px-1.5 py-0.5 text-white">
                      ID: {trip.id.substring(0, 6)}...
                    </span>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 md:p-5">
                  {/* Date and Time Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5 gap-2 sm:gap-0">
                    <div className="flex items-center p-1.5 sm:p-2 md:p-2.5 bg-[#f8efe4]/50 rounded-lg">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white shadow-sm flex items-center justify-center mr-1.5 sm:mr-2">
                        <FaCalendarAlt className="text-[0.65rem] sm:text-xs md:text-sm text-[#d92626]" />
                      </div>
                      <div>
                        <p className="text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-wide font-medium">Date</p>
                        <span className="text-[0.65rem] sm:text-xs md:text-sm font-medium text-gray-800">{trip.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-1.5 sm:p-2 md:p-2.5 bg-[#f8efe4]/50 rounded-lg">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white shadow-sm flex items-center justify-center mr-1.5 sm:mr-2">
                        <FaClock className="text-[0.65rem] sm:text-xs md:text-sm text-[#d92626]" />
                      </div>
                      <div>
                        <p className="text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-wide font-medium">Time</p>
                        <span className="text-[0.65rem] sm:text-xs md:text-sm font-medium text-gray-800">{trip.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Route Section */}
                  <div className="mb-3 sm:mb-4 md:mb-5 relative">
                    <div className="absolute top-0 bottom-0 left-3 sm:left-4 md:left-5 w-0.5 bg-gradient-to-b from-[#d92626] to-[#ff4f4f] z-0 rounded-full"></div>
                    
                    <div className="flex items-start mb-3 sm:mb-4 relative z-10">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full bg-white border-2 border-[#d92626] flex items-center justify-center shadow-md">
                        <FaMapMarkerAlt className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#d92626]" />
                      </div>
                      <div className="ml-2 sm:ml-3 bg-[#f8efe4]/30 p-1.5 sm:p-2 md:p-2.5 rounded-lg w-full">
                        <p className="text-[0.6rem] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">FROM</p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium leading-tight">{trip.leaving}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start relative z-10">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full bg-white border-2 border-[#ff4f4f] flex items-center justify-center shadow-md">
                        <FaMapMarkerAlt className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#ff4f4f]" />
                      </div>
                      <div className="ml-2 sm:ml-3 bg-[#f8efe4]/30 p-1.5 sm:p-2 md:p-2.5 rounded-lg w-full">
                        <p className="text-[0.6rem] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">TO</p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium leading-tight">{trip.going}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rider Details Section */}
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 mb-3 sm:mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-0.5 sm:mb-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#f8efe4] flex items-center justify-center mr-1.5 sm:mr-2">
                            <FaUser className="text-[0.6rem] sm:text-xs text-[#d92626]" />
                          </div>
                          <span className="text-[0.65rem] sm:text-xs text-gray-500">Ride Published By</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 ml-6 sm:ml-8">{trip.name}</p>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center mb-0.5 sm:mb-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#f8efe4] flex items-center justify-center mr-1.5 sm:mr-2">
                            <FaCar className="text-[0.6rem] sm:text-xs text-[#d92626]" />
                          </div>
                          <span className="text-[0.65rem] sm:text-xs text-gray-500">Vehicle Type</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 capitalize ml-6 sm:ml-8">
                          {trip.vehicleType} ({trip.count}/{trip.vehicleType === "auto" ? "8" : "3"})
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemove(trip.id, "count")}
                      disabled={isLeaving}
                      className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#d92626]/10 text-[#d92626] rounded-lg text-xs sm:text-sm font-medium transition-all hover:bg-[#d92626]/20 ${isLeaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FaTrashAlt className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {isLeaving ? "Leaving Ride..." : "Leave This Ride"}
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
