package com.jobboard.dto;

import com.jobboard.model.ExperienceLevel;
import com.jobboard.model.RoleType;
import com.jobboard.model.WorkType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class JobRequest {
    
    @NotBlank(message = "Job title is required")
    @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
    private String title;
    
    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 characters")
    private String company;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotNull(message = "Work type is required")
    private WorkType workType;
    
    @NotNull(message = "Role type is required")
    private RoleType roleType;
    
    @NotNull(message = "Experience level is required")
    private ExperienceLevel experienceLevel;
    
    @Size(max = 100, message = "Salary range must be less than 100 characters")
    private String salaryRange;
    
    @NotBlank(message = "Description is required")
    @Size(min = 50, message = "Description must be at least 50 characters")
    private String description;
    
    private List<@NotBlank(message = "Requirement cannot be blank") String> requirements;
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public WorkType getWorkType() { return workType; }
    public void setWorkType(WorkType workType) { this.workType = workType; }
    
    public RoleType getRoleType() { return roleType; }
    public void setRoleType(RoleType roleType) { this.roleType = roleType; }
    
    public ExperienceLevel getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(ExperienceLevel experienceLevel) { this.experienceLevel = experienceLevel; }
    
    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<String> getRequirements() { return requirements; }
    public void setRequirements(List<String> requirements) { this.requirements = requirements; }
}
