package com.project.hostelmanagement.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name="mealallocation")
public class MealAllocation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer MA_ID;
	
	@Column(nullable = false)
    private Date Date;
	
	@Column(nullable = false)
	private String status;
	
	@ManyToOne
	@JoinColumn(name = "h_ID",nullable = false)
	private Hostler hostler;
	
	
}
