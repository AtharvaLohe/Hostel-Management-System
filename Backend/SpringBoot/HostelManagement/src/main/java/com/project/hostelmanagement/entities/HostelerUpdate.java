package com.project.hostelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class HostelerUpdate {

	private int hostlerid;
    private String firstname;
    private String lastname;
    private String email;
    private String phonenumber;
    private String dateofbirth;
}
