package com.jobboard.config;

import com.jobboard.model.*;
import com.jobboard.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    
    private final JobRepository jobRepository;
    
    public DataSeeder(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }
    
    @Override
    public void run(String... args) {
        if (jobRepository.count() == 0) {
            seedJobs();
        }
    }
    
    private void seedJobs() {
        List<Job> jobs = Arrays.asList(
            createJob("Senior Frontend Engineer", "TechCorp Solutions", "Bangalore", WorkType.HYBRID, 
                RoleType.FULL_TIME, ExperienceLevel.SENIOR, "₹25L - ₹35L",
                "We're looking for a Senior Frontend Engineer to lead our React-based web application development. You'll work with a talented team to build scalable, user-friendly interfaces for our enterprise clients.",
                Arrays.asList("5+ years React experience", "TypeScript proficiency", "State management (Redux/Zustand)", "Testing frameworks (Jest, React Testing Library)", "CI/CD pipelines"),
                LocalDateTime.now().minusDays(2)),
            
            createJob("Backend Developer", "DataFlow Inc", "Mumbai", WorkType.ONSITE,
                RoleType.FULL_TIME, ExperienceLevel.MID, "₹18L - ₹24L",
                "Join our backend team to design and implement RESTful APIs and microservices. You'll work with Java Spring Boot and PostgreSQL to build robust, scalable systems.",
                Arrays.asList("3+ years Java experience", "Spring Boot expertise", "SQL database knowledge", "API design principles", "Microservices architecture"),
                LocalDateTime.now().minusDays(5)),
            
            createJob("Full Stack Developer", "StartupHub", "Remote", WorkType.REMOTE,
                RoleType.FULL_TIME, ExperienceLevel.MID, "₹15L - ₹22L",
                "We're a fast-growing startup seeking a versatile Full Stack Developer who can work across the entire stack. You'll have ownership of features from design to deployment.",
                Arrays.asList("React and Node.js", "MongoDB or PostgreSQL", "Git version control", "Agile methodology", "Problem-solving mindset"),
                LocalDateTime.now().minusDays(1)),
            
            createJob("DevOps Engineer", "CloudNine Systems", "Hyderabad", WorkType.HYBRID,
                RoleType.FULL_TIME, ExperienceLevel.SENIOR, "₹28L - ₹38L",
                "Lead our DevOps initiatives to automate deployment pipelines, manage cloud infrastructure on AWS, and ensure high availability of our production systems.",
                Arrays.asList("AWS/Azure/GCP experience", "Docker and Kubernetes", "CI/CD tools (Jenkins, GitLab CI)", "Infrastructure as Code (Terraform)", "Monitoring and logging"),
                LocalDateTime.now().minusDays(7)),
            
            createJob("Junior React Developer", "WebWorks Agency", "Pune", WorkType.ONSITE,
                RoleType.FULL_TIME, ExperienceLevel.ENTRY, "₹6L - ₹9L",
                "Great opportunity for fresh graduates! Join our web development team to build modern, responsive websites using React. Mentorship and training provided.",
                Arrays.asList("React fundamentals", "HTML/CSS/JavaScript", "Basic understanding of REST APIs", "Eagerness to learn", "Good communication skills"),
                LocalDateTime.now().minusDays(3)),
            
            createJob("Data Scientist", "AnalyticsPro", "Bangalore", WorkType.REMOTE,
                RoleType.FULL_TIME, ExperienceLevel.MID, "₹20L - ₹28L",
                "Apply machine learning and statistical analysis to solve business problems. Work with large datasets to extract insights and build predictive models.",
                Arrays.asList("Python and R programming", "Machine learning frameworks", "SQL and data manipulation", "Statistical analysis", "Data visualization"),
                LocalDateTime.now().minusDays(10)),
            
            createJob("Mobile App Developer", "AppMakers Co", "Chennai", WorkType.HYBRID,
                RoleType.FULL_TIME, ExperienceLevel.MID, "₹16L - ₹22L",
                "Build cross-platform mobile applications using React Native. Collaborate with designers and backend developers to deliver polished, performant apps.",
                Arrays.asList("React Native experience", "iOS and Android deployment", "State management", "API integration", "App Store/Play Store publishing"),
                LocalDateTime.now().minusDays(4)),
            
            createJob("Product Manager", "InnovateTech", "Delhi", WorkType.ONSITE,
                RoleType.FULL_TIME, ExperienceLevel.SENIOR, "₹30L - ₹40L",
                "Drive product strategy and roadmap for our SaaS platform. Work closely with engineering, design, and business teams to deliver customer value.",
                Arrays.asList("5+ years product management", "SaaS experience", "Data-driven decision making", "Stakeholder management", "Agile/Scrum methodology"),
                LocalDateTime.now().minusDays(6)),
            
            createJob("UI/UX Designer", "DesignStudio", "Remote", WorkType.REMOTE,
                RoleType.CONTRACT, ExperienceLevel.MID, "₹12L - ₹18L",
                "Create beautiful, intuitive user interfaces for web and mobile applications. Conduct user research and translate findings into compelling designs.",
                Arrays.asList("Figma/Sketch proficiency", "User research skills", "Prototyping and wireframing", "Design systems", "Portfolio required"),
                LocalDateTime.now().minusDays(8)),
            
            createJob("QA Automation Engineer", "QualityFirst", "Kolkata", WorkType.HYBRID,
                RoleType.FULL_TIME, ExperienceLevel.MID, "₹14L - ₹20L",
                "Design and implement automated testing frameworks to ensure software quality. Work with development teams to integrate testing into CI/CD pipelines.",
                Arrays.asList("Selenium/Cypress experience", "API testing (Postman, REST Assured)", "Java or Python scripting", "Test planning and strategy", "Bug tracking tools"),
                LocalDateTime.now().minusDays(12)),
            
            createJob("Tech Lead", "EnterpriseSoft", "Bangalore", WorkType.ONSITE,
                RoleType.FULL_TIME, ExperienceLevel.LEAD, "₹40L - ₹50L",
                "Lead a team of 8-10 engineers building enterprise software. Provide technical guidance, code reviews, and architectural decisions while staying hands-on with code.",
                Arrays.asList("8+ years development experience", "Team leadership", "System design expertise", "Mentoring skills", "Agile project management"),
                LocalDateTime.now().minusDays(15)),
            
            createJob("Python Developer", "AI Solutions Ltd", "Remote", WorkType.REMOTE,
                RoleType.CONTRACT, ExperienceLevel.SENIOR, "₹22L - ₹30L",
                "Build AI-powered applications using Python. Work on NLP, computer vision, or recommendation systems for our global clients.",
                Arrays.asList("Python expertise", "Django/Flask", "Machine learning libraries", "API development", "Cloud deployment"),
                LocalDateTime.now().minusDays(9)),
            
            createJob("Database Administrator", "DataSecure", "Mumbai", WorkType.ONSITE,
                RoleType.FULL_TIME, ExperienceLevel.SENIOR, "₹24L - ₹32L",
                "Manage and optimize PostgreSQL and MySQL databases for high-traffic applications. Ensure data security, backup, and disaster recovery.",
                Arrays.asList("PostgreSQL/MySQL expertise", "Performance tuning", "Backup and recovery", "Security best practices", "High availability setup"),
                LocalDateTime.now().minusDays(11)),
            
            createJob("Frontend Intern", "LearnCode Labs", "Pune", WorkType.HYBRID,
                RoleType.INTERNSHIP, ExperienceLevel.ENTRY, "₹15K - ₹25K per month",
                "6-month internship to learn modern frontend development. Work on real projects with mentorship from senior developers. Potential for full-time conversion.",
                Arrays.asList("HTML/CSS/JavaScript basics", "React knowledge (preferred)", "Willingness to learn", "College student/recent grad", "Portfolio/projects (optional)"),
                LocalDateTime.now().minusDays(2)),
            
            createJob("Site Reliability Engineer", "ScaleUp Tech", "Hyderabad", WorkType.REMOTE,
                RoleType.FULL_TIME, ExperienceLevel.SENIOR, "₹32L - ₹42L",
                "Ensure reliability and performance of our distributed systems. Implement monitoring, alerting, and automation to maintain 99.9% uptime.",
                Arrays.asList("Linux administration", "Monitoring tools (Prometheus, Grafana)", "Incident response", "Automation scripting", "Cloud platforms"),
                LocalDateTime.now().minusDays(13)),
            
            createJob("Part-time Content Writer", "TechBlog Media", "Remote", WorkType.REMOTE,
                RoleType.PART_TIME, ExperienceLevel.ENTRY, "₹20K - ₹35K per month",
                "Write technical articles, tutorials, and documentation for our tech blog. Flexible hours, work from anywhere.",
                Arrays.asList("Technical writing skills", "Programming knowledge", "SEO basics", "Research abilities", "Portfolio of writing samples"),
                LocalDateTime.now().minusDays(5)),
            
            createJob("Blockchain Developer", "Web3 Innovations", "Bangalore", WorkType.HYBRID,
                RoleType.FULL_TIME, ExperienceLevel.MID, "₹26L - ₹36L",
                "Build decentralized applications and smart contracts on Ethereum and Solana. Be part of the Web3 revolution.",
                Arrays.asList("Solidity programming", "Smart contract development", "Web3.js/Ethers.js", "DeFi protocols", "Security best practices"),
                LocalDateTime.now().minusDays(14)),
            
            createJob("Security Engineer", "CyberShield", "Delhi", WorkType.ONSITE,
                RoleType.FULL_TIME, ExperienceLevel.SENIOR, "₹28L - ₹38L",
                "Protect our systems and data from cyber threats. Conduct security audits, penetration testing, and implement security best practices.",
                Arrays.asList("Security certifications (CEH, CISSP)", "Penetration testing", "Vulnerability assessment", "Security tools", "Incident response"),
                LocalDateTime.now().minusDays(16))
        );
        
        jobRepository.saveAll(jobs);
        System.out.println("Seeded " + jobs.size() + " sample jobs");
    }
    
    private Job createJob(String title, String company, String location, WorkType workType,
                         RoleType roleType, ExperienceLevel experienceLevel, String salaryRange,
                         String description, List<String> requirements, LocalDateTime postedAt) {
        Job job = new Job();
        job.setTitle(title);
        job.setCompany(company);
        job.setLocation(location);
        job.setWorkType(workType);
        job.setRoleType(roleType);
        job.setExperienceLevel(experienceLevel);
        job.setSalaryRange(salaryRange);
        job.setDescription(description);
        job.setRequirements(requirements);
        job.setPostedAt(postedAt);
        return job;
    }
}
