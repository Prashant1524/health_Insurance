package com.insurance.uhg.userservice.service;

import java.util.List;
import java.util.Optional;

import com.insurance.uhg.userservice.model.User;


public interface AuthService {
	public List<User> findUser(String email);
	public User saveUser(User user);
	public List<User> findAllUser();
}
