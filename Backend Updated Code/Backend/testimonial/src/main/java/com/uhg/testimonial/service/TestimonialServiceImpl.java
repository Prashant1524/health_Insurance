package com.uhg.testimonial.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uhg.testimonial.entity.Testimonial;
import com.uhg.testimonial.repository.TestimonialRepository;

@Service
public class TestimonialServiceImpl implements TestimonialService {

	@Autowired
	private TestimonialRepository testimonialRepo;


	
	public List<Testimonial> getAllTestimonials() {
		// TODO Auto-generated method stub
		return testimonialRepo.findAll();
	}
	@Override
	public void deleteTestimonial(long id) {
		// TODO Auto-generated method stub
		testimonialRepo.deleteById(id);
	}
	
	@Override
	public String saveTestimonial(Testimonial tm) {
		Testimonial t=testimonialRepo.findById(tm.getId()).orElse(null);
		if(t == null)
		{
			testimonialRepo.save(tm);
			return "testimonial added";
		}
		else
		{
			return "Already exists";
		}
		
	}


	@Override
	public List<Testimonial> findById(long id)
	{
		return testimonialRepo.findById(id);
	}

	
}




	


