import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 24.7136, lng: 46.6753 };

const MapPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pickup = params.get("pickup") || "";
  const destination = params.get("destination") || "";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (pickup && destination) {
      const geocoder = new google.maps.Geocoder();
      const directionsService = new google.maps.DirectionsService();

      geocoder.geocode({ address: pickup }, (pickupResults) => {
        geocoder.geocode({ address: destination }, (destinationResults) => {
          if (pickupResults[0] && destinationResults[0]) {
            directionsService.route(
              {
                origin: pickupResults[0].geometry.location,
                destination: destinationResults[0].geometry.location,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  setDirections(result);
                } else {
                  console.error("Error fetching directions:", status);
                }
              }
            );
          }
        });
      });
    }
  }, [pickup, destination]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapPage;
