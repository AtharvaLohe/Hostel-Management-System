package com.project.hostelmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hostelmanagement.entities.DashBoardOverview;
import com.project.hostelmanagement.services.OwnerDashBoardService;

@RestController
@RequestMapping("/api/owner/dashboard")
public class OwnerDashBoardController {

    @Autowired
    private OwnerDashBoardService ownerDashboardService;

    @GetMapping("/overview")
    public DashBoardOverview getDashboardOverview() {
        // Collect all necessary data for the dashboard
        Long totalHostlers = ownerDashboardService.getTotalHostlers();
        Long totalRooms = ownerDashboardService.getTotalRooms();
        Long availableRooms = ownerDashboardService.getAvailableRooms();
        Long fullRooms = ownerDashboardService.getFullRooms();
        Double totalRevenue = ownerDashboardService.getTotalRevenue();
        Double monthlyRevenue = ownerDashboardService.getMonthlyRevenue();

        // Return a response that combines all the necessary data
        return new DashBoardOverview(
            totalHostlers,
            totalRooms,
            availableRooms,
            fullRooms,
            totalRevenue,
            monthlyRevenue
        );
    }
}
