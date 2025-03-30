import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const JoinRide = () => {
  const { currentValue, newItem } = useSelector((store) => store.items);
  const [filteredRides, setFilteredRides] = useState([]);

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
    <ul className="travel-list">
      {filteredRides.length > 0 ? (
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
              onClick={() => {
                // Add your remove logic here
                console.log("Removing ride:", trip.id);
              }}
            >
              Remove
            </button>
          </li>
        ))
      ) : (
        <p>No matching rides found.</p>
      )}
    </ul>
  );
};

export default JoinRide;
