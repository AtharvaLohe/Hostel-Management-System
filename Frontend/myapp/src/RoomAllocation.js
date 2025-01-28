
import React, { useState, useEffect } from 'react';

const RoomAllocation = () => {
  const [unallocatedHostlers, setUnallocatedHostlers] = useState([]);
  const [rooms, setRooms] = useState([]); // Initialize rooms state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedHostler, setSelectedHostler] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocationResponse, setAllocationResponse] = useState(null); // New state for allocation response

  // Fetch unallocated hostlers and available rooms from the server
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUnallocatedHostlers(), fetchAvailableRooms()]);
      setLoading(false); // Set loading to false after fetching both
    };

    fetchData();
  }, []);

  const fetchUnallocatedHostlers = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/unassign');
      if (!response.ok) throw new Error('Error fetching unallocated hostlers');
      const data = await response.json();
      console.log('Unallocated Hostlers:', data); // Debugging
      setUnallocatedHostlers(data);
    } catch (error) {
      console.error('Error fetching unallocated hostlers:', error.message);
      setError('Error fetching unallocated hostlers');
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/rooms');
      if (!response.ok) throw new Error('Error fetching available rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching available rooms:', error.message);
      setError('Error fetching available rooms');
    }
  };

  const handleAllocateClick = (hostler) => {
    setSelectedHostler(hostler);
    setIsFormOpen(true);
  };

  const handleRoomChange = (event) => {
    const roomid = event.target.value;
    console.log('Selected Room ID:', roomid); // Debugging
    setSelectedRoom(roomid);
  };

  const handleSubmit = async () => {
    if (!selectedHostler || !selectedRoom) {
      setError('Please select both a hostler and a room.');
      return;
    }

    const allocationRequest = {
      hostlerid: selectedHostler.hostlerid, // Ensure this is a number
      roomid: parseInt(selectedRoom, 10),   // Ensure this is an integer
    };

    console.log('Sending allocation request:', allocationRequest); // Debugging

    try {
      const response = await fetch('http://localhost:8080/admin/allocate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allocationRequest),
      });

      console.log('Response status:', response.status); // Debugging

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text(); // Parse as text
      console.log('Raw Response Data:', responseData); // Debugging

      if (!responseData) {
        setError('No response received from the server.');
      } else {
        // Store the response in the state
        setAllocationResponse(`${responseData}`);

        // Update the unallocatedHostlers state by removing the allocated hostler
        setUnallocatedHostlers((prevHostlers) =>
          prevHostlers.filter((hostler) => hostler.hostlerid !== selectedHostler.hostlerid)
        );

        // Fetch the updated list of rooms
        await fetchAvailableRooms();

        setError(null);
        setIsFormOpen(false); // Hide the form after submission
        setSelectedHostler(null);
        setSelectedRoom(null);

        // Clear the allocation response after 5 seconds
        setTimeout(() => {
          setAllocationResponse(null);
        }, 5000); // Adjusted timeout to 5 seconds for better visibility
      }
    } catch (error) {
      
      console.error('Error:', error.message); // Debugging
      setError(error.message || 'Error allocating room. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Section - Unallocated Hostlers */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>Unallocated Hostlers</h2>
        {allocationResponse && (
          <div style={{ marginBottom: '20px', color: 'blue' }}>
            <strong>Allocation Response:</strong> {allocationResponse}
          </div>
        )}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {unallocatedHostlers.map((hostler) => (
            <li key={hostler.hostlerid} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee' }}>
              <div>
                <strong>{hostler.firstname}</strong>
                <p>{hostler.details}</p>
                <button
                  onClick={() => handleAllocateClick(hostler)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Allocate
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Allocation Form */}
      <div style={{ flex: 1, padding: '20px', display: isFormOpen ? 'block' : 'none' }}>
        <h2>Allocation Form</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form style={{ maxWidth: '400px' }}>
          {selectedHostler && (
            <div style={{ marginBottom: '15px' }}>
              <label>Hostler:</label>
              <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <strong>{selectedHostler.firstname}</strong> - {selectedHostler.details}
              </div>
            </div>
          )}
   

          <div style={{ marginBottom: '15px' }}>
            <label>Room Number:</label>
            <select
              value={selectedRoom || ''}
              onChange={handleRoomChange}
              style={{ width: '100%', padding: '8px' }}
            > 
              <option value="">Select Room</option>

              {rooms.filter(room => !room.isFull).map((room) => ( // Include rooms that are not full
                <option key={room.roomId} value={room.roomId}>

                  Room {room.roomno}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit Allocation
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomAllocation;