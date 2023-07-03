package com.healthInsurance.healthInsurance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.healthInsurance.healthInsurance.model.Policy;

public interface PolicyPlansRepo extends JpaRepository<Policy,Long>{


	@Query(value="Select * from Policy where policy_name=?1",nativeQuery=true)
	public List<Policy> findByPolicyName(String policy_name);
	
	@Query(value="Select * from Policy where policy_id=?1",nativeQuery=true)
	public List<Policy> findByPolicyId(long id);
	@Query(value="Select * from Policy where policy_for=?1",nativeQuery=true)
	public List<Policy> findByPolicyFor(String policy_for);
	

}
