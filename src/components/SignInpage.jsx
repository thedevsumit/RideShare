import { useContext, useRef, useState } from "react";
import styles from "./SignInpage.module.css";
// import { SignIn } from "../store/SignUp-store";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2";
// import { firestore } from "../firebaseConfig";
// import { addDoc, collection } from "firebase/firestore";
import Sidebar from "./Sidebar";
// import Spinner from "./Spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/privacy";
// import OtpInput from "react-otp-input";
// import { useNavigate } from "react-router-dom";

const SignIn = ({ signInToUp, homepage,loginTOhome }) => {
  //  const navigate = useNavigate();
  // const { addData, signinData } = useContext(SignIn);
  // const UserNameElement = useRef();
  // const emailElement = useRef();
  // const passwordElement = useRef();
  // const phoneNoElement = useRef();
  // const [alertMsg, setalertMsg] = useState("");
  // const [alertTitle, setalertTitle] = useState("");
  // const [alertIcon, setalertIcon] = useState("");
  // const isNumeric = (str) => {
  //   return /^\d+$/.test(str);
  // };
  // const refTest = collection(firestore, "Data");
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const username = UserNameElement.current.value;
  //   const email = emailElement.current.value;
  //   const password = passwordElement.current.value;
  //   const phoneno = phoneNoElement.current.value;

  //   if (!username || !email || !password || !phoneno) {
  //     setalertIcon("error");
  //     setalertMsg("Please fill in all the details first.");
  //     setalertTitle("Error");
  //     showAlert("error", "Error", "Please fill in all the details first.");
  //     return;
  //   } else if (phoneno.length !== 10 || !isNumeric(phoneno)) {
  //     showAlert("error", "Error", "Invalid Phone Number");
  //     return;
  //   } else if (password.length < 8) {
  //     showAlert("error", "Error", "Password must have 8 characters");
  //     return;
  //   }
  //   let data = {
  //     username,
  //     email,
  //     password,
  //     phoneno,
  //     userbefore: 0,
  //   };

  //   addData(username, password, email, phoneno, signinData);

  //   UserNameElement.current.value = "";
  //   emailElement.current.value = "";
  //   passwordElement.current.value = "";
  //   phoneNoElement.current.value = "";
  //   try {
  //     addDoc(refTest, data);
  //   } catch (err) {
  //     alert("Some error occured in database. Contact the developer");
  //   }
  // };

  // const showAlert = (icon, title, message) => {
  //   Swal.fire({
  //     title: title,
  //     text: message,
  //     icon: icon,
  //     confirmButtonText: "OK",
  //     background: "#f8f9fa",
  //     color: "#000",
  //     timer: 3000,
  //   });
  // };
  // const { loggingIn, signinData } = useContext(SignIn);
  // const navigate = useNavigate();
  // const [usernametest, setUsername] = useState("");
const dispatch = useDispatch();
const {username} = useSelector((store)=>store.userName)
const currentuser = username;
const [spinnerval,setspinnerval] = useState(0)
  const UserNameElement = useRef();
  const passwordElement = useRef();
  const [alertMsg, setalertMsg] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertIcon, setalertIcon] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = UserNameElement.current.value;
    const password = passwordElement.current.value;
    if (!username || !password) {
      setalertIcon("error");
      setalertMsg("Please fill in all the details first.");
      setalertTitle("Error");
      showAlert("error", "Error", "Please fill in all the details first.");
      return;
    }
    try {
      document.querySelector(".container-main").style.opacity = "0.6";
      // setspinnerval(1)
      await signInWithEmailAndPassword(auth, username, password);
      // setspinnerval(0)
      showAlert("success", "Success!", "Successfully Logged In");
      const user = auth.currentUser;
      document.querySelector(".container-main").style.opacity = "1";
     
      // if(user){
      //   dispatch(userAction.newName(username))
      // }
      
      localStorage.setItem("currLoggedInUser", username); 
      loginTOhome(1); 
      
    } catch (error) {
      document.querySelector(".container-main").style.opacity = "1";
      setspinnerval(0)
      showAlert("error", "Error", "Invalid Credentials");
    }
    UserNameElement.current.value = "";
    passwordElement.current.value = "";
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

      <div className={`${styles["main-login-div"]} container-main`}>
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className={` ${styles["h1-color"]} h3 mb-3 fw-normal`}>
              Welcome Back
            </h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="UserName"
                ref={UserNameElement}
              />
              <label htmlFor="floatingInput">Username</label>
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
            
            <div
              className={styles["signin-color"]}
              onClick={() => {
                signInToUp("SignIn");
                // navigate("/login");
              }}
            >
              Sign Up
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign In
            </button>
          </form>
        </main>
        {/* {spinnerval === 1 && <Spinner/>} */}
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
              © 2025 RideShare, Team
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SignIn;
