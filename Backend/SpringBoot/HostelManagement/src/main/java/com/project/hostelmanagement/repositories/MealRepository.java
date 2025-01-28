package com.project.hostelmanagement.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hostelmanagement.entities.Meal;

public interface MealRepository extends JpaRepository<Meal, Integer> {
}