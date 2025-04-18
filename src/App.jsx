import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { userAction } from "./store/privacy";
import { itemAction } from "./store/counter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import AvailableRide from "./components/AvailableRide";
import JoinRide from "./components/JoinRide";
import Profile from "./components/Profile";
import Help from "./components/Help";
import AboutUs from "./components/About";

const App = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);

  // 🧠 Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserDetails(userData);
          dispatch(userAction.newName(userData.username));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "RideData"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(itemAction.itemadd(items));
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/available" element={<AvailableRide />} />
        <Route path="/joined" element={<JoinRide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
