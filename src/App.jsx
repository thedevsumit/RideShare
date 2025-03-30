import { useEffect, useState } from "react";
import HandlingSignIn from "./components/HandlingSignIn";
import HomePage from "./components/HomePage";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { userAction } from "./store/privacy";
import { itemAction } from "./store/counter";

const App = () => {
  // const { currLoggedInUser } = useContext(SignIn);
  const dispatch = useDispatch();
  // const { currLoggedInUser } = useContext(SignIn);
  const [signingIn, signup] = useState("SignUp");
  const [homepage, loginpage] = useState(0);
  const [userdetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());

        const userData = docSnap.data();
        dispatch(userAction.newName(userData.username));
      } else {
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    let storedUser = window.localStorage.getItem("currLoggedInUser");
    if (storedUser) {
      loginpage(1);
    }
  }, []);
  const signInToUp = (val) => {
    signup(val);
  };

  const loginTOhome = (val) => {
    loginpage(val);
    if (val === 0) {
      window.localStorage.removeItem("currLoggedInUser");
    }
  };
  
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "RideData"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
       dispatch(itemAction.itemadd(items))
      
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();


  return (
    <>
      {homepage === 1 ? (
        <HomePage loginTOhome={loginTOhome} homepage={homepage} fetchData={fetchData}/>
      ) : (
        <HandlingSignIn
          signingIn={signingIn}
          signInToUp={signInToUp}
          loginTOhome={loginTOhome}
          homepage={homepage}
        />
      )}
    </>
  );
};
export default App;
