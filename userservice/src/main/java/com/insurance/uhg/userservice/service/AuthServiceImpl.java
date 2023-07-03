package com.insurance.uhg.userservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.uhg.userservice.model.User;
import com.insurance.uhg.userservice.repo.UserRepo;


@Service
public class AuthServiceImpl implements AuthService{
	
	@Autowired
	private UserRepo userRepository;
	
	@Override
	public List<User> findUser(String email) {
		// TODO Auto-generated method stub
		return userRepository.findUser(email);
	}
	@Override
	public User saveUser(User user)
	{
		return userRepository.save(user);
	}
	@Override
	public void updateUser(User user,long id)
	{
		userRepository.save(user);
	}

	@Override
	public void otpVerify(User user, long id) {
		// TODO Auto-generated method stub
		userRepository.save(user);
	}

	

}
