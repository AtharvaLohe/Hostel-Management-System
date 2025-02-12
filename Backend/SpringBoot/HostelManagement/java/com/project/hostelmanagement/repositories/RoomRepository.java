package com.project.hostelmanagement.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.Room;
import com.project.hostelmanagement.entities.RoomStatus;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

	List<Room> findByStatus(RoomStatus status);
	
	@Query("SELECT COUNT(r) FROM Room r")
    Long getTotalRooms();

    @Query("SELECT COUNT(r) FROM Room r WHERE r.status = 'AVAILABLE'")
    Long getAvailableRooms();
    
    Optional<Room> findByRoomno(Integer roomno);
}