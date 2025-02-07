import React, { useState, useEffect } from 'react';

const RoomStatusBoard = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ roomno: '', roomtype: 'Single', capacity: '', price: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:8080/rooms/getAllRooms');
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleOpenForm = (room = null) => {
    if (room) {
      setFormData(room);
      setEditMode(true);
      setCurrentRoomId(room.roomId);
    } else {
      setFormData({ roomno: '', roomtype: 'Single', capacity: '', price: '' });
      setEditMode(false);
      setCurrentRoomId(null);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditMode(false);
    setCurrentRoomId(null);
  };

  const handleSubmit = async () => {
    const url = editMode
      ? `http://localhost:8080/rooms/updateRoom/${currentRoomId}`
      : 'http://localhost:8080/rooms/addRoom';

    const method = editMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(editMode ? 'Failed to update room' : 'Failed to add room');

      await fetchRooms();
      showMessage(editMode ? 'Room updated successfully' : 'Room added successfully');
      handleCloseForm();
    } catch (error) {
      console.error('Error saving room:', error);
      showMessage(editMode ? 'Failed to update room' : 'Failed to add room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    
    try {
      const response = await fetch(`http://localhost:8080/rooms/deleteRoom/${roomId}`, { method: 'DELETE' });
      const message = await response.text();

      if (!response.ok) throw new Error(message || 'Failed to delete room');

      await fetchRooms();
      showMessage(message);
    } catch (error) {
      console.error('Error deleting room:', error);
      showMessage(error.message);
    }
  };

  return (
    <div className="mt-4">
      

      {message && <div className="alert alert-success">{message}</div>}

      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary mx-2" onClick={() => handleOpenForm()}>Add Room</button>
      </div>

        <ul className="list-group">
        {rooms.map((room) => (
          <li key={room.roomId} className="list-group-item d-flex justify-content-between align-items-center" style={{
            backgroundColor: "transparent", 
            border: "none", 
            color: "inherit"
          }}>
            {room.roomno} - {room.roomtype} - Assigned: {room.roomAllocations?.length || 0} - ₹{room.price}

            <div>
              <button className="btn-sm mx-2" onClick={() => handleOpenForm(room)}>Edit</button>
              <button className="  btn-sm" onClick={() => handleDeleteRoom(room.roomId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Overlay Form */}
      {showForm && (
        <div className="overlay">
          <div className="overlay-content">
            <h4>{editMode ? 'Edit Room' : 'Add Room'}</h4>
            <input
              type="text"
              placeholder="Room No"
              required
              value={formData.roomno}
              onChange={(e) => setFormData({ ...formData, roomno: e.target.value })}
            />
            <select
              value={formData.roomtype}
              onChange={(e) => setFormData({ ...formData, roomtype: e.target.value })}
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
              <option value="quad">Quad</option>
            </select>
            <input
              type="number"
              placeholder="Capacity"
              required
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <button className="btn btn-success mt-2" onClick={handleSubmit}>
              {editMode ? 'Update Room' : 'Add Room'}
            </button>
            <button className="btn btn-secondary mt-2" onClick={handleCloseForm}>Close</button>
          </div>
        </div>
      )}

      {/* Overlay Styles */}
      <style>
        {`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .overlay-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 300px;
            text-align: center;
            position: relative;
          }
          .overlay-content input,
          .overlay-content select {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
          }
          .overlay-content button {
            width: 100%;
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default RoomStatusBoard;
