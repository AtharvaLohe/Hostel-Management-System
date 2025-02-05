package com.project.hostelmanagement.controllers;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.hostelmanagement.entities.DummyMeal;
import com.project.hostelmanagement.entities.Meal;
import com.project.hostelmanagement.entities.MealAllocation;
import com.project.hostelmanagement.entities.MealAllocationRequest;
import com.project.hostelmanagement.services.MealAllocationService;
import com.project.hostelmanagement.services.MealService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class FoodAdminController {

	@Autowired
    private final MealService mealService;

	@Autowired
	private MealAllocationService mealAllocserv;
	
	
    @PostMapping("/meals")
    public Meal addMeal(@RequestBody DummyMeal meal) {
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
    
    @GetMapping("/today")
    public List<Meal> getTodaysMeals() {
        return mealService.getTodaysMeals();
    }
    
    @PostMapping("/MealAllocation")
    public MealAllocation allocateMeal(@RequestBody MealAllocationRequest request) {
        return mealAllocserv.allocateMeal(request.getHostlerId(),request.getMealType());
    }
    
    @GetMapping("/getSelectedMeal/{hostlerId}")
    public List<String> getSelectedMeal(@PathVariable int hostlerId) {
        return mealAllocserv.getMealSelection(hostlerId);
    }
    
    @GetMapping("/countToday")
    public ResponseEntity<Map<String, Long>> getTodayMealCounts() {
        // Get the meal counts for today from the service
        Map<String, Long> mealCounts = mealAllocserv.getTodayMealCounts();

        // Return the result as a response
        return ResponseEntity.ok(mealCounts);
    }
    
   
}
