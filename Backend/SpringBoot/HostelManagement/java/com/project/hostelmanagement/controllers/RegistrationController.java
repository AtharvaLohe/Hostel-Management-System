package com.project.hostelmanagement.controllers;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hostelmanagement.entities.Address;
import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.RegistrationRequest;
import com.project.hostelmanagement.entities.User;
import com.project.hostelmanagement.services.RegistrationService;

@RestController
@RequestMapping("auth/api")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser (@RequestBody RegistrationRequest registrationRequest) {
        
        User user = new User();
        user.setUsername(registrationRequest.getEmail());
        String pass = generateRandomPassword();
        user.setPassword(pass); 

        Hostler hostler = new Hostler();
        hostler.setFirstname(registrationRequest.getFirstName());
        hostler.setLastname(registrationRequest.getLastName());
        hostler.setEmail(registrationRequest.getEmail());
        hostler.setPhonenumber(registrationRequest.getPhoneNumber());
        hostler.setDateofbirth(registrationRequest.getDateOfBirth());
        
        Address address = new Address();
        address.setArea(registrationRequest.getArea());
        address.setCity(registrationRequest.getCity());
        address.setPinCode(registrationRequest.getPinCode());
        address.setState(registrationRequest.getState());

        
        String result = registrationService.registerUser(user, hostler, address);

        return ResponseEntity.ok(result); 
    }
    
    
    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        byte[] passwordBytes = new byte[12]; 
        random.nextBytes(passwordBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(passwordBytes);
    }
    
    
}





// Method = post
// URL = http://localhost:8080/api/register
/*JSON body = {
    "firstName": "atharva",
    "lastName": "lohe",
    "email": "atharva.lohe@example.com",
    "phoneNumber": "3456789012",
    "dateOfBirth": "1993-03-03",
    "area": "fsjfkbs",
    "city": "fdskjfbskj",
    "pinCode": "24680",
    "state": "state"
}
*/