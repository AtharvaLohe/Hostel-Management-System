package com.project.hostelmanagement.entities;



public class ApiResponseForOTP {
    private boolean success;
    private String message;

    public ApiResponseForOTP(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}

