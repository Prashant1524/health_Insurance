package com.uhg.userpolicies.service;

import java.util.List;

import com.uhg.userpolicies.entity.UserPolicy;

public interface UserPolicyService {

	List<UserPolicy> findById(long id);

	List<UserPolicy> findByUserEmail(String user_email);
	

}
