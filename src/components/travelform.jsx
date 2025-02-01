
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import './Travelf.css';

const Travelf = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [transportMode, setTransportMode] = useState('car');
  const [emissions, setEmissions] = useState(null);
  const [error, setError] = useState('');
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);

  const googleMapsApiKey = 'AIzaSyC3R7y2ficboVL5_hCuUtBgqEcMmWb3yYw'; // Replace with your actual Google Maps API key

  const { isLoaded } = useLoadScript({ googleMapsApiKey });

  const fetchDirections = () => {
    const travelModeMapping = {
      car: "DRIVING",
      bus: "TRANSIT",
      train: "TRANSIT",
      flight: "DRIVING", // Flights are not directly supported in Google Maps Directions API
    };

    const travelMode = travelModeMapping[transportMode];

    if (!travelMode) {
      console.error("Invalid transport mode:", transportMode);
      setError("Invalid transport mode selected.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startLocation,
        destination: endLocation,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const distance = result.routes[0].legs[0].distance.value / 1000; // Convert to km
          setDistance(distance);
        } else {
          console.error("Error fetching directions:", status);
          setError("Failed to fetch directions.");
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/calculate-emissions/', {
        startLocation,
        endLocation,
        transportMode,
      });

      const emissionData = response.data.emissions;
      setEmissions(emissionData);
      setError('');
      fetchDirections();
    } catch (err) {
      setError('Error calculating emissions. Please try again.');
      setEmissions(null);
    }
  };

  if (!isLoaded) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <div>
      <h1>Carbon Footprint Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Location:</label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Location:</label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mode of Transport:</label>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            required
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <button type="submit">Calculate Emissions</button>
      </form>

      {emissions && <h2>Estimated Emissions: {emissions} grams of CO₂</h2>}
      {error && <p>{error}</p>}

      {directions && (
        <div className="google-map">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{
              lat: (directions.routes[0].legs[0].start_location.lat() + directions.routes[0].legs[0].end_location.lat()) / 2,
              lng: (directions.routes[0].legs[0].start_location.lng() + directions.routes[0].legs[0].end_location.lng()) / 2,
            }}
            zoom={7}
          >
            <DirectionsRenderer directions={directions} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Travelf;
