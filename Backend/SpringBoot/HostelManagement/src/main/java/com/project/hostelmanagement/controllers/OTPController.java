package com.project.hostelmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hostelmanagement.entities.ApiResponseForOTP;
import com.project.hostelmanagement.entities.OtpRequest;
import com.project.hostelmanagement.entities.ResetPasswordRequest;
import com.project.hostelmanagement.services.ForgetPasswordService;

@RestController
@RequestMapping("/api/password")
public class OTPController {

    @Autowired
    private ForgetPasswordService forgetPasswordService;

    // **1. Send OTP**
    @PostMapping("/sendOtp")
    public String sendOtp(@RequestBody OtpRequest request) {
        return forgetPasswordService.sendOtp(request.getEmail());
    }

    // **2. Verify OTP**
    @PostMapping("/verifyOtp")
    public ApiResponseForOTP verifyOtp(@RequestBody OtpRequest request) {
        return forgetPasswordService.verifyOtp(request.getEmail(), request.getOtp());
    }

    // **3. Reset Password (After OTP Verification)**
    @PostMapping("/resetPassword")
    public ApiResponseForOTP resetPassword(@RequestBody ResetPasswordRequest request) {
        return forgetPasswordService.resetPassword(request.getEmail(), request.getNewPassword());
    }
}
