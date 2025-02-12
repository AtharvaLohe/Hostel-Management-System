package com.project.hostelmanagement.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.Meal;
import com.project.hostelmanagement.entities.MealAllocation;
import com.project.hostelmanagement.repositories.HostelerRepository;
import com.project.hostelmanagement.repositories.MealAllocationRepository;
import com.project.hostelmanagement.repositories.MealRepository;

@Service
public class MealAllocationService {
	
	@Autowired
	MealAllocationRepository AllocRepos;
	
	
	@Autowired
	MealRepository Mrepository;

	@Autowired
	HostelerRepository hostrepository;
	public MealAllocation allocateMeal(int hostlerId, String mealType) {
        
        Hostler hostler = hostrepository.findById(hostlerId)
            .orElseThrow(() -> new RuntimeException("Hostler not found"));

        // Create a new meal allocation entry
        MealAllocation allocation = new MealAllocation();
        allocation.setHostler(hostler);
        allocation.setStatus(mealType);  // Store mealType as status
        allocation.setDate(new java.sql.Date(System.currentTimeMillis())); // Set today's date

        return AllocRepos.save(allocation);
    }
	
	
	 @GetMapping("/admin/getMealSelection/{hostlerId}")
	    public List<String> getMealSelection(@PathVariable int hostlerId) {
	        
	        Date today = new Date(System.currentTimeMillis());
	        List<MealAllocation> allocations = AllocRepos.findByHostlerIdAndDate(hostlerId, today);
	        
	        if (allocations.isEmpty()) {
	            return new ArrayList<>(); // Return empty list if no meals selected
	        }

	        Set<String> uniqueStatuses = new HashSet<>();
	        
	        for (MealAllocation allocation : allocations) {
	            uniqueStatuses.add(allocation.getStatus()); // Add meal type to Set (avoids duplicates)
	        }

	        return new ArrayList<>(uniqueStatuses); // Convert Set to List and return
	    }
	
	// used hashmap because it is easy to read compare to the List<Object[]> at frontend
	public Map<String, Long> getTodayMealCounts() {
	    // Fetch meal counts by status (Breakfast, Lunch, Dinner)
	    List<Object[]> result = AllocRepos.countMealsForToday();

	    // Create a HashMap to store the results
	    Map<String, Long> mealCounts = new HashMap<>();

	    // Loop through the result and populate the HashMap
	    for (Object[] row : result) {
	        String status = (String) row[0]; // meal type (Breakfast, Lunch, Dinner)
	        Long count = (Long) row[1]; // number of selected meals
	        mealCounts.put(status, count); // Add to HashMap
	    }

	    // Return the HashMap containing meal counts
	    return mealCounts;
	}
	
	
	 
}
