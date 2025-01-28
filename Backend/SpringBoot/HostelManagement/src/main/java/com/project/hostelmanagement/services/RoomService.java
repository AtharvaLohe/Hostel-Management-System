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
}


/*{
 "hostlerId": 16,
 "roomId": 2
  }*/