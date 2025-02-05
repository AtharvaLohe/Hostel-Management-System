package com.project.hostelmanagement.entities;



public class OtpRequest {
    private String email;
    private String otp; // Optional for verifying OTP

    // Getters and Setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
}
