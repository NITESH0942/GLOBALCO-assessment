package com.jobboard.service;

import com.jobboard.dto.ApplicationRequest;
import com.jobboard.dto.ApplicationResponse;
import com.jobboard.model.Application;
import com.jobboard.model.Job;
import com.jobboard.model.User;
import com.jobboard.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    private final JobService jobService;
    
    public ApplicationService(ApplicationRepository applicationRepository, JobService jobService) {
        this.applicationRepository = applicationRepository;
        this.jobService = jobService;
    }
    
    /**
     * Creates a new application for a job, linked to the authenticated user.
     * 
     * BEHAVIOR DECISION: We allow duplicate applications from the same email for the same job.
     * Rationale: A candidate may want to update their application or re-apply after improving 
     * their resume. Blocking duplicates could frustrate users who don't remember they already applied.
     */
    @Transactional
    public ApplicationResponse createApplication(ApplicationRequest request, User user) {
        Job job = jobService.getJobEntityById(request.getJobId());
        
        Application application = new Application();
        application.setJob(job);
        application.setUser(user);
        application.setName(request.getName());
        application.setEmail(request.getEmail());
        application.setPhone(request.getPhone());
        application.setResumeLink(request.getResumeLink());
        application.setCoverNote(request.getCoverNote());
        
        Application saved = applicationRepository.save(application);
        
        // Increment the job's application count
        job.incrementApplicationsCount();
        
        return toResponse(saved);
    }
    
    public List<ApplicationResponse> getUserApplications(User user) {
        return applicationRepository.findByUserOrderByAppliedAtDesc(user)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }
    
    private ApplicationResponse toResponse(Application app) {
        ApplicationResponse response = new ApplicationResponse();
        response.setId(app.getId());
        response.setName(app.getName());
        response.setEmail(app.getEmail());
        response.setPhone(app.getPhone());
        response.setResumeLink(app.getResumeLink());
        response.setCoverNote(app.getCoverNote());
        response.setJobId(app.getJob().getId());
        response.setJobTitle(app.getJob().getTitle());
        response.setJobCompany(app.getJob().getCompany());
        response.setJobLocation(app.getJob().getLocation());
        response.setAppliedAt(app.getAppliedAt());
        return response;
    }
}
