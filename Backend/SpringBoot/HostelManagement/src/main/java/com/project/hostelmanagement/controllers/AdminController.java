package com.project.hostelmanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hostelmanagement.entities.AllocationRequest;
import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.Room;
import com.project.hostelmanagement.services.HostlerService;
import com.project.hostelmanagement.services.RoomService;

@RestController
@RequestMapping("auth/admin")
public class AdminController {

	@Autowired
	HostlerService hserv;
	
	@Autowired
	RoomService roomserv;
	
	@GetMapping("/unassign")
	public List<Hostler> getUnAssignH(){
		return hserv.getUnassignHostler();
	}
	
	@GetMapping("/rooms")
	public List<Room> getRooms(){
		return roomserv.getAvailableRooms();
	}
	
	
	@PostMapping("/allocate")
	public String Allocate(@RequestBody AllocationRequest req) {
		return roomserv.allocateRoom(req.getHostlerid(),req.getRoomid());
	}
	
}

