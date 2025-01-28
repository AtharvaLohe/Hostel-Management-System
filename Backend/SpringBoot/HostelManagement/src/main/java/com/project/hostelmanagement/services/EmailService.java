package com.project.hostelmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
    private JavaMailSender mailSender;

    public String sendRegistrationEmail(String to, String username, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Registration Successful");
        message.setText("Dear User,\n\n" +
                "You have successfully registered for the hostel.\n" +
                "Your username: " + username + "\n" +
                "Your password: " + password + "\n\n" +
                "Thank you for registering with us");

        try {
            mailSender.send(message);
            return "Email sent To Hosteler.";
        } catch (Exception e) {
            return "Failed to send email. Please check your email";
        }
    }
}

