package com.AnnouncementService.AnnouncementService;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.AnnouncementService.AnnouncementDto.AnnouncementDto;
import com.AnnouncementService.Controller.AnnouncementController;
import com.AnnouncementService.Entity.AnnouncementEntity;
import com.AnnouncementService.Entity.Position;
import com.AnnouncementService.Repository.PositionRepo;
import com.AnnouncementService.Service.AnnouncementService;

@SpringBootTest
class AnnouncementServiceApplicationTests {

	  	@Mock
	    private AnnouncementService announcementService;

	    @InjectMocks
	    private AnnouncementController announcementController;
	    
	    @Autowired
	    private PositionRepo positionRepo;
	    
	    @Autowired
	    private Environment ev;
	    
	    
	    
	    @Test
	    void testGetAnnouncementContent_ReturnsNoContent() {
	        when(announcementService.getAnnouncementContent()).thenReturn(null);	        ResponseEntity<String> response = announcementController.getAnnouncementContent();
	        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	        verify(announcementService, times(1)).getAnnouncementContent();
	    }
	    @Test
	    void testGetAllAnnouncements_ReturnsAllAnnouncements() {
	        AnnouncementEntity announcement1 = new AnnouncementEntity();
	        AnnouncementEntity announcement2 = new AnnouncementEntity();
	        List<AnnouncementEntity> announcements = Arrays.asList(announcement1, announcement2);
	        when(announcementService.getAllAnnouncements()).thenReturn(announcements);
	        List<AnnouncementEntity> response = announcementController.getAllAnnouncements();
	        assertEquals(announcements, response);
	        verify(announcementService, times(1)).getAllAnnouncements();
	    }
	    
	    
	    @Test
	    void testStartAnnouncement_ReturnsCreatedStatus() {
	        AnnouncementDto announcementDto = new AnnouncementDto(
	                "Test announcement",
	                LocalDateTime.now(),
	                LocalDateTime.now().plusHours(1)
	        );

	        ResponseEntity<String> response = announcementController.startAnnouncement(announcementDto);
	        assertEquals(HttpStatus.CREATED, response.getStatusCode());
	        verify(announcementService, times(1)).startAnnouncement(
	                announcementDto.getAnnoucementTextData(),
	                announcementDto.getEndTime()
	        );
	    }

	    
	    @Test
	    void testDeleteExpiredAnnouncements_ReturnsNoContent() {
	        ResponseEntity<Void> response = announcementController.deleteExpiredAnnouncements();
	        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	    }
	    
	    @Test
	    void testAddPostion() {
	    Position position =new Position();
	    position.setId(1);
	    position.setPositionName("Menu Bar");
	    position.setPositionValue(2);
	    position.setPositionName(ev.getProperty("my.position.positionName"));
	    positionRepo.save(position);
	    assertEquals(ev.getProperty("my.position.positionName"), positionRepo.findById(1L).get().getPositionName());
	    }

	    @Test
	    void testGetAllPositions()
	    {
	    List<Position> list = positionRepo.findAll();
	    assertThat(list).size().isGreaterThan(0);
	    }
	    
	    @Test
	    public void testUpdatePosition() {
	    Position  position = positionRepo.findById(11L).get();
	    position.setPositionName("Banner");
	    position.setPositionValue(3);
	    positionRepo.save(position);
	    assertEquals("Banner", positionRepo.findById(11L).get().getPositionName());
	    }
}
