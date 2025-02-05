package com.project.hostelmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.project.hostelmanagement.entities.Address;
import com.project.hostelmanagement.entities.AddressUpdate;
import com.project.hostelmanagement.entities.HostelerUpdate;
import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.User;
import com.project.hostelmanagement.entities.UserCheck;
import com.project.hostelmanagement.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    
    //Used post method here for security purpose as we can see the password in url when we use get
    @PostMapping("/check")
    public ResponseEntity<User> checkUser(@RequestBody UserCheck userCheck) {
        User user = userService.getUserLogin(userCheck.getUsername(), userCheck.getPassword());
        if (user != null) {
            // Return the user with role info
        	 user.setPassword(null); 
            return ResponseEntity.ok(user);
        } else {
            // If invalid credentials, return 401 Unauthorized
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }
    
    @PutMapping("/updateAddress")
    public Address updateAdd(@RequestBody AddressUpdate newadd)throws Exception{
    	return userService.updateAddress(newadd);
    }
    @PutMapping("/updatehost")
    public Hostler upHostler(@RequestBody HostelerUpdate newhost)throws Exception {
    	return userService.updateHostler(newhost);
    }
    
}
