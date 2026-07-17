package com.jobboard.repository;

import com.jobboard.model.Application;
import com.jobboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    Optional<Application> findByJobIdAndEmail(Long jobId, String email);
    
    boolean existsByJobIdAndEmail(Long jobId, String email);
    
    List<Application> findByUserOrderByAppliedAtDesc(User user);
}
