// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import RoomAllocation from './RoomAllocation';  
// import AdminTicketSystem from './AdminTicketSystem'; 
// // import RoomStatusBoard from './RoomStatusBoard';
// import FoodMealManager from './AdminMeal';
// const AdminDashboard = () => {
//     const userDetails = useSelector(state => state.user.userDetails);
//     const [view, setView] = useState(''); 

//     const handleShowUnallocatedHostlers = () => {
//         setView('unallocated'); 
//     };

//     const handleShowTickets = () => {
//         setView('tickets'); 
//     };

//     const handleShowMeals = () => {
//         setView('meals'); // New function for meal management
//     };
    

//     return (
//         <div className="container mt-5">
//             {/* Dashboard Header */}
//             <div className="text-center mb-5">
//                 <h1 className="display-4 text-primary">Admin Dashboard</h1>
//                 {userDetails && <h2 className="text-muted">Welcome, {userDetails.username}!</h2>}
//             </div>

//             {/* Action Buttons */}
//             <div className="d-flex justify-content-center mb-4 gap-4">
//                 <button 
//                     className="btn btn-warning px-5 py-3 shadow-lg rounded-pill text-white fw-bold hover-effect"
//                     style={{ fontSize: '18px', borderRadius: '25px' }} 
//                     onClick={handleShowUnallocatedHostlers}
//                 >
//                     <i className="fas fa-users me-2"></i> Show Unallocated Hostlers
//                 </button>
//                 <button 
//                     className="btn btn-info px-5 py-3 shadow-lg rounded-pill text-white fw-bold hover-effect"
//                     style={{ fontSize: '18px', borderRadius: '25px' }} 
//                     onClick={handleShowTickets}
//                 >
//                     <i className="fas fa-ticket-alt me-2"></i> Show Ticket List
//                 </button>
//                 <button 
//                     className="btn btn-success px-5 py-3 shadow-lg rounded-pill text-white fw-bold hover-effect"
//                     style={{ fontSize: '18px', borderRadius: '25px' }} 
//                      onClick={handleShowMeals}
//                 >
//     <i className="fas fa-utensils me-2"></i> Manage Meals
// </button>
//             </div>

//             {/* Conditional rendering based on the selected view */}
//             {view === 'unallocated' && (
//                 <div className="card shadow-lg p-4 rounded-lg mb-4" style={{ backgroundColor: '#f4f6f9', minHeight: '300px' }}>
//                     <h3 className="text-center text-primary mb-4">Unallocated Hostlers</h3>
//                     <RoomAllocation /> 
//                 </div>
//             )}

//             {view === 'tickets' && (
//                 <div className="card shadow-lg p-4 rounded-lg mb-4" style={{ backgroundColor: '#f4f6f9', minHeight: '300px' }}>
//                     <h3 className="text-center text-primary mb-4">Ticket Management</h3>
//                     <AdminTicketSystem /> 
//                 </div>
//             )}

//             {view === 'meals' && (
//                 <div className="card shadow-lg p-4 rounded-lg mb-4" style={{ backgroundColor: '#f4f6f9', minHeight: '300px' }}>
//                     <h3 className="text-center text-primary mb-4">Meal Management</h3>
//                     <FoodMealManager/>
//                 </div>
// )}
//             {/* {view === 'unallocated' && (
//                 <div className="card shadow-lg p-4 rounded-lg mb-4" style={{ backgroundColor: '#f4f6f9', minHeight: '300px' }}>
//                     <h3 className="text-center text-primary mb-4">Unallocated Hostlers</h3>
//                     <RoomStatusBoard /> 
//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default AdminDashboard;

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
