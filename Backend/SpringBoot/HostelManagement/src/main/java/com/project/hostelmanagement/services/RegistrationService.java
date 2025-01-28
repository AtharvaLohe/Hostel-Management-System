package com.project.hostelmanagement.services;

import com.project.hostelmanagement.entities.Address;
import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.Role;
import com.project.hostelmanagement.entities.User;
import com.project.hostelmanagement.repositories.AddressRepository;
import com.project.hostelmanagement.repositories.HostelerRepository;
import com.project.hostelmanagement.repositories.RoleRepository;
import com.project.hostelmanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HostelerRepository hostlerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private RoleRepository roleRepository; 

    @Autowired
    private EmailService mails;
    
    
    @Transactional
    public String registerUser (User user, Hostler hostler, Address address) {
        
       
    	 if (hostlerRepository.existsByEmail(hostler.getEmail()) || hostlerRepository.existsByPhonenumber(hostler.getPhonenumber())) {
             return "Hostler with this email or phone number is already registered. You can log in.";
         }

       
        Role role = roleRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);

       
        hostler.setAddress(address);

        
        userRepository.save(user);
        hostler.setUser (user); 
        hostlerRepository.save(hostler); 
        addressRepository.save(address); 

        // Return a success message
        return "User  registered successfully";
    }
}