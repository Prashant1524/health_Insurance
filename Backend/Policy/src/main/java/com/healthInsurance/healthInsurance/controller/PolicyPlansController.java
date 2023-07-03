package com.healthInsurance.healthInsurance.controller;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.google.common.net.HttpHeaders;
import com.healthInsurance.healthInsurance.Exception.PolicyException;
import com.healthInsurance.healthInsurance.helper.FileHelper;
import com.healthInsurance.healthInsurance.message.ResponseFile;
import com.healthInsurance.healthInsurance.message.ResponseMessage;
import com.healthInsurance.healthInsurance.model.File;
import com.healthInsurance.healthInsurance.model.Policy;
import com.healthInsurance.healthInsurance.repo.FileRepo;
import com.healthInsurance.healthInsurance.service.FileService;
import com.healthInsurance.healthInsurance.service.PolicyPlansService;


@RestController
@RequestMapping("/policy")
public class PolicyPlansController {
	@Autowired
	private FileHelper fh;
	@Autowired
	private FileRepo fr;
	@Autowired
	private FileService fs;
	
	@Autowired
	private PolicyPlansService pps;
	
	@PostMapping("/addPolicy")
	public String savePolicyPlans(@RequestBody Policy pp) 
	{
		//Policy p=new Policy();
		List<Policy> policiesByName = pps.findByPolicyName(pp.getPolicy_name());
		if(policiesByName!=null && policiesByName.size()>0)
		{
			return "Policy already exist";
		}
		//System.out.println(pp.getPolicy_for());
		if(pp.getPolicy_for().equals("Family"))
		{
			//System.out.println(pp.getPolicy_for());
			pp.setPolicy_start_amount(999);
		

		}
		return pps.savePolicyPlans(pp);
		
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
	
	
	
	@GetMapping("/findByPolicyF	or/{policy_for}")
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
//	@PostMapping("/uploadFile")
//	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file)
//	{
//		System.out.println(file.getOriginalFilename());	
//		System.out.println(file.getContentType());	
//		
//		try
//		{
//			if(file.isEmpty())
//			{
//				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request you to add file");
//			}
//			if(!file.getContentType().equals("application/pdf"))
//			{
//				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Please select a valid file type");
//			}
//			boolean faa=fh.uploadFile(file);
//				
//			if(faa)
//			{
//				return ResponseEntity.ok("File is successfully added");
//			}
//		}
//		catch(Exception e)
//		{
//			e.printStackTrace();
//		}
//		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
//	}
	
	@PostMapping("/uploadfile")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) 
	{
        String message = "";
        try 
        {
            fs.store(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) 
        {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
	}
	

	@GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable long id) {
        File fileDB = fs.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getFile_name() + "\"")
                .body(fileDB.getData());
    }
}
