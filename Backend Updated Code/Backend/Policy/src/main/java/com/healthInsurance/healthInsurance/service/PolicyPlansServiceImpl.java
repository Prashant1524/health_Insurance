package com.healthInsurance.healthInsurance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthInsurance.healthInsurance.model.Policy;
import com.healthInsurance.healthInsurance.repo.PolicyPlansRepo;
@Service
public class PolicyPlansServiceImpl implements PolicyPlansService{
	@Autowired
	private PolicyPlansRepo ppr;

	@Override
	public String savePolicyPlans(Policy pp) 
	{

		Policy p=ppr.findById(pp.getPolicy_id()).orElse(null);
		if(p == null)
		{
			ppr.save(pp);
			return "Policy added";
		}
		else
		{
			return "Already exists";
		}
		
	}

	@Override
	public List<Policy> getAllPolicies() {
		
		return ppr.findAll();
	}
	public List<Policy>findByPolicyFor(String policy_for)
	{
		
		return ppr.findByPolicyFor(policy_for);
	}

	@Override
	public List<Policy> findByPolicyId(long policy_id) {
		
		return ppr.findByPolicyId(policy_id);
	}

	@Override
	public List<Policy> findByPolicyName(String policy_name) {
	
		return ppr.findByPolicyName(policy_name);
	}

	@Override
	public void updatePolicy(Policy policy, long id) {
		ppr.save(policy);
		
	}

	@Override
	public void deletePolicy(long id) {
		ppr.deleteById(id);
		
	}
	
}
