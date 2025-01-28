package com.project.hostelmanagement.controllers;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.project.hostelmanagement.entities.Food;
import com.project.hostelmanagement.services.FoodService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/food")
public class FoodController {

    private final FoodService foodService;

    @GetMapping("/menu")
    public List<Food> getFoodMenu() {
        return foodService.getAllFoodItems();
    }

    @PostMapping("/add")
    public Food addFoodItem(@RequestBody Food food) {
        return foodService.addFoodItem(food);
    }

    @DeleteMapping("/{id}")
    public void deleteFoodItem(@PathVariable int id) {
        foodService.deleteFoodItem(id);
    }
}
