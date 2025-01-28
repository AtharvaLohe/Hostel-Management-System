import React from 'react';
import { useSelector } from 'react-redux';

const HostlerDashboard = () => {
    const userDetails = useSelector(state => state.user.userDetails);

    return (
        <div className="container mt-5">
            <h1>Hostler Dashboard</h1>
            {userDetails && <h2>Welcome, {userDetails.username}!</h2>}
            {/* Add more hostler-specific content here */}
            <p>This is the hostler dashboard where you can view your details, make requests, etc.</p>
        </div>
    );
};

export default HostlerDashboard;