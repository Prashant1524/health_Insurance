package com.uhg.userpolicies.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uhg.userpolicies.entity.UserPolicy;
import com.uhg.userpolicies.service.UserPolicyService;
import com.uhg.userpolicies.userpolicyexception.UserPolicyException;

@RestController
@RequestMapping("/")
public class UserPolicyController {
	
	private UserPolicyService ups;
	
	
	public String saveUser(@RequestBody UserPolicy userp) {
		
		
		return null;
		
	}

	@GetMapping("/findByTestimonialId/{id}")
	public List<UserPolicy> findById(@PathVariable long id)
	{
		if(ups.findById(id).isEmpty())
		{
			throw new UserPolicyException("No such userid exists by this Id");
		}
		
		return ups.findById(id);
	}
	
	@GetMapping("/findByEmail/{email}")
	public List <UserPolicy> findByUserEmail(@PathVariable String user_email){
		if(ups.findByUserEmail(user_email).isEmpty()) {
			
			throw new UserPolicyException("no such userfirstname exist");
		}
		return ups.findByUserEmail(user_email);
		
	}
	
	
}
