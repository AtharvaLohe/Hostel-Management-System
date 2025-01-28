package com.project.hostelmanagement.services;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.project.hostelmanagement.entities.Meal;
import com.project.hostelmanagement.repositories.MealRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;

    public Meal addMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public void deleteMeal(int id) {
        mealRepository.deleteById(id);
    }
}
