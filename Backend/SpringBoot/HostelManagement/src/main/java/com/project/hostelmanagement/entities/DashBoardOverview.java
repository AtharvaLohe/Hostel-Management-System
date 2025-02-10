package com.project.hostelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DashBoardOverview {

	private Long totalHostlers;
    private Long totalRooms;
    private Long availableRooms;
    private Long fullRooms;
    private Double totalRevenue;
    private Double monthlyRevenue;
}
