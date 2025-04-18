import { useEffect, useRef, useState } from "react";
import styles from "./PublishRide.module.css";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import TiltedCard from "./TiltedCard";
import { TbPointFilled } from "react-icons/tb";

const PublishRide = () => {
  const leavingfrom = useRef();
  const goingto = useRef();
  const dateofride = useRef();
  const timeride = useRef();
  const dispatch = useDispatch();
  const refTest = collection(db, "RideData");

  const [vehicleType, setVehicleType] = useState("auto");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
  const width = isMobile ? "80vw" : "550px";
  const height = isMobile ? "80vw" : "550px";
  const username = window.localStorage.getItem("currLoggedInUser");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };
    window.addEventListener("resize", handleResize);

    const loadAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const options = {
          types: ["geocode"], // enables full address search
          componentRestrictions: { country: "in" }, // restrict to India
        };

        const autocompleteLeaving = new window.google.maps.places.Autocomplete(
          leavingfrom.current,
          options
        );

        const autocompleteGoing = new window.google.maps.places.Autocomplete(
          goingto.current,
          options
        );

        // Optional: log coordinates
        autocompleteLeaving.addListener("place_changed", () => {
          const place = autocompleteLeaving.getPlace();
          console.log("Leaving From:", place.formatted_address);
          if (place.geometry) {
            console.log("Lat:", place.geometry.location.lat());
            console.log("Lng:", place.geometry.location.lng());
          }
        });

        autocompleteGoing.addListener("place_changed", () => {
          const place = autocompleteGoing.getPlace();
          console.log("Going To:", place.formatted_address);
          if (place.geometry) {
            console.log("Lat:", place.geometry.location.lat());
            console.log("Lng:", place.geometry.location.lng());
          }
        });
      }
    };

    if (document.readyState === "complete") {
      loadAutocomplete();
    } else {
      window.addEventListener("load", loadAutocomplete);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", loadAutocomplete);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const leaving = leavingfrom.current.value;
    const going = goingto.current.value;
    const date = dateofride.current.value;
    const time = timeride.current.value;

    if (!leaving || !going || !date || !time) {
      showAlert("error", "Error", "Please fill in all the details first.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      showAlert("error", "Error", "You cannot publish a ride for a past date.");
      return;
    }

    const data = {
      leaving,
      going,
      date,
      time,
      vehicleType,
      count: 0,
      name: username,
    };

    try {
      if (localStorage.getItem("currLoggedInUser")) {
        await addDoc(refTest, data);
        showAlert("success", "Success", "Successfully posted the ride.");
      } else {
        showAlert(
          "error",
          "Error",
          "Login First Then only you can publish ride"
        );
      }
    } catch (err) {
      showAlert("error", "Error", "Error posting ride. Try again.");
    }

    leavingfrom.current.value = "";
    goingto.current.value = "";
    dateofride.current.value = "";
    timeride.current.value = "";
    setVehicleType("auto");
  };

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title,
      text: message,
      icon,
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
            <form onSubmit={handleSubmit} className={styles.formmain}>
              <h1 className={styles["h1-color"]}>Publish Ride</h1>
              <p className={styles.para}>
                Add your trip details, hop in, and go.
              </p>

              <div className={styles.inputfield}>
                <div className={styles.iconinput}>
                  <TbPointFilled />
                </div>
                <input
                  type="text"
                  className={styles["input-div"]}
                  placeholder="Enter location"
                  ref={leavingfrom}
                />
              </div>

              <div className={styles.inputfield}>
                <div className={styles.iconinput}>
                  <VscDebugBreakpointLog />
                </div>
                <input
                  type="text"
                  className={styles["input-div"]}
                  placeholder="Enter destination"
                  ref={goingto}
                />
              </div>

              <div className={styles.inputfield}>
                <div className={styles.iconinput}>
                  <TbPointFilled />
                </div>
                <input
                  type="date"
                  className={styles["input-div"]}
                  ref={dateofride}
                />
              </div>

              <div className={styles.inputfield}>
                <div className={styles.iconinput}>
                  <VscDebugBreakpointLog />
                </div>
                <input
                  type="time"
                  className={styles["input-div"]}
                  ref={timeride}
                />
              </div>

              <div className={styles.inputfield}>
                <div className={styles.iconinput}>
                  <TbPointFilled />
                </div>
                <select
                  className={styles["input-div"]}
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="auto">Auto</option>
                  <option value="taxi">Taxi</option>
                </select>
              </div>

              <button className={styles["publish-ride"]} type="submit">
                Publish Ride
              </button>
            </form>
          </main>

          <div>
            <TiltedCard
              imageSrc="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1683919251/assets/42/a29147-e043-42f9-8544-ecfffe0532e9/original/travel-ilustra.png"
              altText="Ride illustration"
              captionText=""
              containerHeight={height}
              containerWidth={width}
              imageHeight={height}
              imageWidth={width}
              rotateAmplitude={12}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={<div />}
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
          <p className="text-center text-body-secondary">© 2025 RideShare, NITJ</p>
        </footer>
      </div>
    </>
  );
};

export default PublishRide;
