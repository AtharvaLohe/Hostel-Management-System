package com.project.hostelmanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
}
