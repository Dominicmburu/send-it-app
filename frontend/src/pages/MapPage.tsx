import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Extend the Leaflet namespace so that L.Routing is recognized.
declare global {
  namespace L {
    let Routing: any;
  }
}

// Helper function using Nominatim for geocoding an address.
async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

interface RoutingMachineProps {
  pickupCoords: { lat: number; lng: number } | null;
  destinationCoords: { lat: number; lng: number } | null;
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ pickupCoords, destinationCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(pickupCoords.lat, pickupCoords.lng),
          L.latLng(destinationCoords.lat, destinationCoords.lng),
        ],
        lineOptions: {
          styles: [{ color: "blue", weight: 4 }],
        },
        // Annotate the parameter with 'any' to avoid implicit any error.
        createMarker: (i: number, wp: any) => L.marker(wp.latLng, { draggable: false }),
        addWaypoints: false,
        routeWhileDragging: false,
      }).addTo(map);

      return () => {
        try {
          if (map && routingControl) {
            map.removeControl(routingControl);
          }
        } catch (error) {
          console.error("Error removing routing control:", error);
        }
      };
    }
  }, [map, pickupCoords, destinationCoords]);

  return null;
};

const MapPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pickup = params.get("pickup") || "";
  const destination = params.get("destination") || "";

  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (pickup) {
      geocode(pickup).then((coords) => setPickupCoords(coords));
    }
    if (destination) {
      geocode(destination).then((coords) => setDestinationCoords(coords));
    }
  }, [pickup, destination]);

  // Use pickupCoords as center if available; otherwise default to [0,0].
  const center = pickupCoords || { lat: 0, lng: 0 };

  return (
    <MapContainer center={center} zoom={10} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pickupCoords && (
        <Marker position={[pickupCoords.lat, pickupCoords.lng]}>
          <Popup>Pickup: {pickup}</Popup>
        </Marker>
      )}
      {destinationCoords && (
        <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
          <Popup>Destination: {destination}</Popup>
        </Marker>
      )}
      <RoutingMachine pickupCoords={pickupCoords} destinationCoords={destinationCoords} />
    </MapContainer>
  );
};

export default MapPage;
