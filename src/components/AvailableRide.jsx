import { useDispatch, useSelector } from "react-redux";
import styles from "./AvailableRide.module.css";
import JoinRide from "./JoinRide";
import { useState } from "react";
import { itemAction } from "../store/counter";
const AvailableRide = () => {
  const { newItem } = useSelector((store) => store.items);
  const dispatch = useDispatch();

  //   const [joinride,setjoinride] = useState(0)
  return (
    <>
      {true && (
        <div className="travel-container ">
          <h2>Travel List</h2>
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
                <button
                  onClick={() => {
                    dispatch(itemAction.adding(trip));
                  }}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* {joinride===1 && <JoinRide/>} */}
    </>
  );
};
export default AvailableRide;
