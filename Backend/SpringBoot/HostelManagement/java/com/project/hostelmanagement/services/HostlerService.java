package com.project.hostelmanagement.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.hostelmanagement.entities.Hostler;
import com.project.hostelmanagement.repositories.HostelerRepository;

@Service
public class HostlerService{
	

	@Autowired
	HostelerRepository host;
	
	
	public List<Hostler> getUnassignHostler(){
		return host.findUnAssignHostler();
	}
	
	
	
}