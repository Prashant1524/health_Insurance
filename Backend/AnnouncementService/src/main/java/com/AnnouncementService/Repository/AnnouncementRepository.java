package com.AnnouncementService.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.AnnouncementService.Entity.AnnouncementEntity;

@Repository
public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer> {

//	AnnouncementEntity findByStartTimeBeforeAndEndTimeAfter(LocalDateTime currentTime, LocalDateTime currentTimePlusExpirationTime);
	
//	@Query("SELECT a FROM announcements a WHERE a.end_time< :currentDateTime")
//	List<AnnouncementEntity> findExpiredAnnouncemnets(@Param("currentDateTime")LocalDateTime curreDateTime);
	
	List<AnnouncementEntity> findByEndTimeBefore(LocalDateTime endTime);
}
