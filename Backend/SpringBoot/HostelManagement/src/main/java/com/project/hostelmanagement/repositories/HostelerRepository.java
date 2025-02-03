package com.project.hostelmanagement.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.Hostler;

@Repository
public interface HostelerRepository extends JpaRepository<Hostler, Integer> {
	
	boolean existsByEmail(String email);
	boolean existsByPhonenumber(String num);
	
	@Query("SELECT h FROM Hostler h where h.hostlerid NOT IN(SELECT ra.hostler.hostlerid FROM RoomAllocation ra)")
	List<Hostler> findUnAssignHostler();
	
	@Query("SELECT h FROM Hostler h WHERE SIZE(h.roomAllocations) > 0")
    List<Hostler> findHostlersWithRoomAllocations();
}
	