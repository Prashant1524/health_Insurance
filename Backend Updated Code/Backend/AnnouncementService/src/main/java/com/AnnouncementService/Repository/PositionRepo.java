package com.AnnouncementService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AnnouncementService.Entity.Position;

public interface PositionRepo extends JpaRepository<Position, Long>{
}
