const Spinner = () => {
  return (
    <div className="text-center absolute">
      <div className="spinner-border relative -top-[150px] left-[280px]" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
