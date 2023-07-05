package com.AnnouncementService.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AnnouncementService.AnnouncementScheduler.AnnouncementScheduler;
import com.AnnouncementService.Entity.AnnouncementEntity;
import com.AnnouncementService.Repository.AnnouncementRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AnnouncementService {

	
	@Autowired
    private AnnouncementScheduler announcementScheduler;

 

    @Autowired
    private AnnouncementRepository announcementRepository;

 

    public void startAnnouncement(String annoucementTextData, LocalDateTime startTime, LocalDateTime endTime) {
        // Create a new announcement entity and save it to the database
        AnnouncementEntity announcement = new AnnouncementEntity(annoucementTextData, startTime, endTime);
        announcementRepository.save(announcement);
        // Schedule the announcement to appear and disappear
        announcementScheduler.scheduleAnnouncement(announcement);
//        announcementScheduler.deleteExpiredAnnouncements();
    }

 

    public String getAnnouncementContent() {

                // Check if the announcement should currently be visible
                if (announcementScheduler.isAnnouncementVisible()) {
                    AnnouncementEntity activeAnnouncement = announcementScheduler.getActiveAnnouncement();
                    return activeAnnouncement.getAnnoucementTextData();
                } else {
                    return null; // Return null to indicate that the announcement is not currently visible
                }

    }
    
    public void deleteExpiredAnnouncements(LocalDateTime currentTime) {
    	List<AnnouncementEntity> expiredAnnouncements = announcementRepository.findByEndTimeBefore(currentTime);
    	announcementRepository.deleteAll(expiredAnnouncements);
    	}
 
   
    public List<AnnouncementEntity> getAllAnnouncements() {
//    	announcementScheduler.deleteExpiredAnnouncements();
    	announcementScheduler.checkForExpiredAnnouncements();
        return announcementRepository.findAll();
    }
}
