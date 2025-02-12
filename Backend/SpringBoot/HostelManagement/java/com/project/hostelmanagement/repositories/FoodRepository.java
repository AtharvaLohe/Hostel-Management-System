package com.project.hostelmanagement.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
}
