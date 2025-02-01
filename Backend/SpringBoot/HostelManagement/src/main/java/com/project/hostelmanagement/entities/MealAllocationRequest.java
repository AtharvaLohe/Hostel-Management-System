package com.project.hostelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MealAllocationRequest {
    private int hostlerId;   // ID of the hostler
    private String mealType; // Meal type like "BREAKFAST", "LUNCH", "DINNER"
}