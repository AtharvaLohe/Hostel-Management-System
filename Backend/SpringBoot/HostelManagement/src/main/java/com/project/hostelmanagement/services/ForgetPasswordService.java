package com.project.hostelmanagement.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.hostelmanagement.entities.ApiResponseForOTP;
import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.OtpData;
import com.project.hostelmanagement.entities.User;
import com.project.hostelmanagement.repositories.HostelerRepository;
import com.project.hostelmanagement.repositories.UserRepository;

@Service
public class ForgetPasswordService {

	 @Autowired
	 private HostelerRepository hostlerRepository;

	 @Autowired
	 private UserRepository userRepository;
	 
	 
	 @Autowired
	 private JavaMailSender mailSender; // For sending emails

	 private Map<String, OtpData> otpStorage = new HashMap<>();
	 
	 private static final long OTP_VALID_DURATION = 2 * 60 * 1000; 
	 
	 
	  // Send OTP via email
	    public String sendOtp(String email) {
	        Optional<Hostler> hostlerOpt = hostlerRepository.findByEmail(email);
	        if (hostlerOpt.isEmpty()) {
	            return "Hostler with this email not found!";
	        }
	        
	     // Check if an OTP already exists and hasn't expired
	        if (otpStorage.containsKey(email)) {
	            OtpData existingOtpData = otpStorage.get(email);
	            if (System.currentTimeMillis() < existingOtpData.getExpiryTime()) {
	                long remainingTime = (existingOtpData.getExpiryTime() - System.currentTimeMillis()) / 1000;
	                return "OTP already sent! Please wait " + remainingTime + " seconds before requesting a new OTP.";
	            }
	        }


	        // Generate 6-digit OTP
	        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
	        long expiryTime = System.currentTimeMillis() + OTP_VALID_DURATION; // Calculate expiry time

	        // Store OTP and expiry time in the map
	        otpStorage.put(email, new OtpData(otp, expiryTime));

	        // Send OTP via email
	        sendOtpEmail(email, otp);

	        return "OTP sent successfully! Please check your email.";
	    }
	    
	    
	 
	 // Method to send OTP via email
	    private void sendOtpEmail(String toEmail, String otp) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(toEmail);
	        message.setSubject("Your OTP for Password Reset");
	        message.setText("Use the following OTP to reset your password: " + otp + "\nThis OTP is valid for 5 minutes.");

	        mailSender.send(message); // Send the email
	    }
	 
	    public ApiResponseForOTP verifyOtp(String email, String otp) {
	        OtpData otpData = otpStorage.get(email);
	        if (otpData == null) {
	            return new ApiResponseForOTP(false, "No OTP request found for this email!");
	        }

	        if (System.currentTimeMillis() > otpData.getExpiryTime()) {
	            otpStorage.remove(email);
	            return new ApiResponseForOTP(false, "OTP expired! Please request a new OTP.");
	        }

	        if (!otpData.getOtp().equals(otp)) {
	            return new ApiResponseForOTP(false, "Invalid OTP! Please try again.");
	        }

	        return new ApiResponseForOTP(true, "OTP verified successfully! You can now reset your password.");
	    }
	    
	
	    public ApiResponseForOTP resetPassword(String email, String newPassword) {
	        Optional<Hostler> hostlerOpt = hostlerRepository.findByEmail(email);
	        if (hostlerOpt.isPresent()) {
	            User user = hostlerOpt.get().getUser();
	            if (user != null) {
	                user.setPassword(newPassword);
	                userRepository.save(user);
	                otpStorage.remove(email);

	                return new ApiResponseForOTP(true, "Password has been successfully reset!");
	            }
	        }
	        return new ApiResponseForOTP(false, "Failed to reset password! Please try again.");
	    }

}
