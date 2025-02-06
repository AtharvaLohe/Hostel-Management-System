package com.project.hostelmanagement.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.Room;
import com.project.hostelmanagement.entities.RoomAllocation;
import com.project.hostelmanagement.entities.RoomStatus;
import com.project.hostelmanagement.entities.User;
import com.project.hostelmanagement.repositories.HostelerRepository;
import com.project.hostelmanagement.repositories.RoomAllocationRepository;
import com.project.hostelmanagement.repositories.RoomRepository;

@Service
public class RoomService {
	
	@Autowired
	RoomRepository rs;
	
	@Autowired
	RoomAllocationRepository ra;
	
	@Autowired
	HostelerRepository hr;
	
	@Autowired
	EmailService email;
	
	@Transactional
	public List<Room> getAvailableRooms() {
        return rs.findByStatus(RoomStatus.AVAILABLE);
    }
	
	
	@Transactional
	public String allocateRoom(int hid,int rid) {
		Hostler hostler = hr.findById(hid)
	            .orElseThrow(() -> new RuntimeException("Hostler not found"));
	    Room room = rs.findById(rid)
	            .orElseThrow(() -> new RuntimeException("Room not found"));

	    
	    int currentOccupancy = room.getRoomAllocations().size();

	    
	    if (currentOccupancy >= room.getCapacity()) {
	        throw new RuntimeException("Room is already full.");
	    }

	    // Create a new RoomAllocation entity
	    RoomAllocation allocation = new RoomAllocation();
	    allocation.setHostler(hostler);
	    allocation.setRoom(room); // Set the room in the allocation
	    allocation.setAllocationdate(LocalDate.now()); // Set the allocation date

	    // Add the allocation to the room's allocations list
	    room.getRoomAllocations().add(allocation); // This updates the room's allocations
	    
	    
	    ra.save(allocation); // This will save the RoomAllocation

	   
	    int newOccupancy = currentOccupancy + 1; // Calculate new occupancy

	    if (newOccupancy >= room.getCapacity()) {
	        room.setStatus(RoomStatus.FULL); 
	    } else {
	        room.setStatus(RoomStatus.AVAILABLE); 
	    }
	    
	    rs.save(room); 
	    
	    User user = hostler.getUser();
	    
	    String mailoutput = email.sendRegistrationEmail(hostler.getEmail(),user.getUsername(),user.getPassword());
	    
	    
	    
	    return "Room Allocated To Hosteler"+" "+mailoutput;
	    
	}
	
	 public String unallocateRoom(int hid, int rid) {
	        // Fetch the Hostler and Room by ID
	        Hostler hostler = hr.findById(hid)
	                .orElseThrow(() -> new RuntimeException("Hostler not found"));
	        Room room = rs.findById(rid)
	                .orElseThrow(() -> new RuntimeException("Room not found"));

	        // Find and remove the RoomAllocation associated with this hostler and room
	        RoomAllocation allocation = room.getRoomAllocations().stream()
	                .filter(a -> a.getHostler().equals(hostler))
	                .findFirst()
	                .orElseThrow(() -> new RuntimeException("No allocation found"));

	        // Remove the allocation from both the Hostler and Room collections
	        hostler.getRoomAllocations().remove(allocation);
	        room.getRoomAllocations().remove(allocation);
	        ra.delete(allocation);
	        // Save the updated Hostler and Room entities
	        hr.save(hostler);
	        // Directly set room status to AVAILABLE, no need to check
	        room.setStatus(RoomStatus.AVAILABLE);
	        rs.save(room); // Update room status

	        return "Room successfully unallocated from hostler.";
	    }
	 
	 
	 @Transactional
	 public String updateHostlerRoom(int hid, int oldRid, int newRid) {
	     // Fetch hostler
	     Hostler hostler = hr.findById(hid)
	             .orElseThrow(() -> new RuntimeException("Hostler not found"));

	     // Fetch the new room
	     Room newRoom = rs.findById(newRid)
	             .orElseThrow(() -> new RuntimeException("New Room not found"));

	     // Fetch the old allocation (This avoids fetching the old room explicitly)
	     RoomAllocation oldAllocation = hostler.getRoomAllocations().stream()
	             .filter(a -> a.getRoom().getRoomId() == oldRid)
	             .findFirst()
	             .orElseThrow(() -> new RuntimeException("No allocation found for this hostler in the old room"));

	     // Get reference to the old room from the allocation
	     Room oldRoom = oldAllocation.getRoom();

	     // Remove the old allocation from hostler and old room
	     hostler.getRoomAllocations().remove(oldAllocation);
	     oldRoom.getRoomAllocations().remove(oldAllocation);
	     
	     // Delete the old allocation from the database
	     ra.delete(oldAllocation);

	     // Update the old room's status if space is now available
	    
	         oldRoom.setStatus(RoomStatus.AVAILABLE);
	     
	     
	     // Ensure the new room has space
	     if (newRoom.getRoomAllocations().size() >= newRoom.getCapacity()) {
	         throw new RuntimeException("New room is already full.");
	     }

	     // Create new allocation
	     RoomAllocation newAllocation = new RoomAllocation();
	     newAllocation.setHostler(hostler);
	     newAllocation.setRoom(newRoom);
	     newAllocation.setAllocationdate(LocalDate.now());

	     // Add new allocation to hostler and new room
	     hostler.getRoomAllocations().add(newAllocation);
	     newRoom.getRoomAllocations().add(newAllocation);

	     // Save the new allocation
	     ra.save(newAllocation);

	     //  Update new room status
	     newRoom.setStatus(newRoom.getRoomAllocations().size() >= newRoom.getCapacity() ? RoomStatus.FULL : RoomStatus.AVAILABLE);
	     
	     // Save the updated old and new room statuses
	     rs.save(oldRoom);
	     rs.save(newRoom);

	     return "Hostler room updated successfully.";
	 }

	
	
	  public List<Hostler> getAllAllocatedHostlers() {
	        return hr.findHostlersWithRoomAllocations();
	    }
	
	  public Room addRoom(Room room) throws Exception {
	        try {
	            // Set default status if not provided
	            
	                room.setStatus(RoomStatus.AVAILABLE);  // Default status
	                room.setRoomAllocations(null);

	            // Save the room to the repository and return the saved room
	            return rs.save(room);
	        } catch (Exception e) {
	            throw new Exception("Error while adding room: " + e.getMessage());  // Handle error
	        }
	    }

	    // Update existing room
	    public Room updateRoom(Integer roomId, Room roomDetails) throws Exception {
	        try {
	            // Check if the room exists
	            Optional<Room> roomOptional = rs.findById(roomId);
	            if (roomOptional.isPresent()) {
	                Room existingRoom = roomOptional.get();

	                // Update only the necessary fields
	                if (roomDetails.getRoomno() != null) {
	                    existingRoom.setRoomno(roomDetails.getRoomno());
	                }
	                if (roomDetails.getRoomtype() != null) {
	                    existingRoom.setRoomtype(roomDetails.getRoomtype());
	                }
	                if (roomDetails.getCapacity() != null) {
	                    existingRoom.setCapacity(roomDetails.getCapacity());
	                }
	                if (roomDetails.getPrice() != null) {
	                    existingRoom.setPrice(roomDetails.getPrice());
	                }
	                if (roomDetails.getStatus() == null) {
	                    existingRoom.setStatus(RoomStatus.AVAILABLE);  // Default status if not provided
	                }

	                // Save and return updated room
	                return rs.save(existingRoom);
	            } else {
	                throw new Exception("Room not found");  // Room not found
	            }
	        } catch (Exception e) {
	            throw new Exception("Error while updating room: " + e.getMessage());  // Handle error
	        }
	    }

	    // Delete room
	    public String deleteRoom(Integer roomId) throws Exception {
	        try {
	            if (rs.existsById(roomId)) {
	                rs.deleteById(roomId);
	                return "Room deleted successfully";  // Return success message
	            } else {
	                throw new Exception("Room not found");  // Room not found
	            }
	        } catch (Exception e) {
	            throw new Exception("Error while deleting room: " + e.getMessage());  // Handle error
	        }
	    }
	  
	
}


/*{
 "hostlerId": 16,
 "roomId": 2
  }*/