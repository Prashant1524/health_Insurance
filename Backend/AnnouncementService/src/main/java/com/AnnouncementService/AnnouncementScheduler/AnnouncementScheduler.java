package com.AnnouncementService.AnnouncementScheduler;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.AnnouncementService.Entity.AnnouncementEntity;
import com.AnnouncementService.Repository.AnnouncementRepository;
import com.AnnouncementService.Service.AnnouncementService;

@Component
public class AnnouncementScheduler {

    @Autowired
    private AnnouncementRepository announcementRepository;

    private AnnouncementService announcementService;

    private AnnouncementEntity activeAnnouncement;



//    public boolean isAnnouncementVisible() {
//        return activeAnnouncement != null;
//    }



    public AnnouncementEntity getActiveAnnouncement() {
        return activeAnnouncement;
    }



    public void scheduleAnnouncement(AnnouncementEntity announcement) {
        activeAnnouncement = announcement;
    }
    
//    
//	@Scheduled(fixedDelay = 60000) // Run every 60 seconds
//	public void deleteExpiredAnnouncements() {
////    AnnouncementEntity announcement = new AnnouncementEntity();
////    LocalDateTime currentTime = LocalDateTime.now();
////    LocalDateTime currentTimePlusExpirationTime = currentTime.plusMinutes(announcement.getEndTime().getMinute());
//		if (activeAnnouncement != null) {
//			Optional<AnnouncementEntity> optionalAnnouncement = announcementRepository.findById(activeAnnouncement.getAnnouncementId());
//			if (optionalAnnouncement.isPresent()) {
//				AnnouncementEntity announcement = optionalAnnouncement.get();
////				LocalDateTime currentTime = announcement.getStartTime();
////				LocalDateTime currentTimePlusExpirationTime = currentTime.plusMinutes(announcement.getEndTime().getMinute());
//				
//				LocalDateTime startTime=LocalDateTime.now();
//				System.out.println(startTime);
//				int year=announcement.getEndTime().getYear(); 
//				int month=announcement.getEndTime().getMonthValue();
//				int dayOfTheMonth=announcement.getEndTime().getDayOfMonth();
//				int hour=announcement.getEndTime().getHour();
//				int minute=announcement.getEndTime().getMinute();
//				int second=announcement.getEndTime().getSecond();
//						
//				LocalDateTime endTime=LocalDateTime.of(year,month,dayOfTheMonth,hour,minute,second);
//				
//				System.out.println(endTime);
//				Duration duration = Duration.between(startTime, endTime);
//				System.out.println(duration.toMinutes());
//				long add=duration.toMinutes();
//				LocalDateTime currentTimePlusExpirationTime = startTime.plusMinutes(add);
//				System.out.println(currentTimePlusExpirationTime);
//				if (endTime.isBefore(currentTimePlusExpirationTime)) {
//					System.out.println("TimeHasAlredyPassed");
////					activeAnnouncement = null;
//					announcementRepository.delete(announcement);
//				} else {
////					announcementService.deleteExpiredAnnouncements(currentTime);
//					activeAnnouncement = null;
//				}
//			}
//		}
//
//	}

    
    public boolean isAnnouncementVisible() {
        // TODO Auto-generated method stub
         return activeAnnouncement != null;
    }
    
    


    //@Scheduled(fixedRate = 1000000) // Check for expired announcements every minute
    @Scheduled(fixedDelay = 60000)//, timeUnit = TimeUnit.HOURS)
    public void checkForExpiredAnnouncements() {
        if (activeAnnouncement != null) {
            Optional<AnnouncementEntity> optionalAnnouncement = announcementRepository.findById(activeAnnouncement.getAnnouncementId());
            if (optionalAnnouncement.isPresent()) {
                AnnouncementEntity announcement = optionalAnnouncement.get();
                LocalDateTime currentTime = LocalDateTime.now();
                int year=announcement.getEndTime().getYear(); 
				int month=announcement.getEndTime().getMonthValue();
				int dayOfTheMonth=announcement.getEndTime().getDayOfMonth();
				int hour=announcement.getEndTime().getHour();
				int minute=announcement.getEndTime().getMinute();
				int second=announcement.getEndTime().getSecond();
						
				LocalDateTime endTime=LocalDateTime.of(year,month,dayOfTheMonth,hour,minute,second);
				Duration duration = Duration.between(currentTime, endTime);
//				System.out.println(duration.toMinutes());
				long add=duration.toMinutes();
				LocalDateTime currentTimePlusExpirationTime = currentTime.plusMinutes(add);

//                LocalDateTime currentTimePlusExpirationTime = currentTime.plusMinutes(announcement.getEndTime().getMinute());
               
				if ((announcement.getEndTime()).isBefore(currentTimePlusExpirationTime)) {
//					System.out.println(announcement.getEndTime());
//					System.out.println(currentTimePlusExpirationTime);
                    activeAnnouncement = null;
//                    System.out.println("Out");
                    announcementRepository.delete(announcement);
                }
            } else {
                activeAnnouncement = null;
         }
    			LocalDateTime currentDateTime = LocalDateTime.now();
                List<AnnouncementEntity> expiredAnnouncement =announcementRepository.findByEndTimeBefore(currentDateTime);
                announcementRepository.deleteAll(expiredAnnouncement); 
        	
        }
    }

//

   
//
//
//
//
//





}
