package com.uhg.userpolicies.scheduler;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

//import com.AnnouncementService.Entity.AnnouncementEntity;
//import com.AnnouncementService.Entity.AnnouncementEntity;
import com.uhg.userpolicies.entity.UserPolicy;
import com.uhg.userpolicies.repository.UserPolicyRepository;
import com.uhg.userpolicies.service.EmailService;
import com.uhg.userpolicies.service.UserPolicyService;

@Component
public class Scheduler {
	
	@Autowired
	private EmailService emailservice;
	@Autowired
	private UserPolicyRepository repo;
	@Autowired
	private UserPolicyService userservice;
	
	@Scheduled(fixedDelay = 60000)//, timeUnit = TimeUnit.HOURS)
    public void scheduleEmail() {
		List<UserPolicy> policyList = userservice.findAll();
		for(UserPolicy policy:policyList ) {
			System.out.println(policy.getEndDate());
			LocalDateTime currentTime = LocalDateTime.now();
			DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
			String formatDateTime = currentTime.format(format);
			LocalDateTime time = LocalDateTime.parse(formatDateTime, format);
			
//			int year=policy.getEndDate().getYear(); 
//			int month=policy.getEndDate().getMonthValue();
//			int dayOfTheMonth=policy.getEndDate().getDayOfMonth();
//			int hour=policy.getEndDate().getHour();
//			int minute=policy.getEndDate().getMinute();
//			int second=policy.getEndDate().getSecond();
//			LocalDateTime endTime=LocalDateTime.of(year,month,dayOfTheMonth,hour,minute,second);
//			Duration duration = Duration.between(currentTime, endTime);
//			long add=duration.toMinutes();
//			LocalDateTime currentTimePlusExpirationTime = currentTime.plusMinutes(add);
//			System.out.println(policy.getEndDate()+" "+time);
			
			LocalDateTime policybeforedate = policy.getEndDate().minusWeeks(1);
			String formatEndDateTime = policybeforedate.format(format);
			LocalDateTime Endtime = LocalDateTime.parse(formatEndDateTime, format);
			System.out.println(Endtime);
			
			if ((Endtime).isEqual(time)) {
				
				emailservice.sendReminder(policy.getUser_email(),"user");
				System.out.println(Endtime+"      --"+time);
				
            }
			
		}
	    
         
    }

}
