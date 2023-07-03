package com.healthInsurance.healthInsurance.helper;

import java.io.FileOutputStream;
import java.io.InputStream;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileHelper {

	public final String upload_dir="D:\\Health Insurance\\Policy\\src\\main\\resources\\static\\image";
	public boolean uploadFile(MultipartFile f)
	{
		boolean fa=false;
		try 
		{
			InputStream is=f.getInputStream();
			byte data[]=new byte[is.available()];
			is.read(data);
			FileOutputStream fos=new FileOutputStream(upload_dir+"\\"+f.getOriginalFilename());
			fos.write(data);
			fos.flush();
			fos.close();
			fa=true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return fa;
	}
}
