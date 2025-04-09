import styles from "./Header.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

import { firebaseConfig, db } from "../firebaseConfig";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Notyf } from "notyf";
import { useEffect, useState } from "react";
import { Dropdown } from "bootstrap";

const Header = ({ fetchData }) => {
  initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  var notyf = new Notyf();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const storedUser = window.localStorage.getItem("currLoggedInUser");
    if (storedUser) {
      setUserDetails(storedUser);
    }
  }, []);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <div className={styles["parent-header"]}>
        <div className={styles["main-header"]}>
          <div className={styles["one-header"]}>
            <span className={styles["one-header-smartbasket"]}>RideShare</span>
            <span className={styles["about-header"]}>
              About <IoMdArrowDropdown className={styles["dropdown-icon"]} />
            </span>
          </div>

          <div className={styles["main-parent-list"]}>
            <ul className={styles["main-list"]}>
              <li className={styles["list-items"]}>Help</li>
              {(userDetails === null || userDetails === undefined) && (
                <li
                  className={styles["login-div"]}
                  onClick={() => {
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        const user = result.user;
                        if (user.email.endsWith("@nitj.ac.in")) {
                          notyf.success("Login Successful");
                        } else {
                          notyf.error("Login Failed, Please use NITJ email");
                          return;
                        }
                        localStorage.setItem(
                          "currLoggedInUser",
                          user.displayName
                        );
                        setUserDetails(user.displayName);
                      })
                      .catch((error) =>
                        console.error("Google Sign-In Error:", error)
                      );
                  }}
                >
                  Login
                </li>
              )}

             {!(userDetails === null || userDetails === undefined) && <li
                className={styles["profile"]}
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                <span className={styles["profile-name"]}>
                  {userDetails}
                  <IoMdArrowDropdown className={styles["dropdown-icon"]} />
                </span>

                {dropdownVisible && (
                  <div
                    className={styles["sign-out"]}
                    onClick={() => {
                      localStorage.removeItem("currLoggedInUser");
                      setUserDetails(null);
                      notyf.success("Logged out Successfully!");
                    }}
                  >
                    Sign Out
                  </div>
                )}
              </li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
