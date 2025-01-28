package com.project.hostelmanagement.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "mealplan")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MP_ID")
    private int mpId;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "Date", nullable = false)
    private java.sql.Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private MealStatus status;

    @Column(name = "Food_ID")
    private int foodId;

    public enum MealStatus {
        B, // Breakfast
        L, // Lunch
        D  // Dinner
    }
}



//{
//    "hostlerId": 1,
//    "date": "2025-01-04",  
//    "status": "OPT_OUT"  
//}
