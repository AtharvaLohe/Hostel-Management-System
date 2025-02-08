import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CSS/AdminDashBoard.css"; // Reusing Admin Dashboard CSS for consistent styling

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
            { key: "ticket", icon: "ticket-alt", label: "Tickets" },
            { key: "meal", icon: "utensils", label: "Meal" }
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
        {/* Home Section (default) */}
        {view === "home" && (
          <div className="text-center mt-5">
            <h1>Hosteller Dashboard</h1>
            {userDetails && <h2>Welcome, {userDetails.username}!</h2>}
            <p>Manage your hostel experience efficiently from this panel.</p>
          </div>
        )}

        {/* Tickets Section */}
        {view === "ticket" && (
          <div className="text-center mt-5">
            <h1>Ticket Management</h1>
            <Link to="/ticketform" className="btn btn-warning px-5 py-3 m-2">
              Raise Ticket
            </Link>
            <Link to="/ticketlist" className="btn btn-info px-5 py-3 m-2">
              Show My Tickets
            </Link>
          </div>
        )}

        {/* Meal Section */}
        {view === "meal" && (
          <div className="text-center mt-5">
            <h1>Meal Section</h1>
            <Link to="/hostlerMeal" className="btn btn-success px-5 py-3">
              Go to Meal Selection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostellerDashboard;
