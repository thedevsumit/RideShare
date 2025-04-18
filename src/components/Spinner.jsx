import styles from "./Spinner.module.css";
const Spinner = () => {
  return (
    <div className={`text-center ${styles.loggingspinner}`}>
      <div className={`spinner-border logging ${styles.logging}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
