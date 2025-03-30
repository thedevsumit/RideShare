import { useDispatch, useSelector } from "react-redux";
import { incrementNestedValue } from "./Increment";
import JoinRide from "./JoinRide";
import { useState } from "react";
import { itemAction } from "../store/counter";
const AvailableRide = () => {
  const { newItem } = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const handleIncrement = (docId,nestedKey) => {
    incrementNestedValue(docId, nestedKey);
  };
  //   const [joinride,setjoinride] = useState(0)
  return (
    <>
      
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
                  <strong>ID:</strong> {trip.id}
                </p>
                <p>
                  <strong>Number of person:</strong> {trip.count}
                </p>
                <button 
                className="button-avaialble"
                  onClick={() => {
                    dispatch(itemAction.adding(trip));
                    handleIncrement(trip.id,"count")
                  }}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        </div>
      
      
    </>
  );
};
export default AvailableRide;
