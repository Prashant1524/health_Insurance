package com.healthInsurance.healthInsurance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthInsurance.healthInsurance.model.Hospital;


//import com.uhg.userpolicies.entity.UserPolicy;

public interface HospitalRepo extends JpaRepository<Hospital,Long>{

	List<Hospital> findAll();
	

}
