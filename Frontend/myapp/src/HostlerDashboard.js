import React, { useState } from "react";
import { useSelector } from "react-redux";
import TicketList from "./TicketList";
import TicketForm from "./TicketForm";
import HostlerMeal from "./MealComponent";
import './CSS/AdminDashBoard.css'; // Import the same CSS file

const HostellerDashboard = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [view, setView] = useState("home"); // Default view is home

  return (
    <div className="d-flex">
      {/* Sidebar Menu */}
      <div className="bg-sidebar">
        <h2>Menu</h2>
        <ul>
          {[
            { key: "home", icon: "home", label: "Home" },
            { key: "ticket", icon: "ticket-alt", label: "My Tickets" },
            { key: "ticketForm", icon: "plus-circle", label: "Raise Ticket" },
            { key: "meal", icon: "utensils", label: "Meal Selection" },
          ].map((item) => (
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
        {view === "home" && (
          <div className="text-center mt-5">
            <h1>Hosteller Dashboard</h1>
            {userDetails && <h2>Welcome, {userDetails.username}!</h2>}
            <p>Manage your hostel experience efficiently from this panel.</p>
          </div>
        )}

        {/* Dynamic Content Sections */}
        {[
          { key: "ticket", title: "My Tickets", component: <TicketList /> },
          { key: "ticketForm", title: "Raise Ticket", component: <TicketForm /> },
          { key: "meal", title: "Meal Selection", component: <HostlerMeal /> },
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

export default HostellerDashboard;