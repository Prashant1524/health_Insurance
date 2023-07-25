package com.healthInsurance.healthInsurance.Exception;

public class PolicyException extends RuntimeException {

	private String message;

	public PolicyException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PolicyException(String message) {
		super(message);
		this.message = message;
	}


	
}
