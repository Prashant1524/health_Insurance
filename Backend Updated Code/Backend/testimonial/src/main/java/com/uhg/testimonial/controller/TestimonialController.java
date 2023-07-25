package com.uhg.testimonial.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uhg.testimonial.entity.Testimonial;
import com.uhg.testimonial.exception.TestimonialException;
import com.uhg.testimonial.service.TestimonialService;
import com.uhg.testimonial.service.TestimonialServiceImpl;

@RestController
@RequestMapping("/test")
public class TestimonialController {

	
	@Autowired
	private TestimonialService ts;
	
	@Autowired 
	private Environment ev;
	
	
	@PostMapping("/add")
	public String saveTestimonial(@RequestBody Testimonial testimonial)
	{
		//List<Testimonial> TestimonialById = ts.findById(testimonial.getId());
		List<Testimonial> testimonialById=ts.findById(testimonial.getId());
		if(testimonialById!=null && testimonialById.size()>0)
		{
			return "Testimonial already exist";
		}
		return ts.saveTestimonial(testimonial);
		
	}
	@GetMapping("/findByTestimonialId/{id}")
	public List<Testimonial> findById(@PathVariable long id)
	{
		if(ts.findById(id).isEmpty())
		{
			throw new TestimonialException("No such testimonial exists by this Id");
		}
		
		
		return ts.findById(id);
	}
	
	@GetMapping("/getall")
	public List<Testimonial> getAllTestimonials()
	{
		if (ts.getAllTestimonials().isEmpty())
		{
			throw new TestimonialException("Empty. Please add some testiminals");
		}
		
		
		return ts.getAllTestimonials();
	}
	
	
	
	@DeleteMapping("/deletetestimonial/{id}")
	public void deleteTestimonial(@PathVariable long id)
	{
		ts.deleteTestimonial(id);
	}
}
