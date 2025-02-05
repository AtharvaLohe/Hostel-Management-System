import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TicketForm from './TicketForm';
import TicketList from './TicketList'; // Import the TicketList component
import { useNavigate } from 'react-router-dom';
import MealComponent from './MealComponent';
const HostlerDashboard = () => {
    const userDetails = useSelector(state => state.user.userDetails);
    const [view, setView] = useState(''); // State to manage which view to show
    const navigate = useNavigate();

    const handleRaiseTicket = () => {
        setView('form'); // Show the ticket form
    };

    const handleViewTickets = () => {
        setView('list'); // Show the list of tickets
    };

    const handleGoToMealSelection = () => {
        
        navigate('/hostlerMeal'); // Navigate to the meal selection page
    };

    return (
        <div className="container mt-5">
            {/* Dashboard Header */}
            <div className="text-center mb-5">
                <h1 className="display-4 text-primary">Hostler Dashboard</h1>
                {userDetails && <h2 className="text-muted">Welcome, {userDetails.username}!</h2>}
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center mb-4">
                <button 
                    className="btn btn-success me-3 px-4 py-2 shadow-sm" 
                    onClick={handleRaiseTicket}
                    style={{ fontWeight: 'bold', fontSize: '16px' }}
                >
                    Raise a Ticket
                </button>
                <button 
                    className="btn btn-info px-4 py-2 shadow-sm" 
                    onClick={handleViewTickets}
                    style={{ fontWeight: 'bold', fontSize: '16px' }}
                >
                    Show My Tickets
                </button>
                {userDetails && ( <button 
            className="btn btn-info px-4 py-2 shadow-sm" 
            onClick={handleGoToMealSelection} 
            style={{ fontWeight: 'bold', fontSize: '16px' }}>
            Go to Meal Selection
                 </button>
                )}
               
            </div>

            {/* Conditional rendering based on the selected view */}
            {view === 'form' && (
                <div className="card shadow-lg p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
                    <TicketForm hostlerId={userDetails.hostlerId} />
                </div>
            )}

            {view === 'list' && (
                <div className="card shadow-lg p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
                    <h3 className="text-center text-primary">Your Tickets</h3>
                    <TicketList hostlerId={userDetails.hostlerId} />
                </div>
            )}

            {/* Information Section */}
            <div className="text-center mt-5">
                <p className="text-muted">
                    This is your dashboard where you can raise new tickets, view existing tickets, and manage your requests.
                </p>
            </div>

       
        </div>
        
    );
};

export default HostlerDashboard;
