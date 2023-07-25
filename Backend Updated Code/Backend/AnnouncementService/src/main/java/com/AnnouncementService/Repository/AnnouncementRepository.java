package com.AnnouncementService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.AnnouncementService.Entity.AnnouncementEntity;

@Repository
public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer> {
}
