package com.uhg.testimonial.exception;

public class TestimonialException extends RuntimeException {
	
	
	private String message;

	public 	TestimonialException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TestimonialException(String message) {
		super(message);
		this.message = message;
	}

}
