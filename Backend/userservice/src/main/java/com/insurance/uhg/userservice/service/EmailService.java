package com.insurance.uhg.userservice.service;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import com.insurance.uhg.userservice.config.WebConfig;

//import freemarker.template.Template;
import jakarta.mail.internet.MimeMessage;
//import lombok.Value;

@Service
public class EmailService {
	
	
	
	    @Autowired
	    private JavaMailSenderImpl javaMailSender;
	    
	    @Value("${spring.mail.username}")
	    private String email;
	    
	    @Autowired 
	    private ThymeleafService thymeleafService;
	    
	    
	    public void sendRegistrationSuccessEmail(String emailto, String name) {
	    	try {
	            MimeMessage message = javaMailSender.createMimeMessage();
	            MimeMessageHelper helper = new MimeMessageHelper(
	                    message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
	                    StandardCharsets.UTF_8.name()
	            );

	            helper.setTo(emailto);


	            Map<String, Object> variables = new HashMap<>();
	            variables.put("Name", name);
	            variables.put("email", emailto);
	            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	            variables.put("date", sdf.format(new Date()));
	            helper.setSubject("Registeration Successful");
	            helper.setText(thymeleafService.createContent("mail-template.html", variables), true);
	            helper.setFrom(email);
	            javaMailSender.send(message);
	        }catch (Exception e){
	            e.printStackTrace();
	        }
	    }
	    
	


	    
	    public void sendOTPMail(String emailto, String name, int otp) {
	    	
	    	try {
	            MimeMessage message = javaMailSender.createMimeMessage();
	            MimeMessageHelper helper = new MimeMessageHelper(
	                    message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
	                    StandardCharsets.UTF_8.name()
	            );

	            helper.setTo(emailto);


	            Map<String, Object> variables = new HashMap<>();
	            variables.put("Name", name);
	            variables.put("email", emailto);
	            variables.put("otp", otp);
	            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	            variables.put("date", sdf.format(new Date()));
	            helper.setSubject("Reset Password");
	            helper.setText(thymeleafService.createContent("otpmail-template.html", variables), true);
	            helper.setFrom(email);
	            javaMailSender.send(message);
	        }catch (Exception e){
	            e.printStackTrace();
	        }
	    }
		

}
