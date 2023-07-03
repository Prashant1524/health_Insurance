package com.healthInsurance.healthInsurance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthInsurance.healthInsurance.model.File;

public interface FileRepo extends JpaRepository<File,Long>{

}
