package com.uhg.testimonial.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="testimonial")
public class Testimonial {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String email;
	private String comments;
	private double ratings;
	private boolean approval_status;
//	public void setRatings(double d) {
//		// TODO Auto-generated method stub
//		
//	}
	public void setApproval_status(String property) {
		// TODO Auto-generated method stub
		
	}
	public void setRatings(double d) {
		// TODO Auto-generated method stub
		
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public boolean isApproval_status() {
		return approval_status;
	}
	public void setApproval_status(boolean approval_status) {
		this.approval_status = approval_status;
	}
	public double getRatings() {
		return ratings;
	}
	
	
	
}
