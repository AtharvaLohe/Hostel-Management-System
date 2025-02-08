import React, { useState } from "react";
import { useSelector } from "react-redux";
import TicketList from "./TicketList";
import TicketForm from "./TicketForm";
import HostlerMeal from "./MealComponent";
import "./CSS/AdminDashBoard.css"; // CSS for Sidebar and Layout

const HostellerDashboard = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [view, setView] = useState("home"); // Default view is home

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar Menu */}
      <div
        className="bg-sidebar"
        style={{ width: "250px", height: "100vh", position: "fixed" }}
      >
        <h2 className="text-center py-3">Menu</h2>
        <ul className="list-unstyled">
          {[
            { key: "home", icon: "home", label: "Home" },
            { key: "ticket", icon: "ticket-alt", label: "My Tickets" },
            { key: "ticketForm", icon: "plus-circle", label: "Raise Ticket" },
            { key: "meal", icon: "utensils", label: "Meal Selection" }
          ].map((item) => (
            <li
              key={item.key}
              className={`sidebar-item ${view === item.key ? "active" : ""}`}
              onClick={() => setView(item.key)}
            >
              <i className={`fas fa-${item.icon} me-2`}></i> {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px", width: "100%" }}
      >
        {[
          {
            key: "home",
            content: (
              <div className="text-center mt-5">
                <h1>Hosteller Dashboard</h1>
                {userDetails && <h2>Welcome, {userDetails.username}!</h2>}
                <p>
                  Manage your hostel experience efficiently from this panel.
                </p>
              </div>
            )
          },
          { key: "ticket", content: <TicketList /> },
          { key: "ticketForm", content: <TicketForm /> },
          { key: "meal", content: <HostlerMeal /> }
        ].map(
          (section) =>
            view === section.key && (
              <div key={section.key}>
                {section.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default HostellerDashboard;
