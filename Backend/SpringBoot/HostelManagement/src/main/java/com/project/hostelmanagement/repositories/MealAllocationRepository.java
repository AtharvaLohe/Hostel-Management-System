package com.project.hostelmanagement.repositories;


import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.MealAllocation;


@Repository
public interface MealAllocationRepository extends JpaRepository<MealAllocation, Integer> {
	 
	@Query("SELECT m FROM MealAllocation m WHERE m.hostler.hostlerid = ?1 AND m.Date = ?2")
	List<MealAllocation> findByHostlerIdAndDate(int hostlerId, Date date);

	
	 @Query("SELECT m.status, COUNT(m) FROM MealAllocation m WHERE m.Date = CURRENT_DATE GROUP BY m.status")
	    List<Object[]> countMealsForToday();
}