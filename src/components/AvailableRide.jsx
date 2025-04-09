import { useDispatch, useSelector } from "react-redux";
import { incrementNestedValue } from "./Increment";
import JoinRide from "./JoinRide";
import { useState } from "react";
import Swal from "sweetalert2";
import { itemAction } from "../store/counter";
import Header from "./Header";
import Navigaton from "./Navigation";
import Footer from "./Footer";
import { div } from "framer-motion/client";
const AvailableRide = () => {
  const { newItem } = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [val,setval] = useState(0)
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
  const handleIncrement = (docId,nestedKey) => {
    incrementNestedValue(docId, nestedKey);
    localStorage.setItem("joinedRide",1)
    showAlert("success", "Success", "Successfully joined the ride.");
  };
  const handleError = () => {
   
    showAlert("error", "Error", "You have already joined the ride.");
  };
  const handleRide = (trip) => {
    
    console.log(trip)
    
    localStorage.setItem("ridedata",trip)
  };
  //   const [joinride,setjoinride] = useState(0)
  return (
    <>
      <Header/>
      <Navigaton/>
      {newItem.length === 0 && <center>No Rides Available at this time</center>}
        <div className="travel-container ">
          
          <ul className="travel-list main-available">
            {newItem.map((trip) => (
              <li key={trip.id} className="travel-item">
                <p>
                  <strong>Date:</strong> {trip.date}
                </p>
                <p>
                  <strong>Leaving:</strong> {trip.leaving}
                </p>
                <p>
                  <strong>Going:</strong> {trip.going}
                </p>
                <p>
                  <strong>Time:</strong> {trip.time}
                </p>
               
                <p>
                  <strong>Lead:</strong> {trip.name}
                </p>
                <p>
                  <strong>Number of person:</strong> {trip.count+val}
                </p>
                <button 
                className="button-avaialble"
                  onClick={() => {
                    
                   
                    if(localStorage.getItem("joinedRide")){
                      handleError()
                    }else{
                      if(!val){
                        setval(1)
                        dispatch(itemAction.adding(trip));
                    handleRide(trip.id)
                        handleIncrement(trip.id,"count")
                      }
                    }
                    
                   
                    
                  }}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        </div>
         <Footer/>
    </>
  );
};
export default AvailableRide;
