import { useDispatch, useSelector } from "react-redux";
import { incrementNestedValue } from "./Increment";
import { useState, useEffect } from "react";
import { itemAction } from "../store/counter";
import MapDirections from "./MapDirections";
import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from "../firebaseConfig";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaClock, FaUser, FaCar, FaRoute, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import notification from "./SimpleNotification";

const AvailableRide = () => {
  const { newItem } = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [val, setval] = useState(0);
  const [today, setToday] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null);
  const [processingRideId, setProcessingRideId] = useState(null);
  const [isDeletingRide, setIsDeletingRide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [modalMapData, setModalMapData] = useState({ origin: '', destination: '', tripId: '' });
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [rideToDelete, setRideToDelete] = useState(null);
  const currentUser = localStorage.getItem("currLoggedInUser");
  
  useEffect(() => {
    const getISTDateTime = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60000;
      const ist = new Date(now.getTime() + istOffset);
  
      const year = ist.getUTCFullYear();
      const month = String(ist.getUTCMonth() + 1).padStart(2, "0");
      const day = String(ist.getUTCDate()).padStart(2, "0");
      const hours = String(ist.getUTCHours()).padStart(2, "0");
      const minutes = String(ist.getUTCMinutes()).padStart(2, "0");
  
      const istDate = `${year}-${month}-${day}`;
      const istTime = `${hours}:${minutes}`;
  
      setToday(istDate);
      setCurrentTime(istTime);
  
      if (newItem && newItem.length > 0) {
        cleanExpiredRides(istDate, istTime);
      }
    };
  
    const cleanExpiredRides = (todayDate, nowTime) => {
      newItem.forEach((trip) => {
        const isExpired =
          trip.date < todayDate ||
          (trip.date === todayDate && trip.time < nowTime);
  
        if (isExpired) {
          deleteRideFromDB(trip.id);
  
          const joinedId = localStorage.getItem("ridedata");
          if (joinedId === trip.id) {
            localStorage.removeItem("ridedata");
            localStorage.removeItem("joinedRide");
          }
        }
      });
    };
  
    getISTDateTime();
    const interval = setInterval(getISTDateTime, 60000); // Check every minute
    
    if (newItem) {
      setLoading(false);
    }
    
    return () => clearInterval(interval);
  }, [newItem]);
  
  const deleteRideFromDB = async (tripId) => {
    try {
      await deleteDoc(doc(db, "RideData", tripId)); 
      console.log(`Deleted expired ride with id: ${tripId}`);
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };
  
  const showAlert = (icon, title, message) => {
    if (icon === "success") {
      notification.showSuccess(message);
    } else if (icon === "error") {
      notification.showError(message);
    }
  };

  const handleIncrement = async (docId, nestedKey) => {
    try {
      await incrementNestedValue(docId, nestedKey);
      localStorage.setItem("joinedRide", 1);
      localStorage.setItem("ridedata", JSON.stringify(docId));
      notification.showSuccess("Successfully joined the ride.");
      
      // Navigate to joined rides page after a short delay
      setTimeout(() => {
        navigate('/joined');
      }, 2000);
    } catch (error) {
      console.error("Error joining ride:", error);
      notification.showError("Failed to join the ride. Please try again.");
    }
  };

  const handleError = () => notification.showError("You have already joined a ride. Please leave that ride first.");
  const handleMax = () => notification.showError("Maximum number of people reached for this vehicle type.");
  const handleLast = () => notification.showError("Please login first to join a ride.");

  const validRides = newItem?.filter((trip) => {
    if (trip.date > today) return true; 
    if (trip.date === today && trip.time >= currentTime) return true; 
    return false;
  }) || [];

  // Sort rides by date and time (closest first)
  const sortedRides = [...validRides].sort((a, b) => {
    if (a.date !== b.date) return a.date > b.date ? 1 : -1;
    return a.time > b.time ? 1 : -1;
  });
  
  const joinRide = async (trip) => {
    // Set the ID of the ride being processed
    setProcessingRideId(trip.id);
    setIsJoining(true);

    try {
      const userLoggedIn = localStorage.getItem("currLoggedInUser");
      
      if (!userLoggedIn) {
        handleLast();
        setIsJoining(false);
        setProcessingRideId(null);
        return;
      }
      
      const alreadyJoined = localStorage.getItem("joinedRide");
      const joinedRideId = localStorage.getItem("ridedata");
      
      // Check if user already joined this exact ride
      if (alreadyJoined && (joinedRideId === trip.id || JSON.stringify(joinedRideId) === JSON.stringify(trip.id))) {
        notification.showError("You've already joined this ride!");
        setIsJoining(false);
        setProcessingRideId(null);
        return;
      }
      
      // Check if user already joined any ride
      if (alreadyJoined) {
        handleError();
        setIsJoining(false);
        setProcessingRideId(null);
        return;
      }
      
      // Check vehicle capacity
      if ((trip.vehicleType === "auto" && trip.count >= 8) || 
          (trip.vehicleType === "taxi" && trip.count >= 3)) {
        handleMax();
        setIsJoining(false);
        setProcessingRideId(null);
        return;
      }
      
      // Everything is valid, join the ride
      dispatch(itemAction.adding(trip));
      await handleIncrement(trip.id, "count");
      setval(1);
      
    } catch (error) {
      console.error("Error in join ride process:", error);
      notification.showError("Something went wrong. Please try again.");
    } finally {
      setIsJoining(false);
      setProcessingRideId(null);
    }
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

  const toggleMap = (trip) => {
    if (selectedMap === trip.id) {
      setSelectedMap(null);
      setIsMapModalOpen(false);
    } else {
      setSelectedMap(trip.id);
      setModalMapData({
        origin: trip.leaving,
        destination: trip.going,
        tripId: trip.id
      });
      setIsMapModalOpen(true);
    }
  };

  // Function to handle ride deletion
  const handleDeleteRide = async (ride) => {
    if (!currentUser || currentUser !== ride.name) {
      notification.showError("You can only delete rides you've published");
      return;
    }
    
    setRideToDelete(ride);
    setConfirmDeleteModalOpen(true);
  };

  // Function to confirm and execute ride deletion
  const confirmDeleteRide = async () => {
    if (!rideToDelete) return;
    
    setIsDeletingRide(true);
    
    try {
      await deleteDoc(doc(db, "RideData", rideToDelete.id));
      notification.showSuccess("Ride successfully deleted");
      setConfirmDeleteModalOpen(false);
      setRideToDelete(null);
    } catch (error) {
      console.error("Error deleting ride:", error);
      notification.showError("Failed to delete ride. Please try again.");
    } finally {
      setIsDeletingRide(false);
    }
  };

  // Function to cancel ride deletion
  const cancelDeleteRide = () => {
    setConfirmDeleteModalOpen(false);
    setRideToDelete(null);
  };

  // Check if the current user is the publisher of a ride
  const isRidePublisher = (ride) => {
    return currentUser && currentUser === ride.name;
  };

  // Add this function to check if user already joined this specific ride
  const isRideAlreadyJoined = (rideId) => {
    const joinedRide = localStorage.getItem("joinedRide");
    if (!joinedRide) return false;
    
    const joinedRideId = localStorage.getItem("ridedata");
    if (!joinedRideId) return false;
    
    // Handle different storage formats
    return joinedRideId === rideId || JSON.stringify(joinedRideId) === JSON.stringify(rideId);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto pt-24 pb-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 max-w-7xl lg:max-w-[90%] xl:max-w-[85%]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
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
            Available Rides
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 relative z-10 font-light px-2">
              Find and join rides that match your journey. Connect with travelers headed in the same direction and share your commute.
            </p>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#d92626] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700">Finding available rides...</p>
          </div>
        ) : sortedRides.length === 0 ? (
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
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-3 sm:mb-4 bg-gradient-to-r from-[#d92626] to-[#ff4f4f] bg-clip-text text-transparent">
              No Rides Available
            </h2>
            
            <div className="bg-[#f8efe4]/30 rounded-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 max-w-md">
              <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
                There are no rides available right now. Check back later or publish your own ride to start the journey.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/publish')}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#d92626] to-[#ff4f4f] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <FaRoute className="mr-2" />
              Publish a Ride
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {sortedRides.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white overflow-hidden shadow-lg rounded-xl transform transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-[#d92626] to-[#ff4f4f] px-4 sm:px-6 py-3 sm:py-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-white opacity-10 rounded-full transform translate-x-8 sm:translate-x-12 md:translate-x-16 -translate-y-8 sm:-translate-y-12 md:-translate-y-16"></div>
                  <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 -left-3 sm:-left-4 md:-left-6 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-white">
                      {currentUser === trip.name ? "Your Ride" : "Available Ride"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {currentUser === trip.name && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRide(trip);
                          }}
                          className="text-white bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-colors"
                          title="Delete ride"
                        >
                          <FaTrash className="text-xs sm:text-sm" />
                        </button>
                      )}
                      <span className="text-2xs sm:text-xs bg-white/20 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-white">
                        {trip.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="mb-5 sm:mb-6 relative">
                    <div className="absolute top-0 bottom-0 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-[#d92626] to-[#ff4f4f] z-0 rounded-full"></div>
                    
                    <div className="flex items-start mb-4 sm:mb-5 relative z-10">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-white border-2 border-[#d92626] flex items-center justify-center shadow-md">
                        <FaMapMarkerAlt className="h-3 w-3 sm:h-5 sm:w-5 text-[#d92626]" />
                      </div>
                      <div className="ml-3 sm:ml-4 bg-[#f8efe4]/30 p-2 sm:p-3 rounded-lg w-full">
                        <p className="text-2xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">FROM</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium leading-tight">{trip.leaving}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start relative z-10">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-white border-2 border-[#ff4f4f] flex items-center justify-center shadow-md">
                        <FaMapMarkerAlt className="h-3 w-3 sm:h-5 sm:w-5 text-[#ff4f4f]" />
                      </div>
                      <div className="ml-3 sm:ml-4 bg-[#f8efe4]/30 p-2 sm:p-3 rounded-lg w-full">
                        <p className="text-2xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">TO</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium leading-tight">{trip.going}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ride Details */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="bg-[#f8efe4]/30 p-2 sm:p-3 rounded-lg flex items-center">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 sm:mr-3">
                        <FaCalendarAlt className="text-xs sm:text-sm text-[#d92626]" />
                      </div>
                      <div>
                        <p className="text-2xs sm:text-xs text-gray-500 font-medium">Date</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">{trip.date}</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#f8efe4]/30 p-2 sm:p-3 rounded-lg flex items-center">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 sm:mr-3">
                        <FaClock className="text-xs sm:text-sm text-[#d92626]" />
                      </div>
                      <div>
                        <p className="text-2xs sm:text-xs text-gray-500 font-medium">Time</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">{trip.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 sm:pt-5 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f8efe4] flex items-center justify-center mr-2">
                          <FaUser className="text-xs sm:text-sm text-[#d92626]" />
                        </div>
                        <div>
                          <p className="text-2xs sm:text-xs text-gray-500 font-medium">Published by</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-800">{trip.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f8efe4] flex items-center justify-center mr-2">
                          <FaCar className="text-xs sm:text-sm text-[#d92626]" />
                        </div>
                        <div>
                          <p className="text-2xs sm:text-xs text-gray-500 font-medium">Vehicle</p>
                          <div className="flex items-center">
                            <p className="text-xs sm:text-sm font-medium text-gray-800 capitalize">{trip.vehicleType}</p>
                            <span className="ml-1 sm:ml-2 text-2xs sm:text-xs font-medium text-gray-500">
                              ({trip.count}/{trip.vehicleType === "auto" ? "8" : "3"})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-[#f8efe4] hover:bg-[#f8efe4]/70 text-[#d92626] rounded-lg text-xs sm:text-sm font-medium transition-all"
                      onClick={() => toggleMap(trip)}
                    >
                      <FaRoute className="mr-1 sm:mr-2" />
                      View Route
                    </button>
                    
                    <button
                      className={`flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        processingRideId === trip.id
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : currentUser === trip.name
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : isRideAlreadyJoined(trip.id)
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-[#d92626] to-[#ff4f4f] text-white hover:shadow-md"
                      }`}
                      onClick={() => joinRide(trip)}
                      disabled={processingRideId === trip.id || currentUser === trip.name || isRideAlreadyJoined(trip.id)}
                    >
                      {processingRideId === trip.id ? (
                        <>Joining...</>
                      ) : currentUser === trip.name ? (
                        <>Your Published Ride</>
                      ) : isRideAlreadyJoined(trip.id) ? (
                        <>Already Joined</>
                      ) : (
                        <>
                          <FaArrowRight className="mr-1 sm:mr-2" />
                          Join Ride
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Map Modal */}
        {isMapModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="bg-[#222] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-medium text-white">Route Map</h3>
                <button 
                  onClick={() => setIsMapModalOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[60vh]">
                <MapDirections origin={modalMapData.origin} destination={modalMapData.destination} />
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Delete Ride</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  Are you sure you want to delete this ride? This action cannot be undone.
                </p>
                <div className="flex gap-3 sm:gap-4 justify-end">
                  <button
                    onClick={cancelDeleteRide}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteRide}
                    disabled={isDeletingRide}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm text-white ${
                      isDeletingRide
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isDeletingRide ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AvailableRide;
