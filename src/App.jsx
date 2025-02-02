import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import EcoCalc from "./components/main";
import CarbonFootprintForm from "./components/ai";  // Import AI component
import Travelf from "./components/travelform";  // Import TravelForm component
import Navbar from "./components/Navbar";
import CarbonFootprintCalculator from "./components/calc";

const App = () => {
  return (
    <Router>
     
      {/* <EcoCalc /> */}
      {/* <Travelf/> */}
      <Navbar />
      <Routes>
     
        <Route path="/" exact element={<EcoCalc/>} />
        <Route path="/predict" element={<CarbonFootprintForm/>} />  {/* Route for AI Prediction */}
        <Route path="/travelform" element={<Travelf />} />  {/* Route for TravelForm */}
        <Route path="/calc" element={<CarbonFootprintCalculator />} />  {/* Route for CarbonFootprintCalculator */}
      </Routes>
    </Router>
  );
};

export default App;
