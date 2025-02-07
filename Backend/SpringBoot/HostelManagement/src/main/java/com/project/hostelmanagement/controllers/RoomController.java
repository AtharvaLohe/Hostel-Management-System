package com.project.hostelmanagement.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.Room;
import com.project.hostelmanagement.repositories.RoomRepository;
import com.project.hostelmanagement.services.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {
	
	@Autowired
	RoomService rs;
	
	@Autowired
	RoomRepository roomrepository;
	
	@GetMapping("/available")
	public List<Room> getAvailableRoom(){
		return rs.getAvailableRooms();
	}
	
	
	
	 @GetMapping("/hostlers")
	    public ResponseEntity<List<Hostler>> getAllAllocatedHostlers() {
	        // Call service to get all allocated hostlers
	        List<Hostler> allocatedHostlers = rs.getAllAllocatedHostlers();

	        if (allocatedHostlers.isEmpty()) {
	            return ResponseEntity.noContent().build(); // Return 204 No Content if no allocated hostlers found
	        }

	        return ResponseEntity.ok(allocatedHostlers); // Return list of allocated hostlers
	    }
	 
	 
	 @GetMapping("/getAllRooms")
		public List<Room> getAllRoom(){
			return rs.getAllRoom();
		}
	 
	 @DeleteMapping("/unallocate/{hid}/{rid}")
	    public ResponseEntity<String> unallocateRoom(@PathVariable int hid, @PathVariable int rid) {
	        String response = rs.unallocateRoom(hid, rid);
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 @PutMapping("/update/{hid}/{oldRid}/{newRid}")
	    public ResponseEntity<String> updateHostlerRoom(@PathVariable int hid, @PathVariable int oldRid, @PathVariable int newRid) {
	        // Call the service method to update the hostler's room
	        String response = rs.updateHostlerRoom(hid, oldRid, newRid);
	        
	        // Return the response in the ResponseEntity
	        return ResponseEntity.ok(response);
	    }
	 
	 @PostMapping("/addRoom")
	    public Room addRoom(@RequestBody Room room) {
		  Optional<Room> existingRoom = roomrepository.findByRoomno(room.getRoomno());
	        if (existingRoom.isPresent()) {
	            throw new RuntimeException("Room with room number " + room.getRoomno() + " already exists");
	        }
		 
		 	try {
	            return rs.addRoom(room);  // Return the room object if added successfully
	        } catch (Exception e) {
	            throw new RuntimeException("Error while adding room: " + e.getMessage());  // Handle error
	        }
	    }

	    // Update existing room
	    @PutMapping("/updateRoom/{roomId}")
	    public Room updateRoom(@PathVariable Integer roomId, @RequestBody Room roomDetails) {
	        try {
	            return rs.updateRoom(roomId, roomDetails);  // Return the updated room object
	        } catch (Exception e) {
	            throw new RuntimeException("Error while updating room: " + e.getMessage());  // Handle error
	        }
	    }

	    // Delete room
	    @DeleteMapping("/deleteRoom/{roomId}")
	    public String deleteRoom(@PathVariable Integer roomId) {
	        try {
	            return rs.deleteRoom(roomId);  // Return success message
	        } catch (Exception e) {
	            throw new RuntimeException("Error while deleting room: " + e.getMessage());  // Handle error
	        }
	    }
	
	 
	 
}
