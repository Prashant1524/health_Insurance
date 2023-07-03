package com.healthInsurance.healthInsurance.service;

import java.io.IOException;
import java.util.stream.Stream;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthInsurance.healthInsurance.model.File;
import com.healthInsurance.healthInsurance.repo.FileRepo;

@Service
public class FileService {
	@Autowired
	private FileRepo fr;
	
	public File store(MultipartFile mf) throws IOException
	{
		String filename=mf.getOriginalFilename();
		File f=new File(filename,mf.getContentType(),mf.getBytes());
		return fr.save(f);
	}
	
	public File getFile(long id)
	{
		return fr.findById(id).get();
	}
	
}
