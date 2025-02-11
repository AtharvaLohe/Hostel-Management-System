import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RoomAllocation from './RoomAllocation';  
import AdminTicketSystem from './AdminTicketSystem'; 
import FoodMealManager from './AdminMeal';
import AllocatedHostlers from './AllocatedHostler';
import RoomStatusBoard from './RoomStatusBoard';
import './CSS/AdminDashBoard.css';

const AdminDashboard = () => {
    const userDetails = useSelector(state => state.user.userDetails);
    const [view, setView] = useState('home'); // Default to 'home'

    return (
        <div className="d-flex">
            {/* Sidebar Menu */}
            <div className="bg-sidebar">
                <h2>Menu</h2>
                <ul>
                    {[
                        { key: 'home', icon: 'home', label: 'Home' },
                        { key: 'unallocated', icon: 'users', label: 'Unallocated Hostlers' },
                        { key: 'tickets', icon: 'ticket-alt', label: 'Ticket List' },
                        { key: 'meals', icon: 'utensils', label: 'Manage Meals' },
                        { key: 'hostlers', icon: 'user-friends', label: 'Hostlers' },
                        { key: 'rooms', icon: 'bed', label: 'Rooms' }
                    ].map(item => (
                        <li key={item.key}>
                            <button 
                                className="menu-button" 
                                onClick={() => setView(item.key)}
                            >
                                <i className={`fas fa-${item.icon}`}></i> {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Main Content */}
            <div className="main-content">
                {/* Show the heading only on the Home section */}
                {view === 'home' && (
                    <div className="text-center mt-5">
                        <h1>Admin Dashboard</h1>
                        {userDetails && <h2>Welcome, {userDetails.username}!</h2>}
                        <p>Manage hostel operations efficiently from this panel.</p>
                    </div>
                )}

                {/* Dynamic Content Sections */}
                {[
                    { key: 'unallocated', title: 'Unallocated Hostlers', component: <RoomAllocation /> },
                    { key: 'tickets', title: 'Ticket Management', component: <AdminTicketSystem /> },
                    { key: 'meals', title: 'Meal Management', component: <FoodMealManager /> },
                    { key: 'hostlers', title: 'Hostler List', component: <AllocatedHostlers /> },
                    { key: 'rooms', title: 'Room List', component: <RoomStatusBoard /> }
                ].map(section => (
                    view === section.key && (
                        <div key={section.key} className="section-card">
                            <h3 className="section-title">{section.title}</h3>
                            {section.component}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
