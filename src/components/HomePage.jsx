

import PublishRide from "./PublishRide";
import Navigaton from "./Navigation";
import Header from "./Header";

const HomePage = ({fetchData }) => {

  return (
    <>
      
      <Header fetchData={fetchData}/>
      <Navigaton fetchData={fetchData}></Navigaton>
      <PublishRide></PublishRide>
      
    </>
  );
};
export default HomePage;
