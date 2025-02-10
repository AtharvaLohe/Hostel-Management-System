package com.project.hostelmanagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.RoomAllocation;

@Repository
public interface RoomAllocationRepository extends JpaRepository<RoomAllocation, Integer> {
	  @Query("SELECT SUM(ra.room.price) FROM RoomAllocation ra")
	   Double getTotalRevenue();

	   @Query("SELECT SUM(ra.room.price) FROM RoomAllocation ra WHERE FUNCTION('YEAR', ra.allocationdate) = :year AND FUNCTION('MONTH', ra.allocationdate) = :month")
	   Double getMonthlyRevenue(@Param("year") int year, @Param("month") int month);
	   
	   
	   boolean existsByRoom_RoomId(Integer roomId);
}