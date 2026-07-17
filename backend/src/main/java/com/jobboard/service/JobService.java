package com.jobboard.service;

import com.jobboard.dto.JobRequest;
import com.jobboard.dto.JobResponse;
import com.jobboard.model.ExperienceLevel;
import com.jobboard.model.Job;
import com.jobboard.model.RoleType;
import com.jobboard.model.WorkType;
import com.jobboard.repository.JobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JobService {
    
    private final JobRepository jobRepository;
    
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }
    
    public Page<JobResponse> getJobs(String search, String location, WorkType workType,
                                      RoleType roleType, ExperienceLevel experienceLevel,
                                      Pageable pageable) {
        return jobRepository.findWithFilters(
            search, location, workType, roleType, experienceLevel, pageable
        ).map(this::toResponse);
    }
    
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));
        return toResponse(job);
    }
    
    public JobResponse createJob(JobRequest request) {
        Job job = new Job();
        updateJobFromRequest(job, request);
        Job saved = jobRepository.save(job);
        return toResponse(saved);
    }
    
    public Job getJobEntityById(Long id) {
        return jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));
    }
    
    private void updateJobFromRequest(Job job, JobRequest request) {
        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setWorkType(request.getWorkType());
        job.setRoleType(request.getRoleType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setSalaryRange(request.getSalaryRange());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements() != null ? request.getRequirements() : new ArrayList<>());
    }
    
    private JobResponse toResponse(Job job) {
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setCompany(job.getCompany());
        response.setLocation(job.getLocation());
        response.setWorkType(job.getWorkType());
        response.setRoleType(job.getRoleType());
        response.setExperienceLevel(job.getExperienceLevel());
        response.setSalaryRange(job.getSalaryRange());
        response.setDescription(job.getDescription());
        response.setRequirements(job.getRequirements());
        response.setPostedAt(job.getPostedAt());
        response.setApplicationsCount(job.getApplicationsCount());
        return response;
    }
}
