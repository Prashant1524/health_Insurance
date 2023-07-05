package com.uhg.userpolicies.entity;

import java.time.LocalDate;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User_policy")
public class UserPolicy {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long user_id;
	private String user_email;
	private String user_firstname;
	private String policy_image_url;
	private Long user_phoneno;
	private Long policy_id;
	private String policy_name;
	private Long policy_cover_amount;
	private String policy_type;
	private LocalDate startDate;
	private LocalDate endDate;
	private long policy_start_amount;
	private String policy_for;
	private String policy_total_amount;
	
	public UserPolicy(Long id, Long user_id, String user_email, String user_firstname, String policy_image_url,
			Long user_phoneno, Long policy_id, String policy_name, Long policy_cover_amount, String policy_type,
			LocalDate startDate, LocalDate endDate, long policy_start_amount, String policy_for,
			String policy_total_amount) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.user_email = user_email;
		this.user_firstname = user_firstname;
		this.policy_image_url = policy_image_url;
		this.user_phoneno = user_phoneno;
		this.policy_id = policy_id;
		this.policy_name = policy_name;
		this.policy_cover_amount = policy_cover_amount;
		this.policy_type = policy_type;
		this.startDate = startDate;
		this.endDate = endDate;
		this.policy_start_amount = policy_start_amount;
		this.policy_for = policy_for;
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
	public long getPolicy_start_amount() {
		return policy_start_amount;
	}
	public void setPolicy_start_amount(long policy_start_amount) {
		this.policy_start_amount = policy_start_amount;
	}
	public String getPolicy_for() {
		return policy_for;
	}
	public void setPolicy_for(String policy_for) {
		this.policy_for = policy_for;
	}
	public String getPolicy_total_amount() {
		return policy_total_amount;
	}
	public void setPolicy_total_amount(String policy_total_amount) {
		this.policy_total_amount = policy_total_amount;
	}

	public String getPolicy_image_url() {
		return policy_image_url;
	}
	public void setPolicy_image_url(String policy_image_url) {
		this.policy_image_url = policy_image_url;
	}
	public UserPolicy() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public String getUser_firstname() {
		return user_firstname;
	}
	public void setUser_firstname(String user_firstname) {
		this.user_firstname = user_firstname;
	}
	public Long getUser_phoneno() {
		return user_phoneno;
	}
	public void setUser_phoneno(Long user_phoneno) {
		this.user_phoneno = user_phoneno;
	}
	public Long getPolicy_id() {
		return policy_id;
	}
	public void setPolicy_id(Long policy_id) {
		this.policy_id = policy_id;
	}
	public String getPolicy_name() {
		return policy_name;
	}
	public void setPolicy_name(String policy_name) {
		this.policy_name = policy_name;
	}
	public Long getPolicy_cover_amount() {
		return policy_cover_amount;
	}
	public void setPolicy_cover_amount(Long policy_cover_amount) {
		this.policy_cover_amount = policy_cover_amount;
	}
	public String getPolicy_type() {
		return policy_type;
	}
	public void setPolicy_type(String policy_type) {
		this.policy_type = policy_type;
	}
//	public void setPolicy_cover_amount(long policy_cover_amount2) {
//		// TODO Auto-generated method stub
//		
//	}
	
	
	

}
