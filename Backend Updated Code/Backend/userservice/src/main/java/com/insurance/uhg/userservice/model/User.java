package com.insurance.uhg.userservice.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "insurance_users",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "email")
       })
public class User {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;

	  @NotBlank
	  @Size(max = 20)
	  private String firstname;
	  
	  @NotBlank
	  @Size(max = 20)
	  private String lastname;

	  private long phone;
	  
	  private String email;

	  private Date dob;
	  @NotBlank
	  @Size(max = 120)
	  private String password;
	  
	  @Column(name="otp" ,columnDefinition = "integer default 0")
	   private Integer otp;
	    

	  @ManyToMany(fetch = FetchType.LAZY)
	  @JoinTable(name = "user_roles", 
	             joinColumns = @JoinColumn(name = "user_id"),
	             inverseJoinColumns = @JoinColumn(name = "role_id"))
	  private Set<Role> roles = new HashSet<>();

	  public User() {
	  }

	  
	  public User(Long id, @NotBlank @Size(max = 20) String firstname, @NotBlank @Size(max = 20) String lastname,
			@NotBlank @Size(min = 10) long phone, String email,
			@NotBlank @Size(max = 120) String password, Integer otp, Date dob) {
		super();
		this.id=id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phone = phone;
		this.email = email;
		this.password = password;
		this.otp=otp;
		this.dob= dob;
	}


	public Date getDob() {
		return dob;
	}


	public void setDob(Date dob) {
		this.dob = dob;
	}


	public void setOtp(Integer otp) {
		this.otp = otp;
	}


	public Long getId() {
		return id;
	}
	
	public Integer getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}


	public void setId(Long id) {
		this.id = id;
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
}

