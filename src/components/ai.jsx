import React, { useState } from 'react';
import axios from 'axios';
import './CarbonFootprintForm.css'; // Import the CSS file

function CarbonFootprintForm() {
    const [vehicleDistance, setVehicleDistance] = useState('');
    const [groceryBill, setGroceryBill] = useState('');
    const [wasteBagCount, setWasteBagCount] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            'Vehicle Monthly Distance Km': vehicleDistance,
            'Monthly Grocery Bill': groceryBill,
            'Waste Bag Weekly Count': wasteBagCount
        };

        try {
            // Step 1: Send data to the prediction API
            const response = await axios.post('http://localhost:8000/api/predict/', userData);
            setPrediction(response.data.predicted_emission);
            const suggestions = Array.isArray(prediction.suggestions) ? prediction.suggestions : [];
            setSuggestions(response.data.suggestions);

            // Step 2: After getting prediction, send data to Django backend to store in MySQL
            const dataToStore = {
                vehicle_distance: vehicleDistance,
                grocery_bill: groceryBill,
                waste_bag_count: wasteBagCount,
                predicted_emission: response.data.predicted_emission,
                suggestions: response.data.suggestions // Convert suggestions array to string
            };

            // Step 3: Send the data to the backend Django API
            await axios.post('http://localhost:8000/api/submit-carbon-footprint/', dataToStore);

        } catch (error) {
            console.error("Error processing data:", error);
        }
    };

    return (
        <div className="fullscreen-container">
            <section className="form-section">
                <h2>Calculate Your Carbon Footprint</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Vehicle Monthly Distance (km):</label>
                        <input
                            type="number"
                            value={vehicleDistance}
                            onChange={(e) => setVehicleDistance(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Monthly Grocery Bill:</label>
                        <input
                            type="number"
                            value={groceryBill}
                            onChange={(e) => setGroceryBill(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Waste Bag Weekly Count:</label>
                        <input
                            type="number"
                            value={wasteBagCount}
                            onChange={(e) => setWasteBagCount(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>

                {prediction !== null && (
                    <div className="result-box">
                        <h3>Prediction: {prediction} kg CO₂</h3>
                        <p className="prediction-info">
                            This value represents your estimated monthly carbon emissions based on your inputs. 
                            A lower carbon footprint means a smaller impact on the environment. 
                            Consider adopting eco-friendly habits to reduce emissions.
                        </p>
                        
                        <h4>Suggestions to Reduce Your Carbon Footprint:</h4>
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
}

export default CarbonFootprintForm;
