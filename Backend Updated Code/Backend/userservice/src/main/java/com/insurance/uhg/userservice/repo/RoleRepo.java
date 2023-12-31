package com.insurance.uhg.userservice.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.uhg.userservice.model.ERole;
import com.insurance.uhg.userservice.model.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long>{
	 Optional<Role> findByName(ERole name);
}
