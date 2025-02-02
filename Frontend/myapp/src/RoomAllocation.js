
import React, { useState, useEffect } from 'react';

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
      const response = await fetch('http://localhost:8080/admin/unassign');
      if (!response.ok) throw new Error('Error fetching unallocated hostlers');
      const data = await response.json();
      setUnallocatedHostlers(data);
    } catch (error) {
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
      setError('Error fetching available rooms');
    }
  };

  const handleAllocateClick = (hostler) => {
    setSelectedHostler(hostler);
    setIsFormOpen(true); // Open the form when a hostler is selected
  };

  const handleRoomChange = (event) => {
    const roomid = event.target.value;
    setSelectedRoom(roomid);
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
      const response = await fetch('http://localhost:8080/admin/allocate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Left Section - Unallocated Hostlers */}
      <div style={{
        flex: 1, padding: '20px', borderRight: '1px solid #ddd', backgroundColor: '#fff',
        overflowY: 'auto', maxHeight: '500px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px'
      }}>
        {allocationResponse && (
          <div style={{
            marginBottom: '20px', color: '#28a745', fontWeight: 'bold', textAlign: 'center'
          }}>
            <strong>Allocation Response:</strong> {allocationResponse}
          </div>
        )}
        <ul style={{
          listStyle: 'none', padding: 0, margin: 0
        }}>
          {unallocatedHostlers.map((hostler) => (
            <li key={hostler.hostlerid} style={{
              marginBottom: '10px', padding: '10px', border: '1px solid #eee',
              borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer', transition: 'box-shadow 0.3s ease'
            }}>
              <div>
                <strong>{hostler.firstname}</strong>
                <p>{hostler.details}</p>
                <button
                  onClick={() => handleAllocateClick(hostler)}
                  style={{
                    padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none',
                    borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Allocate
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Allocation Form (Only when isFormOpen is true) */}
      {isFormOpen && (
        <div style={{
          flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto', maxHeight: '500px'
        }}>
          <h2 style={{ textAlign: 'center', color: '#343a40' }}>Allocation Form</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <form style={{ maxWidth: '400px', margin: '0 auto' }}>
            {selectedHostler && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold' }}>Hostler:</label>
                <div style={{
                  padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f1f1f1'
                }}>
                  <strong>{selectedHostler.firstname}</strong> - {selectedHostler.details}
                </div>
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }}>Room Number:</label>
              <select
                value={selectedRoom || ''}
                onChange={handleRoomChange}
                style={{
                  width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'
                }}
              >
                <option value="">Select Room</option>

                {rooms.filter(room => !room.isFull).map((room) => (
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
                padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none',
                borderRadius: '4px', cursor: 'pointer', width: '100%', transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              Submit Allocation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;
