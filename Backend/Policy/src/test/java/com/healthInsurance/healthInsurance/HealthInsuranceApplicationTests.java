package com.healthInsurance.healthInsurance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.*;


import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import com.healthInsurance.healthInsurance.Exception.PolicyException;
import com.healthInsurance.healthInsurance.model.Policy;
import com.healthInsurance.healthInsurance.repo.PolicyPlansRepo;
import com.healthInsurance.healthInsurance.service.PolicyPlansService;

@SpringBootTest
class HealthInsuranceApplicationTests {

	@Autowired
	private PolicyPlansRepo pr;
	@Autowired
	private PolicyPlansService ps;
	@Autowired
	private Environment ev;
	
	
	//Positive Testing
	//To save the Policy Details
	@Test
	void testToSavePolicyDetails()
	{			
		Policy p=new Policy();
		p.setPolicy_id(1);
		p.setPolicy_name(ev.getProperty("my.policy.policyName"));
		p.setPolicy_image_url(ev.getProperty("my.policy.policyImageUrl"));
		p.setPolicy_cover_amount(ev.getProperty("my.policy.policyCoverAmount"));
		p.setPolicy_start_amount(599L);
		p.setPolicy_type(ev.getProperty("my.policy.policyType"));
		p.setPolicy_for(ev.getProperty("my.policy.policyFor"));
		ps.savePolicyPlans(p);
		
	}
	//To get all policy
	@Test
	void testToGetAllPolicy()
	{
		if(ev.getProperty("my.policy.policyName")==null)
		{
			throw new PolicyException("Empty. Please add some policies");
		}
		else
		{
			List<Policy> p1=pr.findAll();
			System.out.println(assertThat(p1).size());
			System.out.println("Policy table size "+ p1.size());
		}
	}
		
	//To find policy for
	@Test
	void testPolicyFor()
	{
		if(ev.getProperty("my.policy.policyFor").isEmpty())
		{
			throw new PolicyException("Empty");
		}
		else
		{
			assertEquals("Self",ev.getProperty("my.policy.policyFor"));
		}
	}
	//To find the policy name
	@Test
	void testPolicyName()
	{
		assertEquals("WXYZ",ev.getProperty("my.policy.policyName"));
		assertNotNull(ev.getProperty("my.policy.policyName"));
	}
	
	//Testing for update PolicyName
	@Test
	void testForUpdatePolicy()
	{
		
		Policy p=pr.findById(1L).get();
		p.setPolicy_name(ev.getProperty("my.policy.update.policyName"));
		p.setPolicy_image_url(ev.getProperty("my.policy.policyImageUrl"));
		ps.updatePolicy(p, 0);
		assertEquals(ev.getProperty("my.policy.update.policyName"),pr.findById(1L).get().getPolicy_name());
	}
	//Testing to delete a policy
	@Test
	void testToDeletePolicy()
	{
		pr.deleteById(1L);
		assertThat(pr.existsById(1L)).isFalse();
	}
}
	
