package com.insurance.uhg.userservice;

 

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

 

import java.util.List;

 

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

 

import com.insurance.uhg.userservice.controller.AuthenticationController;
import com.insurance.uhg.userservice.dto.AuthenticationDTO;
import com.insurance.uhg.userservice.dto.SignupDTO;
import com.insurance.uhg.userservice.model.Contact;
import com.insurance.uhg.userservice.model.User;
import com.insurance.uhg.userservice.repo.ContactRepo;
import com.insurance.uhg.userservice.repo.UserRepo;
import com.insurance.uhg.userservice.service.AuthService;
import com.insurance.uhg.userservice.service.EmailService;

 

import static org.assertj.core.api.Assertions.assertThat;

 

@SpringBootTest
class UserserviceApplicationTests {

 

    @Autowired
    private UserRepo userRepo;

    @Autowired 
    private AuthService authservice;

    @Autowired
    private Environment ev;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ContactRepo contact;


    @Autowired
    AuthenticationController controller;

 

    //Service test
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
        emailService.sendRegistrationSuccessEmail(ev.getProperty("my.user.userFName"),ev.getProperty("my.user.userFName"));
        assertNotNull(userRepo.findById(3L).get());
    }


    @Test
    public void testReadAll () {
        List list = authservice.findAllUser();
        assertThat(list).size().isGreaterThan(0);
    }

    @Test
    public void testSingleUser() {
        List<User> user = authservice.findUser(ev.getProperty("my.user.userEmail"));
        for(User data:user ) {
            assertEquals(9449669289L, data.getPhone());
        }

    }

 

    @Test
    public void testUpdate () {
        User user = userRepo.findById(3L).get();
        user.setPassword("12347");
        authservice.saveUser(user);
        assertNotEquals(12346, userRepo.findById(3L).get().getPassword());
    }


     @Test
     public void testContact() {
         User user = userRepo.findById(3L).get();
         Contact con=new Contact(4L, user, ev.getProperty("my.user.firstname"),ev.getProperty("my.user.lastname"),ev.getProperty("my.user.email"),ev.getProperty("my.user.query"));
         contact.save(con);
     }

     @Test
     public void testOtp() {
         User user = userRepo.findById(3L).get();
         user.setOtp(12345);
         authservice.saveUser(user);
         emailService.sendOTPMail(user.getEmail(),user.getFirstname(), user.getOtp());
     }

     //Controller test
     @Test 
     public void testSignupAuth() {
         SignupDTO user= new SignupDTO();
         user.setId(8L);
         user.setFirstname(ev.getProperty("my.user.userFName"));
         user.setLastname(ev.getProperty("my.user.userLName"));
         user.setPhone(9449669289L);
         user.setEmail(ev.getProperty("my.user.user2Email"));
         user.setPassword(ev.getProperty("my.user.userPassword"));
         user.setRoles(null);
         user.setOtp(12345);

 

         controller.registerUser(user);
     }

     @Test 
     public void testUserSigninAuth(){
         AuthenticationDTO user= new AuthenticationDTO();
         user.setEmail(ev.getProperty("my.user.user2Email"));
         user.setPassword(ev.getProperty("my.user.userPassword"));
         try {
            controller.authenticateUser(user);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

         AuthenticationDTO user2= new AuthenticationDTO();
         user.setEmail("priya@gmail.com");
         user.setPassword(ev.getProperty("my.user.userPassword"));
         try {
            controller.authenticateUser(user);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


     }



     @Test 
     public void testAdminSigninAuth(){
         AuthenticationDTO admin= new AuthenticationDTO();
         admin.setEmail(ev.getProperty("my.user.user2Email"));
         admin.setPassword(ev.getProperty("my.user.userPassword"));
         try {
            controller. authenticateAdmin(admin);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

         AuthenticationDTO admin2= new AuthenticationDTO();
         admin.setEmail("simon@gmail.com");
         admin.setPassword(ev.getProperty("my.user.userPassword"));
         try {
            controller. authenticateAdmin(admin);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }



     }



     @Test 
     public void testfindbyuser(){
         controller.findByUsername(ev.getProperty("my.user.user2Email"));


     }

     @Test 
     public void testupdateuser(){
         User user = userRepo.findById(3L).get();
         user.setFirstname(ev.getProperty("my.user.userFName"));        
          controller.updateUser(user);     
     }

     @Test 
     public void testotpVerify(){
         User user = userRepo.findById(3L).get();
         user.setOtp(4567);
         emailService.sendOTPMail(user.getEmail(),user.getFirstname(), user.getOtp());        
          controller.otpVerify(user);     
     }

     @Test
     public void testuserContact() {
         User user = userRepo.findById(3L).get();
         Contact con=new Contact(7L, user, ev.getProperty("my.user.firstname"),ev.getProperty("my.user.lastname"),ev.getProperty("my.user.email"),ev.getProperty("my.user.query"));
         controller.contact(con);
     }

     @Test
     public void testFindAllUsers() {
        List<User> user = controller.findAllUser();
        assertThat(user).size().isGreaterThan(0);
     }

 

    
}