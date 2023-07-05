package com.uhg.userpolicies.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.uhg.userpolicies.entity.UserPolicy;
import com.uhg.userpolicies.service.UserPolicyService;
import com.uhg.userpolicies.userpolicyexception.UserPolicyException;

@RestController
@RequestMapping("/userpolicies")
public class UserPolicyController {
	
	@Autowired 
	private Environment ev;
	
	
	@Autowired
	private UserPolicyService ups;
	
	@PostMapping("/add")
	public String saveUser(@RequestBody UserPolicy userpolicy) {

		
		return ups.saveUser(userpolicy);
		
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
	
	@GetMapping("/findByEmail/{user_email}")
	public List <UserPolicy> findByUserEmail(@PathVariable String user_email){
		if(ups.findByUserEmail(user_email).isEmpty()) {
			
			throw new UserPolicyException("no such userfirstname exist");
		}
		return ups.findByUserEmail(user_email);
		
	}
	
	
}
