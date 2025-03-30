import styles from "./Header.module.css";
const Header = ({
  setjoinride,
  avaiLableChange,
  changingPublish,
  changingSidebar,
}) => {
  return (
    <>
      <div className={styles["parent-header"]}>
        <div className={styles["main-header"]}>
          <div className={styles["one-header"]}>
          {/* <img
            className={styles["one-header-img-smartbasket"]}
            src="logo.png"
            alt="SmartBasket"
          /> */}
            <span className={styles["one-header-smartbasket"]}>RideShare</span>
          </div>
          <div className={styles["main-parent-list"]}>
            <ul className={styles["main-list"]}>
              <li
                className={styles["list-items"]}
                onClick={() => {
                  changingPublish(1);
                  avaiLableChange(0);
                  setjoinride(0);
                }}
              >
                PUBLISH
              </li>
              <li
                className={styles["list-items"]}
                onClick={() => {
                  avaiLableChange(1);
                  changingPublish(0);
                  setjoinride(0);
                  fetchData();
                }}
              >
                AVAILABLE
              </li>
              <li
                className={styles["list-items"]}
                onClick={() => {
                  setjoinride(1);
                  changingPublish(0);
                  avaiLableChange(0);
                }}
              >
                YOUR RIDE
              </li>
              <li className={styles["list-items"]}>PROFILE</li>
            </ul>
          </div>
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
    </>
  );
};
export default Header;
