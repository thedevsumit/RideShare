import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import styles from "./LoginDiv.module.css";
import Swal from "sweetalert2";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import Spinner from "./Spinner";
import { db } from "../firebaseConfig";
import { setDoc,doc} from "firebase/firestore";
// import { useDispatch } from "react-redux";
// import { userAction } from "../store/privacy";
const SignUp = ({ signInToUp, homepage,loginTOhome }) => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
// const dispatch = useDispatch();
  const UserNameElement = useRef();
  const emailElement = useRef();
  const [spinnerval,setspinnerval] = useState(0)
  const passwordElement = useRef();
  const phoneNoElement = useRef();
  const [alertMsg, setalertMsg] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertIcon, setalertIcon] = useState("");
  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const username = UserNameElement.current.value;
    const email = emailElement.current.value;
    const password = passwordElement.current.value;
    const phoneno = phoneNoElement.current.value;

    if (!username || !email || !password || !phoneno) {
      setalertIcon("error");
      setalertMsg("Please fill in all the details first.");
      setalertTitle("Error");
      showAlert("error", "Error", "Please fill in all the details first.");
      return;
    } else if (phoneno.length !== 10 || !isNumeric(phoneno)) {
      showAlert("error", "Error", "Invalid Phone Number");
      return;
    } else if (password.length < 8) {
      showAlert("error", "Error", "Password must have 8 characters");
      return;
    }
    let data = {
      username,
      email,
      password,
      phoneno,
      
    };

    UserNameElement.current.value = "";
    emailElement.current.value = "";
    passwordElement.current.value = "";
    phoneNoElement.current.value = "";
    
   try {
    document.querySelector(".main-container").style.opacity = "0.6";
    // setspinnerval(1)
    await createUserWithEmailAndPassword(auth, email, password);
    // setspinnerval(0)
    document.querySelector(".main-container").style.opacity = "1";
    const user = auth.currentUser;
    showAlert("success", "Success", "Succesfully created account");
    loginTOhome(1);
    if(user){
      await setDoc(doc(db,"Users",user.uid),{
        email: user.email,
        username: username,
        phoneno: phoneno
      })
      // dispatch(userAction.newName(username))
      localStorage.setItem("currLoggedInUser", email); 
     }
     
    
   } catch (error) {
    document.querySelector(".main-container").style.opacity = "1";
    // setspinnerval(0)
    
    setalertIcon("error");
    setalertMsg("Please fill in all the details first.");
    setalertTitle("Error");
    showAlert("error", "Error", "Email already in Use");
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
  const [sidebar, setsidebar] = useState(0);
  // const { currLoggedInUser } = useContext(SignIn);
  const changingSidebar = (customVal) => {
    setsidebar(customVal);
  };
  return (
    <>
      <div className={styles["main-header"]}>
        <div className={styles["one-header"]}>
                 <img
                   className={styles["one-header-img-smartbasket"]}
                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBaiZLcF7exbj66tDPUag05XXxCSU4Q1Gy6g&s"
                   alt="SmartBasket"
                 />
                 <span className={styles["one-header-smartbasket"]}>RideShare</span>
               </div>
        <div className={styles["two-header"]}>
          <img
            className={styles["two-header-img"]}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatOVRDENelIbuzdGYva7nrItNTvPd_pdamQ&s"
            alt="User"
            onClick={() => {
              changingSidebar(1);
            }}
          />
        </div>
      </div>
      {sidebar === 1 && (
        <Sidebar
          homepage={homepage}
          // currLoggedInUser={currLoggedInUser}
          changingSidebar={changingSidebar}
        ></Sidebar>
      )}

      <div className={`main-container ${styles["main-login-div"]}`}>
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className={` ${styles["h1-color"]} h3 mb-3 fw-normal`}>
              Create Account
            </h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingUsername"
                placeholder="UserName"
                ref={UserNameElement}
              />
              <label htmlFor="floatingUsername">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={passwordElement}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                ref={emailElement}
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingPhone"
                placeholder="Phone No"
                ref={phoneNoElement}
              />
              <label htmlFor="floatingPhone">Phone No</label>
            </div>

            <div
              className={styles["signin-color"]}
              onClick={() => {
                signInToUp("SignUp");
                // navigate("/signup");
              }}
            >
              Sign In
            </div>
            <button className="btn btn-primary w-100 py-2 buttonsign" type="submit">
              Sign Up
            </button>
          </form>
        </main>
        {spinnerval === 1 && <Spinner/>}
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
                <a
                  href="mailto:84kumarsumit@gmail.com"
                  className="nav-link px-2 text-body-secondary"
                >
                  Contact
                </a>
              </li>
            </ul>
            <p className="text-center text-body-secondary">
              © 2025 RideShare, Team
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
export default SignUp;
