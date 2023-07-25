package com.AnnouncementService.Service;

import java.time.LocalDateTime;
import java.util.List;
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

 

    public void startAnnouncement(String annoucementTextData, LocalDateTime endTime) {
      AnnouncementEntity announcement = new AnnouncementEntity(annoucementTextData, endTime);
        announcementRepository.save(announcement);        
        announcementScheduler.scheduleAnnouncement(announcement);

    }

 

    public String getAnnouncementContent() {

                if (announcementScheduler.isAnnouncementVisible()) {
                    AnnouncementEntity activeAnnouncement = announcementScheduler.getActiveAnnouncement();
                    return activeAnnouncement.getAnnoucementTextData();
                } else {
                    return null; 
                }

    }
    
    public void deleteExpiredAnnouncements(LocalDateTime currentTime) {
    	announcementScheduler.deleteAnnouncements();
    	}
   
    public List<AnnouncementEntity> getAllAnnouncements() {
    	announcementScheduler.checkForExpiredAnnouncements();
        return announcementRepository.findAll();
    }
}
