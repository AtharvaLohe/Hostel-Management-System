package com.project.hostelmanagement.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "food")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Food_ID")
    private int foodId;

    @Column(name = "FName", nullable = false)
    private String name;

    @Column(name = "Description")
    private String description;
}


//{
//    "name": "Pizza",
//    "description": "Cheese and pepperoni pizza"
//}
