import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { userAction } from "./store/privacy";
import { itemAction } from "./store/counter";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HelpPage from "./pages/HelpPage";
import HomePage from "./pages/HomePage";
// import Profile from "./components/Profile";
import AboutUs from "./pages/About";
import PublishRidePage from "./pages/PublishRide";
import JoinedRidePage from "./pages/JoinedRide";
import AvailablePage from "./pages/AvailablePage";
import AppWrapper from "./components/AppWrapper";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);

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
    const unsubscribe = onSnapshot(
      collection(db, "RideData"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(itemAction.itemadd(items));
        console.log("Rides updated in real-time:", items.length);
      },
      (error) => {
        console.error("Error in ride snapshot listener:", error);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  const AppContent = () => (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/available" element={<AvailablePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/publish" element={<PublishRidePage />} />
          <Route path="/joined" element={<JoinedRidePage />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );

  return (
    <AppWrapper>
      <AppContent />
    </AppWrapper>
  );
};

export default App;
