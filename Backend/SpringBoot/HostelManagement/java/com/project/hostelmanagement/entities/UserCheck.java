package com.project.hostelmanagement.entities;
public class UserCheck {
	String username;
	String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserCheck(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public UserCheck() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
