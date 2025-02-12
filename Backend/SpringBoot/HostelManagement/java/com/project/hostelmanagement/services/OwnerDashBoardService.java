package com.project.hostelmanagement.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.hostelmanagement.repositories.HostelerRepository;
import com.project.hostelmanagement.repositories.RoomAllocationRepository;
import com.project.hostelmanagement.repositories.RoomRepository;

@Service
public class OwnerDashBoardService {

    @Autowired
    private RoomAllocationRepository roomAllocationRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HostelerRepository hostlerRepository;

    public Long getTotalHostlers() {
        return hostlerRepository.getTotalHostlers();
    }

    public Long getTotalRooms() {
        return roomRepository.getTotalRooms();
    }

    public Long getAvailableRooms() {
        return roomRepository.getAvailableRooms();
    }

    public Long getFullRooms() {
        return getTotalRooms() - getAvailableRooms();
    }

    public Double getTotalRevenue() {
        return roomAllocationRepository.getTotalRevenue();
    }

    public Double getMonthlyRevenue() {
        LocalDate today = LocalDate.now();
        return roomAllocationRepository.getMonthlyRevenue(today.getYear(), today.getMonthValue());
    }
}