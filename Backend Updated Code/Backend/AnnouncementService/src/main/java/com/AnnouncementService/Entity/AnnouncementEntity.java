package com.AnnouncementService.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity(name="annoucement")
@Table(name="annoucement")
public class AnnouncementEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int announcementId;
	private String annoucementTextData;
    private LocalDateTime endTime;
	public AnnouncementEntity(String annoucementTextData, LocalDateTime endTime) {
		super();
		this.setAnnoucementTextData(annoucementTextData);
		this.setEndTime(endTime);
	}
	public AnnouncementEntity() {
		super();
	}
	public int getAnnouncementId() {
		return announcementId;
	}
	public void setAnnouncementId(int announcementId) {
		this.announcementId = announcementId;
	}
	public String getAnnoucementTextData() {
		return annoucementTextData;
	}
	public void setAnnoucementTextData(String annoucementTextData) {
		this.annoucementTextData = annoucementTextData;
	}
	
	public LocalDateTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	
    
	
}
