package com.AnnouncementService.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Position {
	
	@Id
    private long id;
    private int positionValue;
    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getPositionValue() {
		return positionValue;
	}
	public void setPositionValue(int positionValue) {
		this.positionValue = positionValue;
	}
	public String getPositionName() {
		return positionName;
	}
	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}
	private String positionName;}
