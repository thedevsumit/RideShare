import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
const Navigaton = ({fetchData}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles["parent-header"]}>
        <div className={styles["main-header"]}>
          <div className={styles["one-header"]}></div>

          <div className={styles["main-parent-list"]}>
            <ul className={styles["main-list"]}>
              <li className={styles["list-items"]} onClick={()=>{navigate("/")}}>Publish Ride</li>
              {1 && (
                <li
                  className={styles["list-items"]}
                  onClick={() => {
                    navigate("/available");
                    fetchData();
                  }}
                >
                  Available Rides
                </li>
              )}
              <li className={styles["list-items"]} onClick={()=>{
                navigate("/joined")
              }}>Joined Ride</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navigaton;
