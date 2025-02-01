import React, { useState } from 'react';
import axios from 'axios';

const ActivityForm = () => {
    const [activityType, setActivityType] = useState('');
    const [activityValue, setActivityValue] = useState('');
    const [unit, setUnit] = useState('');
    const [environmentalFactor, setEnvironmentalFactor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user-activity/', {
                activity_type: activityType,
                activity_value: activityValue,
                unit: unit,
                environmental_factor: JSON.parse(environmentalFactor),
            });
            console.log('Activity data submitted:', response.data);
        } catch (error) {
            console.error('Error submitting activity data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Activity Type:
                <input type="text" value={activityType} onChange={(e) => setActivityType(e.target.value)} />
            </label>
            <label>
                Activity Value:
                <input type="number" value={activityValue} onChange={(e) => setActivityValue(e.target.value)} />
            </label>
            <label>
                Unit:
                <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </label>
            <label>
                Environmental Factor (JSON format):
                <input type="text" value={environmentalFactor} onChange={(e) => setEnvironmentalFactor(e.target.value)} />
            </label>
            <button type="submit">Submit Activity</button>
        </form>
    );
};

export default ActivityForm;
