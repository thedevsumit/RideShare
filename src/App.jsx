import { useEffect, useState } from "react";

import HomePage from "./components/HomePage";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { userAction } from "./store/privacy";
import { itemAction } from "./store/counter";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AvailableRide from "./components/AvailableRide";
import JoinRide from "./components/JoinRide";
import Profile from "./components/Profile";
const App = () => {
  
  const dispatch = useDispatch();
  // const navigate = useNavigate();
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
    console.log("HElo")
  },);
  useEffect(() => {
    let storedUser = window.localStorage.getItem("currLoggedInUser");
    if (storedUser) {
      
      
    }
  }, []);

  
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
     <Router>
      <Routes>
        <Route path="/" element={<HomePage fetchData={fetchData}/>} />
        <Route path="/available" element={<AvailableRide />} />
        <Route path="/joined" element={<JoinRide />} />
        <Route path="/profile" element={<Profile />} />
        
        
      </Routes>
     </Router>
    </>
  );
};
export default App;
