package com.uhg.userpolicies.entity;

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
	private long id;
	private long user_id;
	private String user_email;
	private String user_firstname;
	private Long user_phoneno;
	private long policy_id;
	private String policy_name;
	private String policy_cover_amount;
	private String policy_type;

}
