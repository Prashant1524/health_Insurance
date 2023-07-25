package com.insurance.uhg.userservice.model;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name= "contact")
public class Contact {
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;
	  
	  @OneToOne()
//	  @JoinColumn(name = "insurance_users", referencedColumnName = "id"))
	  private User user_id;
	  
	  @NotBlank
	  @Size(max = 20)
	  private String firstname;
	  
	  @NotBlank
	  @Size(max = 20)
	  private String lastname;
	  
	  private String email;
	  
	  private String query;


	  
	  public Contact(Long id, User user_id, @NotBlank @Size(max = 20) String firstname,
			@NotBlank @Size(max = 20) String lastname, String email, String query) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.query = query;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser_id() {
		return user_id;
	}

	public void setUser_id(User user_id) {
		this.user_id = user_id;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}


	public Contact() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
