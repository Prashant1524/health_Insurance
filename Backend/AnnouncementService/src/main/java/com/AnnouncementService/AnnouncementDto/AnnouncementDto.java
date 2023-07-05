package com.AnnouncementService.AnnouncementDto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@NoArgsConstructor
//@Getter
//@Setter
@AllArgsConstructor
public class AnnouncementDto {
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
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public LocalDateTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	private int announcementId;
	private String annoucementTextData;
	private LocalDateTime startTime;
    private LocalDateTime endTime;
	public AnnouncementDto(String annoucementTextData, LocalDateTime startTime, LocalDateTime endTime) {
		super();
		this.annoucementTextData = annoucementTextData;
		this.startTime = startTime;
		this.endTime = endTime;
	}
	@Override
	public String toString() {
		return "AnnouncementDto [annoucementTextData=" + annoucementTextData + ", startTime=" + startTime + ", endTime="
				+ endTime + "]";
	}
    

}
