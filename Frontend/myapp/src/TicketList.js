import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './userSlice';  // Adjust the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [issues, setIssues] = useState([]); // State to hold the list of issues
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userDetails = useSelector((state) => state.user.userDetails); 

    
    const dispatch = useDispatch();  // Initialize dispatch to send actions
    
    // Fetch both tickets and issues
    useEffect(() => {
        const fetchTicketsAndIssues = async () => {
           // Access userDetails from Redux store
            const hostlerId = userDetails ? userDetails.hostler.hostlerid : null; // Adjusting to use 'userid' in lowercase

            if (!hostlerId) {
                setError('Hostler ID not found');
                setLoading(false);
                return;
            }

            try {
                // Fetch tickets for the hostler
                const ticketResponse = await fetch(`http://localhost:8160/ticket/api/Ticket/getTicket/${hostlerId}`);
                if (!ticketResponse.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                const ticketData = await ticketResponse.json();
                setTickets(ticketData);

                // Fetch issues for the dropdown
                const issueResponse = await fetch('http://localhost:8160/ticket/api/issue');
                if (!issueResponse.ok) {
                    throw new Error('Failed to fetch issues');
                }
                const issueData = await issueResponse.json();
                setIssues(issueData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketsAndIssues(); // Fetch tickets and issues together when the component mounts
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Your Tickets</h2>
            {tickets.length === 0 ? (
                <p className="text-center">You have no tickets raised yet.</p>
            ) : (
                <div className="list-group">    
                    {tickets.map(ticket => (
                        <div key={ticket.ticketId} className={`list-group-item mb-3 p-4 border rounded ${ticket.status ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                            <h5>Issue: 
                                <span className="text-uppercase">
                                    {issues.find(issue => issue.issueId === ticket.issueId)?.issueName || 'Unknown Issue'}
                                </span>
                            </h5>
                            <p><strong>Description:</strong> {ticket.description}</p>
                            <p><strong>Status:</strong> {ticket.status ? 'Resolved' : 'Pending'}</p>
                            <p><strong>Raised At:</strong> {new Date(ticket.raisedAt).toLocaleDateString('en-US')}</p>
{ticket.resolvedAt && (
  <p><strong>Resolved At:</strong> {new Date(ticket.resolvedAt).toLocaleDateString('en-US')}</p>
)}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketList;
