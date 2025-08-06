import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-box">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="not-found-btn">
          ← Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
