package com.healthInsurance.healthInsurance.controller;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthInsurance.healthInsurance.Exception.PolicyException;
import com.healthInsurance.healthInsurance.model.Hospital;
import com.healthInsurance.healthInsurance.model.Policy;
import com.healthInsurance.healthInsurance.repo.HospitalRepo;
import com.healthInsurance.healthInsurance.service.PolicyPlansService;



@RestController
@RequestMapping("/policy")
public class PolicyPlansController {
	@Autowired
	private PolicyPlansService pps;
	
	@Autowired 
	HospitalRepo hosrepo;
	
//	@PostMapping("/addPolicy")
//	public String savePolicyPlans(@RequestBody Policy pp) 
//	{
//		List<Policy> policiesByName = pps.findByPolicyName(pp.getPolicy_name());
//		if(policiesByName!=null && policiesByName.size()>0)
//		{
//			return "Policy already exist";
//		}
//		return pps.savePolicyPlans(pp);
//		
//	} 
	@PostMapping("/addPolicy")
	public String saveUser(@RequestBody Policy pp) {
        String fpolicy="Family";
        String quarterly="Quarterly";
        String halfYearly="Half Yearly";
        String yearly="Yearly";
        LocalDateTime sd=LocalDateTime.now();
        //Family
        if(pp.getPolicy_for().equals(fpolicy))
        {
            if(pp.getPolicy_type().equalsIgnoreCase(quarterly))
            {
            	pp.setStartDate(sd);
//                pp.setEndDate(sd.plusDays(92));
                pp.setEndDate(sd.plusMinutes(1));
                pp.setPolicy_start_amount(799);
                pp.setPolicy_total_amount(pp.getPolicy_start_amount()*4);
                return pps.savePolicyPlans(pp);
            }
            else if(pp.getPolicy_type().equalsIgnoreCase(halfYearly))
            {
            	pp.setStartDate(sd);
                pp.setEndDate(sd.plusDays(182));
                pp.setPolicy_start_amount(799);
                pp.setPolicy_total_amount(pp.getPolicy_start_amount()*6);
                return pps.savePolicyPlans(pp);
            }
            else
            {
            	pp.setStartDate(sd);
                pp.setEndDate(sd.plusDays(365));
                pp.setPolicy_start_amount(799);
                pp.setPolicy_total_amount(pp.getPolicy_start_amount()*12);
                return pps.savePolicyPlans(pp);
            }
        }
        //Self
        else if(pp.getPolicy_type().equalsIgnoreCase(quarterly))
        {
        	pp.setStartDate(sd);
            pp.setEndDate(sd.plusDays(92));
            pp.setPolicy_total_amount(pp.getPolicy_start_amount()*4);
            return pps.savePolicyPlans(pp);
        }
        else if(pp.getPolicy_type().equalsIgnoreCase(halfYearly))
        {
        	pp.setStartDate(sd);
            pp.setEndDate(sd.plusDays(182));
            pp.setPolicy_total_amount(pp.getPolicy_start_amount()*6);
            return pps.savePolicyPlans(pp);
        }
        else if(pp.getPolicy_type().equalsIgnoreCase(yearly)) 
        {
        	pp.setStartDate(sd);
            pp.setEndDate(sd.plusDays(365));
            pp.setPolicy_total_amount(pp.getPolicy_start_amount()*12);
            return pps.savePolicyPlans(pp);
        }
        else
        {
        	return pps.savePolicyPlans(pp);   
        }    
	
		
		
	}
	
	@GetMapping("/getAllPolicyPlans")
	
	public List<Policy> getAllPolicyPlans()
	{
		if(pps.getAllPolicies().isEmpty())
		{
			throw new PolicyException("Empty. Please add some policies");
		}
		return pps.getAllPolicies();
	}
	@GetMapping("/findById/{id}")
	public List<Policy> findByPolicyId(@PathVariable long id)
	{
		if(pps.findByPolicyId(id).isEmpty())
		{
			throw new PolicyException("No such policy exists by this Id");
		}
		return pps.findByPolicyId(id);
	}
	
	
	
	@GetMapping("/findByPolicyFor/{policy_for}")
	public List<Policy> findByPolicyFor(@PathVariable String policy_for)
	{
		return pps.findByPolicyFor(policy_for);
	}
	@GetMapping("/findByPoliceName/{policy_name}")
	public List<Policy> findByPolicyName(@PathVariable String policy_name) throws Exception
	{	
		if(pps.findByPolicyName(policy_name).isEmpty())
		{
			throw new PolicyException("No such record");
		}
		return pps.findByPolicyName(policy_name);
	}
	@PutMapping("/updatePolicy")
	public void updatePolicy(@RequestBody Policy policy)
	{
		
		if(policy.getPolicy_id()!=0)
		{
			pps.savePolicyPlans(policy);
			System.out.println("Policy updated");
		}
		else
		{
			System.out.println("There is no policy");
			
		}
	}
	@DeleteMapping("/deletePolicy/{id}")
	public void deletePolicy(@PathVariable long id)
	{
		pps.deletePolicy(id);
	}

	@PostMapping("/hospital")
	public String saveData(@RequestBody Hospital hp) {
		hosrepo.save(hp);
		return "data saved";
		
	}
	
	@GetMapping("/getallhospitals")
	public List<Hospital> getallhospital() {
		List<Hospital> list= hosrepo.findAll();
		return list;
		
	}
	
	@GetMapping("/getPolicyType/{policy_type}")
    public List<Policy> findByPolicyType(@PathVariable String policy_type)
    {
        return pps.findByPolicyType(policy_type);
    }

 
	
}
