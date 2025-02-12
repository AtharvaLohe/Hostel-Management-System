package com.project.hostelmanagement.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "hostler")
public class Hostler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Hostler_ID")
    private Integer hostlerid;
    @Column(nullable = false)
    private String firstname;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String phonenumber;
    @Column(nullable = false)
    private String dateofbirth;
    

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Address_ID") 
    private Address address;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "User_ID",nullable = false)
    private User user;

   @JsonIgnoreProperties("hostler")
    @OneToMany(mappedBy = "hostler", cascade = CascadeType.ALL) 
    private List<RoomAllocation> roomAllocations = new ArrayList();
    
}