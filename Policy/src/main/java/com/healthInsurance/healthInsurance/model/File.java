package com.healthInsurance.healthInsurance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.Table;

@Entity
@Table(name="File")
public class File {
	@Id
	private long file_id;
	private String file_name;
	private String file_type;
	private byte[] data;
	
	
	public File() {
		super();
		// TODO Auto-generated constructor stub
	}
	public File(String file_name, String file_type, byte[] data) {
		super();
		
		this.file_name = file_name;
		this.file_type = file_type;
		this.data = data;
	}
	public long getFile_id() {
		return file_id;
	}
	public void setFile_id(long file_id) {
		this.file_id = file_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
	
	
}