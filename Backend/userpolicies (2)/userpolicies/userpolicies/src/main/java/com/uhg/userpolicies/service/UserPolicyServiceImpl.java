package com.uhg.userpolicies.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uhg.userpolicies.entity.UserPolicy;
import com.uhg.userpolicies.repository.UserPolicyRepository;

@Service
public class UserPolicyServiceImpl {
	
	@Autowired
	private UserPolicyRepository userPolicyRepo;
	
	
	@Autowired
	public List<UserPolicy> findById(long id)
	{
		return userPolicyRepo.findById(id);
	}
	
	@Autowired
	public List<UserPolicy> findByUserEmail(String user_email){
		
		return userPolicyRepo.findByUserEmail( user_email);
		
	}

}
