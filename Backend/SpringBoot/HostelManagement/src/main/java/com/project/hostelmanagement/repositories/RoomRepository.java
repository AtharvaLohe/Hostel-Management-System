package com.project.hostelmanagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.Room;
import com.project.hostelmanagement.entities.RoomStatus;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

	List<Room> findByStatus(RoomStatus status);
}