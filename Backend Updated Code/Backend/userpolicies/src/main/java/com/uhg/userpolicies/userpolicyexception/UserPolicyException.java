package com.uhg.userpolicies.userpolicyexception;

public class UserPolicyException extends RuntimeException {

	
	private String message;

	public UserPolicyException() {
		super();
		// TODO Auto-generated constructor stub
	}
  
	public UserPolicyException(String message) {
		super(message);
		this.message = message;
	}
	
}
