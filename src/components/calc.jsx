import React, { useState } from 'react';
import './CarbonFootprintCalculator.css';

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState({
    electricity: '',
    gas: '',
    fuel: '',
    distance: '',
    transportMode: 'car', // default value
  });
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Predefined emission factors (in kg CO2 per unit)
    const emissionFactors = {
      electricity: 0.92, // kg CO2 per kWh
      gas: 2.3, // kg CO2 per m³
      fuel: 2.31, // kg CO2 per liter of fuel
      car: 0.21, // kg CO2 per km for car
      bus: 0.05, // kg CO2 per km for bus
      train: 0.04, // kg CO2 per km for train
      flight: 0.15, // kg CO2 per km for flight
    };

    // Calculate carbon footprint based on inputs
    const electricityFootprint = parseFloat(formData.electricity) * emissionFactors.electricity;
    const gasFootprint = parseFloat(formData.gas) * emissionFactors.gas;
    const fuelFootprint = parseFloat(formData.fuel) * emissionFactors.fuel;
    const transportFootprint =
      parseFloat(formData.distance) * emissionFactors[formData.transportMode];

    const totalCarbonFootprint =
      electricityFootprint + gasFootprint + fuelFootprint + transportFootprint;

    setCarbonFootprint(totalCarbonFootprint);
  };

  return (
    <div className="carbon-footprint-container">
      <h2>Carbon Footprint Calculator</h2>
      <form onSubmit={handleSubmit} className="carbon-form">
        <div className="form-group">
          <label htmlFor="electricity">Electricity Usage (kWh):</label>
          <input
            type="number"
            id="electricity"
            name="electricity"
            value={formData.electricity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gas">Gas Usage (m³):</label>
          <input
            type="number"
            id="gas"
            name="gas"
            value={formData.gas}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuel">Fuel Consumption (liters):</label>
          <input
            type="number"
            id="fuel"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance Traveled (km):</label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="transportMode">Mode of Transport:</label>
          <select
            id="transportMode"
            name="transportMode"
            value={formData.transportMode}
            onChange={handleChange}
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <button type="submit">Calculate Carbon Footprint</button>
      </form>

      {carbonFootprint !== null && (
        <div className="result">
          <h3>Your Carbon Footprint is: {carbonFootprint.toFixed(2)} kg CO₂</h3>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
