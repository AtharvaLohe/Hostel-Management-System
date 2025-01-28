import React from 'react';
import { useSelector } from 'react-redux';
import RoomAllocation from './RoomAllocation';

const AdminDashboard = () => {
    const userDetails = useSelector(state => state.user.userDetails);

    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            {userDetails && <h2>Welcome, {userDetails.username}!</h2>}
            {/* Add more admin-specific content here */}
            <RoomAllocation />
        </div>
    );
};

export default AdminDashboard;