import { useRef, useState } from "react";
import styles from "./PublishRide.module.css";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import TiltedCard from './TiltedCard';
// import { TbPoint } from "react-icons/tb";
import { itemAction } from "../store/counter";
import { TbPointFilled } from "react-icons/tb";
import { div } from "framer-motion/client";
const PublishRide = ({}) => {
  // const {username}= JSON.parse(localStorage.getItem("currLoggedInUser"));
  const leavingfrom = useRef();
  const goingto = useRef();
  const dispatch = useDispatch();
  // const [spinnerval,setspinnerval] = useState(0)
  const dateofride = useRef();
  const refTest = collection(db, "RideData");
  const timeride = useRef();
  const [alertMsg, setalertMsg] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertIcon, setalertIcon] = useState("");
  const isNumeric = (str) => {
    return /^\d+$/.test(str);``
  };
  const { username } = useSelector((store) => store.userName);
  const handleSubmit = async (event) => {
    event.preventDefault();
// const username = localStorage.getItem("currLoggedInUser");
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
      leaving: leaving,
      going: going,
      date: date,
      time: time,
      count: 0,
      name: username
    };

    leavingfrom.current.value = "";
    goingto.current.value = "";
    dateofride.current.value = "";
    timeride.current.value = "";
    try {
      addDoc(refTest, data);
      // dispatch(itemAction.itemadd(data))
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
      <div className={styles.mainbody}>
        <div className={styles["main-login-div"]}>
          <main className="mainform">
            <form onSubmit={handleSubmit} className={`${styles.formmain}`}>
              <h1 className={` ${styles["h1-color"]}`}>Publish Ride</h1>
              <p className={`${styles.para}`}>
                Add your trip details, hop in, and go.
              </p>
              <div className={`${styles.inputfield}`}>
                <div className={styles.iconinput}>
                  <TbPointFilled />
                </div>
                <input
                  type="text"
                  className={`${styles["input-div"]}`}
                  id="leavingFrom"
                  placeholder="Enter location"
                  ref={leavingfrom}
                />
              </div>
              <div className={`${styles.inputfield}`}>
                <div className={styles.iconinput}>
                  <VscDebugBreakpointLog />
                </div>
                <input
                  type="text"
                  className={`${styles["input-div"]}`}
                  id="goingTO"
                  placeholder="Enter destination"
                  ref={goingto}
                />
              </div>
              <div className={`${styles.inputfield}`}>
                <div className={styles.iconinput}>
                  <TbPointFilled />
                </div>
                <input
                  type="date"
                  className={`${styles["input-div"]}`}
                  ref={dateofride}
                />
              </div>
              <div className={`${styles.inputfield}`}>
                <div className={styles.iconinput}>
                  <VscDebugBreakpointLog />
                </div>
                <input
                  type="time"
                  ref={timeride}
                  className={`${styles["input-div"]}`}
                />
              </div>

              <button className={`${styles["publish-ride"]}`} type="submit">
                Publish Ride
              </button>
            </form>
          </main>
          <div>
            <TiltedCard
              imageSrc="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1683919251/assets/42/a29147-e043-42f9-8544-ecfffe0532e9/original/travel-ilustra.png"
              altText="k"
              captionText=""
              containerHeight="550px"
              containerWidth="550px"
              imageHeight="550px"
              imageWidth="550px"
              rotateAmplitude={12}
              scaleOnHover={1.}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div/>
              }
            />
          </div>
        </div>
      </div>
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
    </>
  );
};
export default PublishRide;
