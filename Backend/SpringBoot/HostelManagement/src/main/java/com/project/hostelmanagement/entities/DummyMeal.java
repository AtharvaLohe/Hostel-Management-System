package com.project.hostelmanagement.entities;


import lombok.Data;
import java.sql.Date;

@Data
public class DummyMeal {
    private Date date;
    private String status;  // Expecting "B", "L", "D" from React
    private int foodId;
    private String description;
}

