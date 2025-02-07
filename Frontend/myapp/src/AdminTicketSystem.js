import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AdminTicketSystem = () => {
    const [tickets, setTickets] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [ticketToResolve, setTicketToResolve] = useState(null);
    const [resolutionDescription, setResolutionDescription] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [ticketDetail, setTicketDetail] = useState('');
 
    const issueTypes = {
        1: 'Room Issue',
        2: 'Meal Issue',
        3: 'Maintenance',
        4: 'Internet Connectivity',
        5: 'Noise Complaint',
        6: 'Cleaning Issue',
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('https://localhost:7182/api/Ticket/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const handleResolve = async () => {
        if (!ticketToResolve) return;

        try {
            const response = await fetch(`https://localhost:7182/api/Ticket/${ticketToResolve}/resolve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resolutionDescription),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setTickets(tickets.map(ticket => 
                ticket.ticketId === ticketToResolve ? { ...ticket, status: true, resolvedAt: new Date().toISOString() } : ticket
            ));
            setConfirmationMessage('Ticket resolved successfully!');
            setShowResolveModal(false);
        } catch (error) {
            console.error('Error resolving ticket:', error);
            setConfirmationMessage('There was an error resolving the ticket. Please try again.');
        }
    };

    const handleShowResolveModal = (ticketId) => {
        setTicketToResolve(ticketId);
        setShowResolveModal(true);
    };

    const handleShowDetailModal = (description) => {
        setTicketDetail(description);
        setShowDetailModal(true);
    };

    return (
        <div className="container mt-5">
            {confirmationMessage && <p className="text-success text-center">{confirmationMessage}</p>}
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered shadow-lg rounded-lg">
                    <thead className="table-dark">
                        <tr>
                            <th>Hostler Name</th>
                            <th>Room Number</th>
                            <th>Issue Type</th>
                            <th>Status</th>
                            <th>Raised At</th>
                            <th>Resolved At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => {
                            const hostler = ticket.hostler || {};
                            const hostlerName = `${hostler.firstname || ""} ${hostler.lastname || ""}`.trim();
                            const roomNo = (hostler.roomallocations && hostler.roomallocations.length > 0)
                                ? hostler.roomallocations[0].room.roomNo
                                : "Not Assigned";

                            return (
                                <tr key={ticket.ticketId}>
                                    <td>{hostlerName || "N/A"}</td>
                                    <td>{roomNo}</td>
                                    <td>{issueTypes[ticket.issueId]}</td>
                                    <td>{ticket.status ? 'Resolved' : 'Pending'}</td>
                                    <td>{ticket.raisedAt ? new Date(ticket.raisedAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>{ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button
                                            variant="info" 
                                            className="me-2"
                                            onClick={() => handleShowDetailModal(ticket.description)}
                                        >
                                            Detail
                                        </button>
                                        <button 
                                            variant="success" 
                                            onClick={() => handleShowResolveModal(ticket.ticketId)}
                                            disabled={ticket.status} // Disable the button if the ticket is resolved
                                        >
                                            Resolve
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Resolve Confirmation Modal */}
            <Modal show={showResolveModal} onHide={() => setShowResolveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Resolve Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter resolution description:</p>
                    <textarea
                        value={resolutionDescription}
                        onChange={(e) => setResolutionDescription(e.target.value)}
                        className="form-control"
                        rows="3"
                        placeholder="Describe the resolution..."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowResolveModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={handleResolve}>Resolve</Button>
                </Modal.Footer>
            </Modal>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{ticketDetail}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminTicketSystem;
