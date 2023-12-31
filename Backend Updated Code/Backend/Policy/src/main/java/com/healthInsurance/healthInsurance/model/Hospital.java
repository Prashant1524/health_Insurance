package com.healthInsurance.healthInsurance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Hospital {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String name;
	
	private String city;
	private String state;
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	private String address;
	
	private Long number;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Hospital() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Hospital(Long id, String name, String city, String address, Long number, String state) {
		super();
		this.id = id;
		this.name = name;
		this.city = city;
		this.address = address;
		this.number = number;
		this.state = state;
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}
	
	
	

}
