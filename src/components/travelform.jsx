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
    <div style={styles.container}>
      <h3 style={styles.header}>Carbon Footprint Calculator</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>Start Location:</label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>End Location:</label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Mode of Transport:</label>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            required
            style={styles.select}
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Calculate Emissions</button>
      </form>

      {emissions && <h3 style={styles.emissionText}>Estimated Emissions: {emissions} grams of CO₂</h3>}
      {error && <p style={styles.errorText}>{error}</p>}

      {directions && (
        <div style={styles.googleMap}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }} // Set width to 100% and height to 100% for full screen
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

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#2C2C2C', // Dark background color
    color: '#FFF', // White text
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    padding: '20px',
    width: '100vw', // Full screen width
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  form: {
    backgroundColor: '#333', // Dark form background
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#CCC', // Light gray text for labels
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #555', // Darker border
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: '#555', // Darker input field background
    color: '#FFF', // Light text inside inputs
  },
  select: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #555',
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: '#555',
    color: '#FFF',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  emissionText: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#FFF', // White text for emissions text
  },
  errorText: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#f44336', // Red for errors
  },
  googleMap: {
    marginTop: '30px',
    width: '100%', // Full screen width for Google Map
    height: '500px', // Set a fixed height for the map
  },
};

export default Travelf;
