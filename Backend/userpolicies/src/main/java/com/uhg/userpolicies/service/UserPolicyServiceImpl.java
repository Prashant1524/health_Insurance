package com.uhg.userpolicies.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uhg.userpolicies.entity.UserPolicy;
import com.uhg.userpolicies.repository.UserPolicyRepository;

@Service
public class UserPolicyServiceImpl implements UserPolicyService{
	
	@Autowired
	private UserPolicyRepository userPolicyRepo;
	
	
	
	public List<UserPolicy> findById(long id)
	{
		return userPolicyRepo.findById(id);
	}
	
	
	public List<UserPolicy> findByUserEmail(String user_email){
		
		return userPolicyRepo.findByUserEmail( user_email);
		
	}

	@Override
	public String saveUser(UserPolicy userpolicy) {
		
//		Optional<UserPolicy> up=userPolicyRepo.findById(userpolicy.getId());
//		if(up==null) {
		userPolicyRepo.save(userpolicy);
		return "User policy added";
			
//		}
//		else
//		{
//			return "already exists";
//		}

		// TODO Auto-generated method stub
		
	}

}

