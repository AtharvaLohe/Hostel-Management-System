package com.project.hostelmanagement.entities;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "roomallocation")
public class RoomAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomAlloc_ID")
    private Integer roomallocid;

    @JsonIgnoreProperties("roomAllocations")
    @ManyToOne
    @JoinColumn(name = "Hostler_ID", nullable = false)
    private Hostler hostler; 

    @ManyToOne
    @JoinColumn(name = "Room_ID", nullable = false)
    @JsonIgnoreProperties("roomAllocations") 
    private Room room; 

    @Column(nullable = false)
    private LocalDate allocationdate; 

    
}