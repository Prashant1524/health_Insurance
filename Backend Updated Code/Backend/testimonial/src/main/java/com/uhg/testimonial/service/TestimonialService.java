package com.uhg.testimonial.service;

import java.util.List;
import java.util.Optional;

import com.uhg.testimonial.entity.Testimonial;

public interface TestimonialService {

	//String saveTestimonial(TestimonialServiceImpl ts);
	
	public void deleteTestimonial(long id);
	
	public List<Testimonial> getAllTestimonials();

	String saveTestimonial(Testimonial tm);

	public List<Testimonial> findById(long id);

}
