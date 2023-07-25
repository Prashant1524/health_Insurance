package com.uhg.testimonial.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.uhg.testimonial.entity.Testimonial;
import com.uhg.testimonial.service.TestimonialServiceImpl;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

	void save(TestimonialServiceImpl ts);
@Query(value="Select * from Testimonial where id=?1",nativeQuery=true)
public  List<Testimonial> findById(long id);
	

}
