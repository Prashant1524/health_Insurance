package com.healthInsurance.healthInsurance.model;

	import java.time.LocalDateTime;

//import java.util.Date;
	//
	//import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Policy")
public class Policy
{
	@Id
	private long policy_id;
	private String policy_name;
	private String policy_image_url;
	private String policy_cover_amount;
	private long policy_start_amount;
	private String policy_type;
	private String policy_for;
	private Long policy_total_amount;
	private String description;
    private String benefits;
    private int min_age;
    private int max_age;
    private LocalDateTime startDate;
	private LocalDateTime endDate;
	public Long getPolicy_total_amount() {
		return policy_total_amount;
	}
	public void setPolicy_total_amount(Long policy_total_amount) {
		this.policy_total_amount = policy_total_amount;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getBenefits() {
		return benefits;
	}
	public void setBenefits(String benefits) {
		this.benefits = benefits;
	}
	public int getMin_age() {
		return min_age;
	}
	public void setMin_age(int min_age) {
		this.min_age = min_age;
	}
	public int getMax_age() {
		return max_age;
	}
	public void setMax_age(int max_age) {
		this.max_age = max_age;
	}
	public Policy() {
		super();
		// TODO Auto-generated constructor stub
	}
	public long getPolicy_id() {
		return policy_id;
	}
	public Policy(long policy_id, String policy_name, String policy_image_url, String policy_cover_amount,
		long policy_start_amount, String policy_type, String policy_for, Long policy_total_amount, String description,
		String benefits, int min_age, int max_age,LocalDateTime startDate, LocalDateTime endDate) {
	super();
	this.policy_id = policy_id;
	this.policy_name = policy_name;
	this.policy_image_url = policy_image_url;
	this.policy_cover_amount = policy_cover_amount;
	this.policy_start_amount = policy_start_amount;
	this.policy_type = policy_type;
	this.policy_for = policy_for;
	this.policy_total_amount = policy_total_amount;
	this.description = description;
	this.benefits = benefits;
	this.min_age = min_age;
	this.max_age = max_age;
	this.startDate=startDate;
	this.endDate=endDate;
}
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public LocalDateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
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
	
	

}
