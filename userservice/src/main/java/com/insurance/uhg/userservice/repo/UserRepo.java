package com.insurance.uhg.userservice.repo;

import org.springframework.stereotype.Repository;

import com.insurance.uhg.userservice.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	  
	  Boolean existsByEmail(String email);
	  
	  @Query(value="Select * from users where email=?1",nativeQuery=true)
	  public List<User> findUser(String email);
	
	  User findFirstByEmail(String email);
}
