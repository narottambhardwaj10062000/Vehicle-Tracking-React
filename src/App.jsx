import React, { useState } from "react";
import Map from "./components/Map";

const App = () => {
  const [origin, setOrigin] = useState({ lat: 37.7749, lng: -122.4194 });
  const [destination, setDestination] = useState({
    lat: 37.7849,
    lng: -122.4294,
  });
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [currentPosition, setCurrentPosition] = useState(null);

  const handleOriginChange = (e) => {
    const [lat, lng] = e.target.value.split(",");
    setOrigin({ lat: parseFloat(lat), lng: parseFloat(lng) });
  };

  const handleDestinationChange = (e) => {
    const [lat, lng] = e.target.value.split(",");
    setDestination({ lat: parseFloat(lat), lng: parseFloat(lng) });
  };

  const handlePositionChange = (position) => {
    console.log("Updated Position:", position);
    setCurrentPosition(position);
  };

  return (
    <div>
      <h1>Vehicle Movement Tracker</h1>
      <div>
        <label>Origin: </label>
        <input
          type="text"
          onChange={handleOriginChange}
          placeholder="Enter origin lat,lng"
        />
        <label>Destination: </label>
        <input
          type="text"
          onChange={handleDestinationChange}
          placeholder="Enter destination lat,lng"
        />
        <select
          onChange={(e) => setTravelMode(e.target.value)}
          value={travelMode}
        >
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </div>
      <Map 
        origin={origin} 
        destination={destination} 
        travelMode={travelMode} 
        onPositionChange={handlePositionChange} 
      />
      {currentPosition && (
        <div>
          <h2>Current Position</h2>
          <p>Latitude: {currentPosition.lat}</p>
          <p>Longitude: {currentPosition.lng}</p>
        </div>
      )}
    </div>
  );
};

export default App;
