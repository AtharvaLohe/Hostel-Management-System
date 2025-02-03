package com.project.hostelmanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.Room;
import com.project.hostelmanagement.services.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {
	
	@Autowired
	RoomService rs;
	
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
}
