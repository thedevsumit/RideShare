import { useDispatch, useSelector } from "react-redux";
import { incrementNestedValue } from "./Increment";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { itemAction } from "../store/counter";
import Header from "./Header";
import Navigaton from "./Navigation";
import Footer from "./Footer";
import MapDirections from "./MapDirections";

const AvailableRide = () => {
  const { newItem } = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [val, setval] = useState(0);
  const [today, setToday] = useState("");
 
  const [currentTime, setCurrentTime] = useState("");
  
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
      
    };
  
    getISTDateTime();
  }, []);
  

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: "OK",
      background: "#f8f9fa",
      color: "#000",
      timer: 3000,
    });
  };

  const handleIncrement = (docId, nestedKey) => {
    incrementNestedValue(docId, nestedKey);
    localStorage.setItem("joinedRide", 1);
    showAlert("success", "Success", "Successfully joined the ride.");
  };

  const handleError = () => showAlert("error", "Error", "You have already joined the ride.");
  const handleMax = () => showAlert("error", "Error", "Maximum number of person reached in that vehicle");
  const handleLast = () => showAlert("error", "Error", "Login First Only then you can join the ride");

  const handleRide = (tripId) => localStorage.setItem("ridedata", tripId);

  const validRides = newItem.filter((trip) => {
    if (trip.date > today) return true; // Future date
    if (trip.date === today && trip.time >= currentTime) return true; 
    return false;
  });
  

  return (
    <>
      <Header />
      <Navigaton />
      {validRides.length === 0 && <center>No Rides Available at this time</center>}
      <div className="travel-container">
        <ul className="travel-list main-available">
          {validRides.map((trip) => (
            <li key={trip.id} className="travel-item">
              <p><strong>Date:</strong> {trip.date}</p>
              <p><strong>Leaving:</strong> {trip.leaving}</p>
              <p><strong>Going:</strong> {trip.going}</p>
              <p><strong>Time:</strong> {trip.time}</p>
              <p><strong>Lead:</strong> {trip.name}</p>
              <p><strong>Vehicle Type:</strong> {trip.vehicleType}</p>
              <p><strong>Number of person:</strong> {trip.count + val}</p>

              <button
                className="button-avaialble"
                onClick={() => {
                  if (localStorage.getItem("currLoggedInUser")) {
                    if (localStorage.getItem("joinedRide")) {
                      handleError();
                    } else {
                      if (!val) {
                        if (trip.count > 8 && trip.vehicleType === "auto") {
                          handleMax();
                          return;
                        }
                        if (trip.count > 3 && trip.vehicleType === "taxi") {
                          handleMax();
                          return;
                        }
                        setval(1);
                        dispatch(itemAction.adding(trip));
                        handleRide(trip.id);
                        handleIncrement(trip.id, "count");
                      }
                    }
                  } else {
                    handleLast();
                  }
                }}
              >
                Join
              </button>

              <MapDirections origin={trip.leaving} destination={trip.going} />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AvailableRide;
