import React, { useState } from 'react';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [endDate, setEndDate] = useState(''); // New state for end date
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phone) => {
    const re = /^\d{10}$/; // Example: 10-digit phone number
    return re.test(String(phone));
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setDateOfBirth('');
    setArea('');
    setCity('');
    setPinCode('');
    setState('');
    setEndDate('');
    setMessage('');
    setError('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !email || !phoneNumber || !dateOfBirth || !area || !city || !pinCode || !state) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Phone number must be 10 digits.');
      return;
    }

    const registrationData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      area,
      city,
      pinCode,
      state,
      endDate,
    };

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const result = await response.text();
      setMessage(result); // Adjust based on your API response structure
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Registration failed: ' + err.message);
      setMessage('');
    }
  };

  return (
    <div className="container mt-5 content-wrapper">
      <h2 className="text-center">Registration Form</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3" style={{ position: "relative", display: "flex", alignItems: "center", marginBottom:"0px" }}>
  <input
    type="date"
    className="form-control"
    value={dateOfBirth}
    onChange={(e) => setDateOfBirth(e.target.value)}
    required
    style={{
      flex: 1, // Make input take full width
      color: dateOfBirth ? "#000" : "#999", // Normal text color
    }}
  />
  {!dateOfBirth && (
    <span
      style={{
        position: "absolute",
        right: "400px", // Position text towards the right
        top:"10px",
        color: "#999", // Placeholder text color
        fontSize: "15px",
        pointerEvents: "none", // Prevent clicking on the text
      }}
    >
      Enter Date of Birth
    </span>
  )}
</div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Pin Code "
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        {error && <p className="text-danger">{error}</p>}
        {message && <p className="text-success">{message}</p>}
      </form>
    </div>
  );
}

export default RegistrationForm; 