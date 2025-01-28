package com.project.hostelmanagement.entities;

import org.springframework.stereotype.Service;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Address_ID")
    private Integer addressid;

    @Column(name = "area", nullable = false)
    private String area;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "PinCode",nullable = false)
    private Integer pinCode;

    @Column(name = "state" ,nullable = false)
    private String state;

   
}