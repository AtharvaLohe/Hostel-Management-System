package com.project.hostelmanagement.repositories;


import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.hostelmanagement.entities.Meal;

public interface MealRepository extends JpaRepository<Meal, Integer> {
	@Query("SELECT m FROM Meal m WHERE m.date = :today")
    List<Meal> findTodaysMeals(Date today);
}