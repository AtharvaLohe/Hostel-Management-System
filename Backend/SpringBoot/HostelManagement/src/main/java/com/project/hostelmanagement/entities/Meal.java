package com.project.hostelmanagement.entities;

import java.sql.Date;

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
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private MealStatus status;

    @ManyToOne
    @JoinColumn(name = "Food_ID", nullable = false)
    private Food food;

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
