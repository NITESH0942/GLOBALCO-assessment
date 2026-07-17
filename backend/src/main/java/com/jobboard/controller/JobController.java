package com.jobboard.controller;

import com.jobboard.dto.JobRequest;
import com.jobboard.dto.JobResponse;
import com.jobboard.model.ExperienceLevel;
import com.jobboard.model.RoleType;
import com.jobboard.model.WorkType;
import com.jobboard.service.JobService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    
    private final JobService jobService;
    
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }
    
    @GetMapping
    public ResponseEntity<Page<JobResponse>> getJobs(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) WorkType workType,
            @RequestParam(required = false) RoleType roleType,
            @RequestParam(required = false) ExperienceLevel experienceLevel,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<JobResponse> jobs = jobService.getJobs(search, location, workType, roleType, experienceLevel, pageable);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        try {
            JobResponse job = jobService.getJobById(id);
            return ResponseEntity.ok(job);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest request) {
        JobResponse created = jobService.createJob(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
