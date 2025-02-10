package com.project.hostelmanagement.entities;
import lombok.Data;


@Data
public class RegistrationRequest {
    private String email; 
    private String dateOfBirth; 
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String area;
    private String city;
    private Integer pinCode;
    private String state;
}