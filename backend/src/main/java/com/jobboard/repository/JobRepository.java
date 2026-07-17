package com.jobboard.repository;

import com.jobboard.model.Job;
import com.jobboard.model.WorkType;
import com.jobboard.model.RoleType;
import com.jobboard.model.ExperienceLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    @Query("SELECT j FROM Job j WHERE " +
           "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(j.company) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:workType IS NULL OR j.workType = :workType) AND " +
           "(:roleType IS NULL OR j.roleType = :roleType) AND " +
           "(:experienceLevel IS NULL OR j.experienceLevel = :experienceLevel) " +
           "ORDER BY j.postedAt DESC")
    Page<Job> findWithFilters(
        @Param("search") String search,
        @Param("location") String location,
        @Param("workType") WorkType workType,
        @Param("roleType") RoleType roleType,
        @Param("experienceLevel") ExperienceLevel experienceLevel,
        Pageable pageable
    );
}
