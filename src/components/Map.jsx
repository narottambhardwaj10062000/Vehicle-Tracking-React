import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Map = ({ origin, destination, travelMode, onPositionChange }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directionResult, setDirectionResult] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (directionResult && directionResult.routes.length > 0) {
      const route = directionResult.routes[0].overview_path;

      setCurrentPosition(route[0]);
      setRouteIndex(0);

      const id = setInterval(() => {
        setRouteIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < route.length) {
            setCurrentPosition(route[nextIndex]);
            return nextIndex;
          } else {
            clearInterval(id);
            return prevIndex;
          }
        });
      }, 2000);

      setIntervalId(id);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [directionResult]);

  useEffect(() => {
    if (currentPosition) {
      const position = {
        lat: currentPosition.lat(),
        lng: currentPosition.lng(),
      };
      console.log("Current Position in Map:", position); // Debug current position
      onPositionChange(position); // Pass the extracted position to the parent
    }
  }, [currentPosition, onPositionChange]);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setDirectionResult(null);
  }, [origin, destination, travelMode]);

  const handleDirectionsCallback = (result, status) => {
    if (status === 'OK' && result) {
      setDirectionResult(result);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCqBsluJRRtCBM3WdfUl2AIfeCiGCbwdH4">
      <GoogleMap 
        mapContainerStyle={{ height: "400px", width: "100%" }} 
        zoom={14} 
        center={currentPosition || origin}
      >
        {origin && destination && !directionResult && (
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode,
            }}
            callback={handleDirectionsCallback}
          />
        )}
        {directionResult && (
          <DirectionsRenderer directions={directionResult} />
        )}
        {currentPosition && (
          <Marker 
            position={currentPosition} 
            icon={{
              url: "https://img.icons8.com/ios-filled/50/000000/car.png",
              scaledSize: new window.google.maps.Size(32, 32),
            }} 
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;