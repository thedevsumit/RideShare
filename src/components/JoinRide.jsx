import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { decrementNestedValue } from "./Decrement";
import Swal from "sweetalert2";
const JoinRide = () => {
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
  const { currentValue, newItem } = useSelector((store) => store.items);
  const [filteredRides, setFilteredRides] = useState([]);
  const [showride, hideride] = useState(1);
  const handleRemove = (docID, key) => {
    decrementNestedValue(docID, key);
    hideride(0);
    localStorage.removeItem("ridedata");
    localStorage.removeItem("joinedRide");
    showAlert("success", "Success", "Successfully left the ride.");
  };

  useEffect(() => {
    let rideData = localStorage.getItem("ridedata");

    if (rideData) {
      try {
        rideData = JSON.parse(rideData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }

      const filtered = newItem.filter((trip) => trip.id === rideData);
      setFilteredRides(filtered);
    }
  }, [newItem]);

  return (
    <ul className="travel-lists">
      {showride === 1 ? (
        filteredRides.map((trip) => (
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
              <strong>ID:</strong> {trip.id}
            </p>
            <button 
            className="button-avaialble"
              onClick={() => {
                // Add your remove logic here
                handleRemove(trip.id, "count");
              }}
            >
              Remove
            </button>
          </li>
        ))
      ) : (
        <div></div>
      )}
      {showride === 0 && <p>No rides avaialble</p>}
    </ul>
  );
};

export default JoinRide;
