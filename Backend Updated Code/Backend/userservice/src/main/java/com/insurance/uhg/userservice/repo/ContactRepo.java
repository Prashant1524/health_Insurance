package com.insurance.uhg.userservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.uhg.userservice.model.Contact;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long>{
	

}

