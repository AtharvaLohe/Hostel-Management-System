package com.project.hostelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AddressUpdate {
    private int addressid;
    private String area;
    private String city;
    private String state;
    private int pinCode;

}
