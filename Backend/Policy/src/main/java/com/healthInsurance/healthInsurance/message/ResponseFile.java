package com.healthInsurance.healthInsurance.message;

public class ResponseFile {

	private String file_name;
	private String url;
	private String file_type;
	private long size;
	public ResponseFile() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ResponseFile(String file_name, String url, String file_type, long size) {
		super();
		this.file_name = file_name;
		this.url = url;
		this.file_type = file_type;
		this.size = size;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	
}
