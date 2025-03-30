import { useContext, useState } from "react";
import styles from "./HomePage.module.css";
import PublishRide from "./PublishRide";
import AvailableRide from "./AvailableRide";
import Sidebar from "./Sidebar";
import JoinRide from "./JoinRide";
import Header from "./Header";
// import { SignIn } from "../store/SignUp-store";
// import MainShoppingPage from "./MainShoppingPage";
// import ShoppingCart from "./ShoppingCart";
const HomePage = ({ loginTOhome, homepage,fetchData }) => {
  const [publishride,setpublishride] = useState(0)
  const [joinride,setjoinride] = useState(0)
  const changingPublish  = (val) => {
    setpublishride(val)
  }
  const [sidebar, setsidebar] = useState(0);
  // const { currentValue } = useSelector((store) => store.items);
  // const { itemList } = useContext(SignIn);
  // const { currLoggedInUser } = useContext(SignIn);
  const changingSidebar = (customVal) => {
    setsidebar(customVal);
  };
  const [availableRide,setAvailableRide] = useState(0)
  const avaiLableChange  = (val) => {
    setAvailableRide(val)
  }
  return (
    <>
      {/* <div className={styles["main-header"]}>
        <div className={styles["one-header"]}>
          <img
            className={styles["one-header-img-smartbasket"]}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBaiZLcF7exbj66tDPUag05XXxCSU4Q1Gy6g&s"
            alt="SmartBasket"
          />
          <span className={styles["one-header-smartbasket"]}>RideShare</span>
        </div>
        <div  className={styles["main-parent-list"]}>
          <ul  className={styles["main-list"]}>
            <li className={styles["list-items"]} onClick={()=>{
              changingPublish(1)
              avaiLableChange(0)
              setjoinride(0)
            }}>Publish Ride</li>
            <li className={styles["list-items"]} onClick={()=>{
              avaiLableChange(1)
              changingPublish(0)
              setjoinride(0)
              fetchData()
            }}>Available Rides</li>
            <li className={styles["list-items"]} onClick={()=>{
              setjoinride(1)
              changingPublish(0)
              avaiLableChange(0)
            }}>Your Ride</li>
            <li className={styles["list-items"]}>Profile</li>
          </ul>
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
      </div> */}
      <Header changingPublish={changingPublish} avaiLableChange={avaiLableChange} setjoinride={setjoinride} changingSidebar={changingSidebar}/>
      {sidebar === 1 && (
        <Sidebar
          
          changingSidebar={changingSidebar}
          loginTOhome={loginTOhome}
          homepage={homepage}
        ></Sidebar>
      )}
      {publishride === 1 && <PublishRide></PublishRide>}
      {availableRide===1 && <AvailableRide fetchData={fetchData}></AvailableRide>}
     {joinride === 1 &&  <JoinRide/>}
    </>
  );
};
export default HomePage;
