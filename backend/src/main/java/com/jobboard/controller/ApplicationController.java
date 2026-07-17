package com.jobboard.controller;

import com.jobboard.dto.ApplicationRequest;
import com.jobboard.dto.ApplicationResponse;
import com.jobboard.model.User;
import com.jobboard.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    
    private final ApplicationService applicationService;
    
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }
    
    @PostMapping
    public ResponseEntity<ApplicationResponse> createApplication(
            @Valid @RequestBody ApplicationRequest request, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            ApplicationResponse created = applicationService.createApplication(request, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<ApplicationResponse> applications = applicationService.getUserApplications(user);
        return ResponseEntity.ok(applications);
    }
}
