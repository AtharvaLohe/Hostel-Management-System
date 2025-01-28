package com.project.hostelmanagement.services;



import com.project.hostelmanagement.entities.Food;
import com.project.hostelmanagement.repositories.FoodRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public List<Food> getAllFoodItems() {
        return foodRepository.findAll();
    }

    public Food addFoodItem(Food food) {
        return foodRepository.save(food);
    }

    public void deleteFoodItem(int id) {
        foodRepository.deleteById(id);
    }
}

