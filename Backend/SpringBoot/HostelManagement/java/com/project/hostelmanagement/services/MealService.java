package com.project.hostelmanagement.services;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.project.hostelmanagement.entities.DummyMeal;
import com.project.hostelmanagement.entities.Food;
import com.project.hostelmanagement.entities.Meal;
import com.project.hostelmanagement.entities.Meal.MealStatus;
import com.project.hostelmanagement.repositories.FoodRepository;
import com.project.hostelmanagement.repositories.MealRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;

    private final FoodRepository foodRepository;
    
    public Meal addMeal(DummyMeal meal) {
    	Optional<Food> food = foodRepository.findById(meal.getFoodId());
        try {
    	if(food==null) {
        	throw new Exception("Food Not Found");
        }}catch(Exception e) {
        	System.out.println(e.getMessage());
        }
        Meal newMeal = new Meal();
        newMeal.setDate(meal.getDate());
        newMeal.setDescription(meal.getDescription());
        newMeal.setFood(food.get());
        newMeal.setStatus(MealStatus.valueOf(meal.getStatus()));
        
        return mealRepository.save(newMeal);
    }

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public void deleteMeal(int id) {
        mealRepository.deleteById(id);
    }
    
    public List<Meal> getTodaysMeals() {
        Date today = Date.valueOf(LocalDate.now()); // Get today's date
        return mealRepository.findTodaysMeals(today);
    }

    
}
