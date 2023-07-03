package com.insurance.uhg.userservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.insurance.uhg.userservice.model.User;
import com.insurance.uhg.userservice.repo.UserRepo;


@Service
public class UserDetailsServiceImp implements UserDetailsService{
	
	@Autowired
	private UserRepo userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = userRepository.findFirstByEmail(email);

		if(user==null) {
			throw new UsernameNotFoundException("User not found", null);
			
		}
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
		
		
	}
	

	

	
}
