package com.uhg.testimonial;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;


import com.uhg.testimonial.entity.Testimonial;
import com.uhg.testimonial.exception.TestimonialException;
import com.uhg.testimonial.repository.TestimonialRepository;
import com.uhg.testimonial.service.TestimonialService;


@SpringBootTest
class HealthInsuranceApplicationTests {

	
	@Autowired
	private TestimonialRepository testimonialRepo;
	
	@Autowired
	private TestimonialService ts;

	
	@Autowired
	private Environment ev;
	
	@Test
	public void testToSaveTestimonial() {
		 
		 Testimonial t=new Testimonial();
		 t.setId(1l);
			t.setEmail(ev.getProperty("my.test.email"));
			t.setComments(ev.getProperty("my.test.Comments"));
			t.setRatings(7);
			t.setApproval_status(ev.getProperty("my.test.Apprival_status"));
            ts.saveTestimonial(t);

}
	@Test
	 public   void testToGetAllTestimonials() {
		
		if(ev.getProperty("my.test.email")==null)
		{
			throw new TestimonialException("Empty. Please add some testimonials");
		}
		else
		{
			List<Testimonial> p1=testimonialRepo.findAll();
			System.out.println(assertThat(p1).size());
			System.out.println("testimonial table size "+ p1.size());
		}
		   
	   }
	@Test
	public void testToFindById() {
		
		if(ev.getProperty("my.test.id")==null)
		{
			throw new TestimonialException("Empty please add some testimonials");
		}
		else
		{
			List<Testimonial> p2=testimonialRepo.findAll();
			System.out.println(assertThat(p2).size());
			System.out.println("testimonial table size "+ p2.size());
			
		}
	}
	
//	void testTodeleteTestimonial() {
//		if(ev.getProperty("my.test.id"==1)
//				{
//	}
	
	
	
	
	
	
}