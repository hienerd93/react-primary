import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="p-5 mb-4 bg-light rounded-3">
    <h1>Administration</h1>
    <p>React 18 build from scratch for responsive web app.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      About
    </Link>
  </div>
);

export default HomePage;
