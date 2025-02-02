import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <a href="/" className="logo">
        <span>EcoCalc</span>
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/predict">Prediction</Link>
          </li>
          <li>
            <Link to="/travelform">Calculator(Location Based)</Link>
          </li>
          <li>
            <Link to="/calc">Calculator(Data Based)</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
