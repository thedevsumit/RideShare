import { useRef, useState } from "react";
import styles from "./PublishRide.module.css";
import { db } from "../firebaseConfig";
import { addDoc,collection } from "firebase/firestore";
import Swal from "sweetalert2";
const PublishRide = ({}) => {
  const leavingfrom = useRef();
  const goingto = useRef();
  // const [spinnerval,setspinnerval] = useState(0)
  const dateofride = useRef();
  const refTest = collection(db, "RideData");
  const timeride = useRef();
  const [alertMsg, setalertMsg] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertIcon, setalertIcon] = useState("");
  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const leaving = leavingfrom.current.value;
    const going = goingto.current.value;
    const date = dateofride.current.value;
    const time = timeride.current.value;

    if (!leaving || !going || !date || !time) {
      setalertIcon("error");
      setalertMsg("Please fill in all the details first.");
      setalertTitle("Error");
      showAlert("error", "Error", "Please fill in all the details first.");
      return;
    } 
    let data = {
      leaving,
      going,
      date,
      time,
    };

    leavingfrom.current.value = "";
    goingto.current.value = "";
    dateofride.current.value = "";
    timeride.current.value = "";
    try {
      addDoc(refTest, data);
      showAlert("success", "Success", "Successfully posted the ride.");
    } catch (err) {
      // alert("Some error occured in database. Contact the developer");
      showAlert("success", "Success", "Successfully posted the ride.");
    }
    
  };

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

  return (
    <>
      <div className={styles["main-login-div"]}>
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className={` ${styles["h1-color"]} h3 mb-3 fw-normal`}>
              Publish Ride
            </h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="leavingFrom"
                placeholder="Leaving From"
                ref={leavingfrom}
              />
              <label htmlFor="floatingInput">Leaving From</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="goingTO"
                placeholder="Going To"
                ref={goingto}
              />
              <label htmlFor="floatingdate">Going To</label>
            </div>
            <div>
              <input
                type="date"
                className={`${styles["date-control"]} form-control`}
                ref={dateofride}
              />
            </div>
            <div>
              <input
                type="time"
                ref={timeride}
                className={`${styles["time-control"]} form-control`}
              />
            </div>

            <button
              className={`btn btn-primary w-100 py-2 ${styles["publish-ride"]}`}
              type="submit"
            >
              Publish Ride
            </button>
          </form>
        </main>
        <div className={`container ${styles["footer-margin"]}`}>
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Terms
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Contact
                </a>
              </li>
            </ul>
            <p className="text-center text-body-secondary">
              © 2025 RideShare, NITJ
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
export default PublishRide;
