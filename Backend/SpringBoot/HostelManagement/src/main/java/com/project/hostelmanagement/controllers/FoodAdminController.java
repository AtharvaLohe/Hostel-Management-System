package com.project.hostelmanagement.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.project.hostelmanagement.entities.Meal;
import com.project.hostelmanagement.services.MealService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class FoodAdminController {

    private final MealService mealService;

    @PostMapping("/meals")
    public Meal addMeal(@RequestBody Meal meal) {
        return mealService.addMeal(meal);
    }

    @GetMapping("/meals")
    public List<Meal> getAllMeals() {
        return mealService.getAllMeals();
    }

    @DeleteMapping("/meals/{id}")
    public void deleteMeal(@PathVariable int id) {
        mealService.deleteMeal(id);
    }
}
