package com.uhg.userpolicies;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;


import com.uhg.userpolicies.entity.UserPolicy;
import com.uhg.userpolicies.repository.UserPolicyRepository;
import com.uhg.userpolicies.service.UserPolicyService;
import com.uhg.userpolicies.userpolicyexception.UserPolicyException;



@SpringBootTest
class UserpoliciesApplicationTests {

	@Autowired
	private UserPolicyRepository userPolicyRepo;
	
	@Autowired
	private UserPolicyService ups;
	
	@Autowired
	private Environment ev;
	
	@Test
	public void testToSaveUserPolicy() {
		 
		UserPolicy up=new UserPolicy();
		 up.setId(1l);
			up.setUser_id(1l);
			up.setUser_email(ev.getProperty("my.user.email"));
			up.setUser_firstname(ev.getProperty("my.user.user_firstname"));
			up.setUser_phoneno(6360542746l);
            up.setPolicy_id(3l);
            up.setPolicy_name(ev.getProperty("my.user.policy_name"));
            up.setPolicy_cover_amount(2000L);
            up.setPolicy_type(ev.getProperty("my.user.policy_type"));
            ups.saveUser(up);

}
	
	@Test
	public void testToFindById() {
		
		if(ev.getProperty("my.user.id")==null)
		{
			throw new UserPolicyException("Empty please add some policies");
		}
		else
		{
			List<UserPolicy> p2=userPolicyRepo.findAll();
			System.out.println(assertThat(p2).size());
			System.out.println("userploicy table size "+ p2.size());
			
		}
	}
    @Test
	public  void testToFindByEmail() {
    	
    	if(ev.getProperty("my.user.email")==null) {
    		
    		throw new UserPolicyException("Empty please add user email");
    	}
    	else 
    	{
    		List<UserPolicy> p3=userPolicyRepo.findAll();
			System.out.println(assertThat(p3).size());
			System.out.println("userploicy table size "+ p3.size());
    	}
	}
	
	
	
}
