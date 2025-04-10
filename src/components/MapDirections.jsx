// MapDirections.js
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const MapDirections = ({ origin, destination }) => {
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCSQb3hZRRZxHkpicdGYfUJvwFhjaHBM-M", // Replace with your API key
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
    }
  }, [isLoaded, origin, destination]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={7} center={{ lat: 20.5937, lng: 78.9629 }}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapDirections;
