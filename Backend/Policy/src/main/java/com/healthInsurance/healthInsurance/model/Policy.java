package com.healthInsurance.healthInsurance.model;

	import java.time.LocalDate;
//import java.util.Date;

//import java.util.Date;
	//
	//import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Policy")
public class Policy
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long policy_id;
	private String policy_name;
	private String policy_image_url;
	private String policy_cover_amount;
	private LocalDate startDate;
	private LocalDate endDate;
	private long policy_start_amount;
	private String policy_type;
	private String policy_for;
	private String details;
	private Long policy_total_amount;
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public Policy() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Policy(long policy_id, String policy_name, String policy_image_url, String policy_cover_amount,
			long policy_start_amount, String policy_type, String policy_for, String details, Long policy_total_amount, LocalDate startDate, LocalDate endDate) {
		super();
		this.policy_id = policy_id;
		this.policy_name = policy_name;
		this.policy_image_url = policy_image_url;
		this.policy_cover_amount = policy_cover_amount;
		this.policy_start_amount = policy_start_amount;
		this.policy_type = policy_type;
		this.policy_for = policy_for;
		this.details= details;
		this.policy_total_amount = policy_total_amount;
		this.startDate=startDate;
		this.endDate=endDate;
	}
	
	public long getPolicy_id() {
		return policy_id;
	}
	public void setPolicy_id(long policy_id) {
		this.policy_id = policy_id;
	}
	public String getPolicy_name() {
		return policy_name;
	}
	public void setPolicy_name(String policy_name) {
		this.policy_name = policy_name;
	}
	public String getPolicy_image_url() {
		return policy_image_url;
	}
	public void setPolicy_image_url(String policy_image_url) {
		this.policy_image_url = policy_image_url;
	}
	public String getPolicy_cover_amount() {
		return policy_cover_amount;
	}
	public void setPolicy_cover_amount(String policy_cover_amount) {
		this.policy_cover_amount = policy_cover_amount;
	}
	public long getPolicy_start_amount() {
		return policy_start_amount;
	}
	public void setPolicy_start_amount(long policy_start_amount) {
		this.policy_start_amount = policy_start_amount;
	}
	public String getPolicy_type() {
		return policy_type;
	}
	public void setPolicy_type(String policy_type) {
		this.policy_type = policy_type;
	}
	public String getPolicy_for() {
		return policy_for;
	}
	public void setPolicy_for(String policy_for) {
		this.policy_for = policy_for;
	}
	public Long getPolicy_total_amount() {
		return policy_total_amount;
	}
	public void setPolicy_total_amount(Long policy_total_amount) {
		this.policy_total_amount = policy_total_amount;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	
	

}
