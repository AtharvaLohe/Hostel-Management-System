package com.project.hostelmanagement.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.hostelmanagement.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
	 @Query("SELECT u FROM User u WHERE username = :uid AND password = :pwd")
     public Optional<User> getUserLogin(String uid, String pwd);
    

    
}