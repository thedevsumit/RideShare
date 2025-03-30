import { useSelector } from "react-redux";

const JoinRide = () => {
  const { currentValue } = useSelector((store) => store.items);
  
  return (
    <>
      {" "}
      <ul className="travel-list">
        {currentValue.map((trip) => (
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
                // dispatch(itemAction.adding(trip));
                // handleIncrement()
                
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default JoinRide;
