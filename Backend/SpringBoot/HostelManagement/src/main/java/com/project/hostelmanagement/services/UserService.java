package com.project.hostelmanagement.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.hostelmanagement.entities.Address;
import com.project.hostelmanagement.entities.AddressUpdate;
import com.project.hostelmanagement.entities.HostelerUpdate;
import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.entities.User;
import com.project.hostelmanagement.repositories.AddressRepository;
import com.project.hostelmanagement.repositories.HostelerRepository;
import com.project.hostelmanagement.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addrepo;
    @Autowired
    private HostelerRepository hrepo;
    
    public User getUserLogin(String username, String password) {
        Optional<User> userOptional = userRepository.getUserLogin(username, password);
        return userOptional.orElse(null);  // Return null if no user is found
    }
    
    public Address updateAddress(AddressUpdate add) throws Exception {
    	
    	Address address = addrepo.findById(add.getAddressid())
                .orElseThrow(() -> new Exception("Address not found"));
    	
    	address.setArea(add.getArea());
    	address.setCity(add.getCity());
    	address.setPinCode(add.getPinCode());
    	address.setState(add.getState());
    	addrepo.save(address);
    	
    	return address;
    	
    }
    
    public Hostler updateHostler(HostelerUpdate newhost)throws Exception {
    	
    	System.out.println(newhost.getHostlerid());
    	Hostler hosteler = hrepo.findById(newhost.getHostlerid())
    			 			.orElseThrow(() -> new Exception("Hosteller not found"));
    	
    	hosteler.setFirstname(newhost.getFirstname());
    	hosteler.setLastname(newhost.getLastname());
    	hosteler.setEmail(newhost.getEmail());
    	hosteler.setPhonenumber(newhost.getPhonenumber());
    	hosteler.setDateofbirth(newhost.getDateofbirth());
    	
    	hrepo.save(hosteler);
    	return hosteler;
    }
    
    
    
    
    
}
