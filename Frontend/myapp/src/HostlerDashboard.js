// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import TicketForm from './TicketForm';
// import TicketList from './TicketList'; // Import the TicketList component
// import { useNavigate } from 'react-router-dom';
// import MealComponent from './MealComponent';
// const HostlerDashboard = () => {
//     const userDetails = useSelector(state => state.user.userDetails);
//     const [view, setView] = useState(''); // State to manage which view to show
//     const navigate = useNavigate();

//     const handleRaiseTicket = () => {
//         setView('form'); // Show the ticket form
//     };

//     const handleViewTickets = () => {
//         setView('list'); // Show the list of tickets
//     };

//     const handleGoToMealSelection = () => {
        
//         navigate('/hostlerMeal'); // Navigate to the meal selection page
//     };

//     return (
//         <div className="container mt-5">
//             {/* Dashboard Header */}
//             <div className="text-center mb-5">
//                 <h1 className="display-4 text-primary">Hostler Dashboard</h1>
//                 {userDetails && <h2 className="text-muted">Welcome, {userDetails.username}!</h2>}
//             </div>

//             {/* Action Buttons */}
//             <div className="d-flex justify-content-center mb-4">
//                 <button 
//                     className="btn btn-success me-3 px-4 py-2 shadow-sm" 
//                     onClick={handleRaiseTicket}
//                     style={{ fontWeight: 'bold', fontSize: '16px' }}
//                 >
//                     Raise a Ticket
//                 </button>
//                 <button 
//                     className="btn btn-info px-4 py-2 shadow-sm" 
//                     onClick={handleViewTickets}
//                     style={{ fontWeight: 'bold', fontSize: '16px' }}
//                 >
//                     Show My Tickets
//                 </button>
//                 {userDetails && ( <button 
//             className="btn btn-info px-4 py-2 shadow-sm" 
//             onClick={handleGoToMealSelection} 
//             style={{ fontWeight: 'bold', fontSize: '16px' }}>
//             Go to Meal Selection
//                  </button>
//                 )}
               
//             </div>

//             {/* Conditional rendering based on the selected view */}
//             {view === 'form' && (
//                 <div className="card shadow-lg p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
//                     <TicketForm hostlerId={userDetails.hostlerId} />
//                 </div>
//             )}

//             {view === 'list' && (
//                 <div className="card shadow-lg p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
//                     <h3 className="text-center text-primary">Your Tickets</h3>
//                     <TicketList hostlerId={userDetails.hostlerId} />
//                 </div>
//             )}

//             {/* Information Section */}
//             <div className="text-center mt-5">
//                 <p className="text-muted">
//                     This is your dashboard where you can raise new tickets, view existing tickets, and manage your requests.
//                 </p>
//             </div>

       
//         </div>
        
//     );
// };

// export default HostlerDashboard;





import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

const HostlerDashboard = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    const [view, setView] = useState(""); // Manage which view to show

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar (Leftmost and Lowered) */}
                <nav className="col-md-2 col-lg-2 d-md-block bg-light sidebar position-fixed vh-100 mt-4 p-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-light text-dark w-100 text-start"
                                onClick={() => setView("")}
                            >
                                🏠 Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-light text-dark w-100 text-start"
                                onClick={() => setView("form")}
                            >
                                🎫 Raise a Ticket
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-light text-dark w-100 text-start"
                                onClick={() => setView("list")}
                            >
                                📜 Show My Tickets
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link to="/hostlerMeal" className="nav-link btn btn-light text-dark w-100 text-start">
                                🍽️ Go to Meal Selection
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Main Content (Pushed Right) */}
                <main className="col-md-10 ms-auto px-md-4">
                    <div className="text-center my-4">
                        <h1 className="display-4 text-primary">Hostler Dashboard</h1>
                        {userDetails && <h2 className="text-muted">Welcome, {userDetails.username}!</h2>}
                    </div>

                    {/* Conditional Views */}
                    {view === "form" && <TicketForm hostlerId={userDetails.hostlerId} />}
                    {view === "list" && (
                        <>
                            <h3 className="text-center text-primary">Your Tickets</h3>
                            <TicketList hostlerId={userDetails.hostlerId} />
                        </>
                    )}

                    {/* Default Home Content */}
                    {view === "" && (
                        <div className="text-center mt-5">
                            <p className="text-muted">
                                This is your dashboard where you can raise new tickets, view existing tickets, and manage your requests.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default HostlerDashboard;
