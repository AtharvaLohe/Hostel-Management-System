import React from 'react';
import './CSS/Landing.css';
import hostleimage from '../src/assets/20944167.jpg'
const LandingPage = () => {
  return (
    <div className="container mt-5 content-wrapper">
      <div className="row align-items-center">
        {/* Image on the left */}
        <div className="col-md-6">
          <img src={hostleimage} alt="Hostel" className="landing-image" />
        </div>

        {/* Text on the right */}
        <div className="col-md-6 text-center">
          <h1 className="display-4">Welcome to FullStack Haven</h1>
          <p className="lead">Your comfort and convenience are our priority.</p>
          <div className="mt-4">
            <a href="/login" className="btn btn-primary btn-lg mx-2">Login</a>
            <a href="/register" className="btn btn-secondary btn-lg mx-2">Register</a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <h2 className="mt-5 text-center">Our Features</h2>
      <div className="row mt-4 text-center">
        <div className="col-md-4">
          <h3>Comfortable Rooms</h3>
          <p>Enjoy a cozy stay with all modern amenities.</p>
        </div>
        <div className="col-md-4">
          <h3>24/7 Security</h3>
          <p>Safety and security are our top priorities.</p>
        </div>
        <div className="col-md-4">
          <h3>Study Areas</h3>
          <p>Perfect places for focused studying and group work.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
