import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const AllocatedHostlers = () => {
  const [hostlers, setHostlers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedHostler, setSelectedHostler] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [hostlerToDelete, setHostlerToDelete] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Feedback message state

  useEffect(() => {
    fetchHostlers();
    fetchAvailableRooms();
  }, []);

  const fetchHostlers = async () => {
    try {
      const response = await fetch("http://localhost:8080/rooms/hostlers");
      const data = await response.json();
      setHostlers(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching hostlers.");
      setLoading(false);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch("http://localhost:8080/rooms/available");
      const data = await response.json();
      setAvailableRooms(data);
    } catch (error) {
      setError("Error fetching available rooms.");
    }
  };

  const handleDelete = (hostlerId, roomId) => {
    setHostlerToDelete({ hostlerId, roomId });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const { hostlerId, roomId } = hostlerToDelete;
    const response = await fetch(
      `http://localhost:8080/rooms/unallocate/${hostlerId}/${roomId}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      setDeleteModalOpen(false);
      fetchHostlers(); 
      setFeedbackMessage('Room unallocated successfully!');
    } else {
      setError("Error deleting hostler's room.");
      setFeedbackMessage('Error deleting room allocation.');
    }

    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleUpdate = (hostler) => {
    setSelectedHostler(hostler);
    setUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    const { hostlerid } = selectedHostler;
    const response = await fetch(
      `http://localhost:8080/rooms/update/${hostlerid}/${selectedHostler.roomAllocations[0].room.roomId}/${selectedRoom}`,
      { method: "PUT" }
    );
    if (response.ok) {
      setUpdateModalOpen(false);
      fetchHostlers();
      setFeedbackMessage('Room updated successfully!');
    } else {
      setError("Error updating room.");
      setFeedbackMessage('Error updating room.');
    }

    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  return (
    <div>
       {/* Feedback Message */}
       {feedbackMessage && (
        <div style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px', marginBottom: '10px' }}>
          {feedbackMessage}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostlers.map((hostler) => (
              <tr key={hostler.hostlerid}>
                <td className="px-4 py-2">{`${hostler.firstname} ${hostler.lastname}`}</td>
                <td className="px-4 py-2">{hostler.email}</td>
                <td className="px-4 py-2">
                  {hostler.roomAllocations.length > 0
                    ? hostler.roomAllocations[0].room.roomno
                    : "No Room"}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleUpdate(hostler)}>Update Room</button>
                  <button onClick={() => handleDelete(hostler.hostlerid, hostler.roomAllocations[0]?.room.roomId)}>Unallocate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)} contentLabel="Confirm Deletion" style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "350px",
      height: "auto",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }}>
        <h2>Are you sure you want to unallocate this room?</h2>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={() => setDeleteModalOpen(false)}>No</button>
      </Modal>

      {/* Update Room Modal */}
      <Modal isOpen={updateModalOpen} onRequestClose={() => setUpdateModalOpen(false)} contentLabel="Update Room"  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "400px",
      height: "auto",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }}>
        <h2>Update Room for {selectedHostler?.firstname} {selectedHostler?.lastname}</h2>
        <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
          <option value="">Select New Room</option>
          {availableRooms.map((room) => (
            <option key={room.roomId} value={room.roomId}>
              {room.roomno} ({room.roomtype}, {room.capacity} Capacity, ${room.price} Price)
            </option>
          ))}
        </select>
        <button onClick={confirmUpdate}>Update</button>
        <button onClick={() => setUpdateModalOpen(false)}>Cancel</button>
      </Modal>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AllocatedHostlers;
