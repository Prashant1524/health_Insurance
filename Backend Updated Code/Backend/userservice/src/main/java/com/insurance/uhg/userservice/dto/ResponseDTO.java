package com.insurance.uhg.userservice.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.insurance.uhg.userservice.model.Role;

@JsonIgnoreProperties({"password","otp"})
public class ResponseDTO {

	  private Long id;
	  private String firstname;
	  private String lastname;
	  private long phone;
	  private String email;
	  private String password;
	  private Integer otp;
	  private Set<Role> roles = new HashSet<>();

	
	public Integer getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}


	public String getFirstname() {
		return firstname;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public String getLastname() {
		return lastname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public long getPhone() {
		return phone;
	}


	public void setPhone(long phone) {
		this.phone = phone;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public Set<Role> getRoles() {
	    return roles;
	  }

	  public void setRoles(Set<Role> roles) {
	    this.roles = roles;
	  }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    
}
