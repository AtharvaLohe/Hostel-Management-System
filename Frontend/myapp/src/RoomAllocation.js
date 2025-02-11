import React, { useState, useEffect } from 'react';
import './CSS/RoomAllocation.css';

const RoomAllocation = () => {
  const [unallocatedHostlers, setUnallocatedHostlers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedHostler, setSelectedHostler] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocationResponse, setAllocationResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUnallocatedHostlers(), fetchAvailableRooms()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchUnallocatedHostlers = async () => {
    try {
      const response = await fetch('http://localhost:8160/auth/admin/unassign');
      if (!response.ok) throw new Error('Error fetching unallocated hostlers');
      const data = await response.json();
      setUnallocatedHostlers(data);
    } catch (error) {
      setError('Error fetching unallocated hostlers');
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch('http://localhost:8160/auth/admin/rooms');
      if (!response.ok) throw new Error('Error fetching available rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      setError('Error fetching available rooms');
    }
  };

  const handleAllocateClick = (hostler) => {
    setSelectedHostler(hostler);
    setIsFormOpen(true);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedHostler || !selectedRoom) {
      setError('Please select both a hostler and a room.');
      return;
    }

    const allocationRequest = {
      hostlerid: selectedHostler.hostlerid,
      roomid: parseInt(selectedRoom, 10),
    };

    try {
      const response = await fetch('http://localhost:8160/auth/admin/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allocationRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();
      if (!responseData) {
        setError('No response received from the server.');
      } else {
        setAllocationResponse(`${responseData}`);
        setUnallocatedHostlers((prevHostlers) =>
          prevHostlers.filter((hostler) => hostler.hostlerid !== selectedHostler.hostlerid)
        );
        await fetchAvailableRooms();
        setError(null);
        setIsFormOpen(false);
        setSelectedHostler(null);
        setSelectedRoom(null);

        setTimeout(() => {
          setAllocationResponse(null);
        }, 5000);
      }
    } catch (error) {
      setError(error.message || 'Error allocating room. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="room-allocation-container">
      <div className="hostler-box">
        <h2>Unallocated Hostlers</h2>
        {allocationResponse && <div className="success-message">{allocationResponse}</div>}
        <ul className="hostler-ul">
          {unallocatedHostlers.map((hostler) => (
            <li key={hostler.hostlerid} className="hostler-item">
              <div className="hostler-info">
                <strong>{hostler.firstname} {hostler.lastname}</strong>
                <p>Email: {hostler.email}</p>
                <p>Address: {hostler.address.area}, {hostler.address.city}</p>
                <button className="allocate-button" onClick={() => handleAllocateClick(hostler)}>Allocate</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isFormOpen && (
        <div className="allocation-form">
          <h2>Allocation Form</h2>
          {selectedHostler && (
            <div className="selected-hostler">
              <label>Hostler:</label>
              <div>
                <strong>{selectedHostler.firstname} {selectedHostler.lastname}</strong> - {selectedHostler.email} - {selectedHostler.address.area}, {selectedHostler.address.city}
              </div>
            </div>
          )}

          <div className="room-selection">
            <label>Room Number:</label>
            <select value={selectedRoom || ''} onChange={handleRoomChange}>
              <option value="">Select Room</option>
              {rooms.filter(room => !room.isFull).map((room) => (
                <option key={room.roomId} value={room.roomId}>Room {room.roomno}</option>
              ))}
            </select>
          </div>

          <button className="submit-button" type="button" onClick={handleSubmit}>Submit Allocation</button>
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;