package com.uhg.userpolicies.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.uhg.userpolicies.entity.UserPolicy;

@Repository
public interface UserPolicyRepository extends JpaRepository<Long, UserPolicy>{
	
	@Query(value="Select * from UserPolicy where id=?1",nativeQuery=true)
	public  List<UserPolicy> findById(long id);

	@Query(value="Select * from UserPolicy where user_email=?1",nativeQuery=true)
	public List<UserPolicy> findByUserEmail(String  user_email);
	

}
