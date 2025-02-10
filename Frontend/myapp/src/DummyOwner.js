import React from 'react';
const DummyOwner = () => {
    
    
    return (
      <div className="container mt-5 content-wrapper">
        <div className="row align-items-center">
          {/* Image on the left */}
          <div className="col-md-6">
           
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
        </div>)

}


export default DummyOwner;