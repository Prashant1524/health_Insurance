package com.healthInsurance.healthInsurance.service;

import java.util.List;

import com.healthInsurance.healthInsurance.model.Policy;

public interface PolicyPlansService {

	public String savePolicyPlans(Policy pp);
	public List<Policy> getAllPolicies();
	public List<Policy> findByPolicyFor(String policy_for);
	public List<Policy> findByPolicyId(long policy_id);
	public List<Policy> findByPolicyName(String policy_name);
	public void updatePolicy(Policy policy,long id);
	public void deletePolicy(long id);
	public List<Policy> findByPolicyType(String policy_type);
}
