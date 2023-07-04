package com.insurance.uhg.userservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import com.insurance.uhg.userservice.model.User;
import com.insurance.uhg.userservice.repo.UserRepo;
import com.insurance.uhg.userservice.service.AuthService;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UserserviceApplicationTests {

	@Autowired
    private UserRepo userRepo;
	
	@Autowired 
	private AuthService authservice;
	
	@Autowired
	private Environment ev;

    @Test
    public void testCreate () {
        User user = new User();
        user.setId(3L);
        user.setFirstname(ev.getProperty("my.user.userFName"));
        user.setLastname(ev.getProperty("my.user.userLName"));
        user.setPhone(9449669289L);
        user.setEmail(ev.getProperty("my.user.userEmail"));
        user.setPassword(ev.getProperty("my.user.userPassword"));
        user.setRoles(null);
        user.setOtp(12345);
        
        authservice.saveUser(user);
        assertNotNull(userRepo.findById(3L).get());
    }
    
    @Test
    public void testReadAll () {
        List list = userRepo.findAll();
        assertThat(list).size().isGreaterThan(0);
    }
    
    @Test
    public void testSingleUser() {
        User user = userRepo.findFirstByEmail(ev.getProperty("my.user.userEmail"));
        assertEquals(9449669289L, user.getPhone());
    }

    @Test
    public void testUpdate () {
        User user = userRepo.findById(3L).get();
        user.setPassword("12346");
        authservice.saveUser(user);
        assertNotEquals(12344, userRepo.findById(3L).get().getPassword());
    }
    
    
}
