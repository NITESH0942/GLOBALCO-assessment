# Job Board - Full Stack Web Application

A modern, responsive job board application built with **React + Vite** (frontend) and **Spring Boot + MySQL** (backend), featuring JWT authentication, job posting, application tracking, and a polished UX.

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite 8, React Router 7, CSS Variables |
| Backend    | Java 17, Spring Boot 3.2, Spring Data JPA       |
| Database   | MySQL                                           |
| Auth       | Spring Security, JWT (jjwt 0.12.3)              |
| Deployment | Vercel (Frontend), GitHub Actions (CI/CD)        |

## Features

### Public (No Auth Required)
- **Browse Jobs** — Paginated job listing with search, location, and filter support
- **Job Details** — Full job description with company info, salary range, requirements, and work/role type tags
- **Filters** — Filter by Work Type (Remote/Onsite/Hybrid), Role Type (Full-time/Part-time/Contract/Internship), Experience Level (Entry/Mid/Senior/Lead)
- **Debounced Search** — 300ms debounced search synced with URL parameters
- **Responsive Design** — Mobile-first design with filter drawer, sticky buttons, skeleton loading

### Authenticated Users
- **Register / Login** — Email + password authentication with JWT tokens (24hr expiry)
- **Post a Job** — Create job listings with title, company, location, work type, role type, experience level, salary range, description, and requirements list
- **Apply to Jobs** — Submit applications with name, email, phone, resume link, and cover note
- **My Applications** — View all jobs you've applied to with job details and application date

### UX Polish
- **Loading Skeletons** — Skeleton cards while data loads
- **Empty States** — Friendly empty states with CTAs
- **Error States** — Retry buttons on failed API calls
- **Toast Notifications** — Success/error/info toasts for all actions
- **Form Validation** — Client-side + server-side validation with field-level error messages
- **Error Boundary** — Global React error boundary with fallback UI
- **Page Titles** — Dynamic document titles per route

## Project Structure

```
GLOBALCO/
├── backend/                          # Spring Boot API
│   ├── pom.xml                       # Maven dependencies
│   └── src/main/java/com/jobboard/
│       ├── JobBoardApplication.java  # Main entry point
│       ├── config/                   # CORS, DataSeeder (18 sample jobs)
│       ├── controller/               # REST controllers (Job, Application, Auth)
│       ├── dto/                      # Request/Response DTOs with Bean Validation
│       ├── exception/                # Global exception handler
│       ├── model/                    # JPA entities (Job, Application, User, enums)
│       ├── repository/               # Spring Data repositories
│       ├── security/                 # JWT util, auth filter, SecurityConfig
│       └── service/                  # Business logic services
├── frontend/                         # React + Vite SPA
│   ├── vite.config.js                # Vite config with API proxy
│   └── src/
│       ├── api/                      # API client functions (jobs, applications, auth)
│       ├── components/               # Reusable UI components with CSS
│       ├── context/                  # AuthContext (JWT state management)
│       ├── hooks/                    # Custom hooks (usePageTitle)
│       ├── pages/                    # Page components (7 pages)
│       └── styles/                   # CSS variables design system
└── .github/workflows/ci-cd.yml      # GitHub Actions CI/CD pipeline
```

## API Endpoints

### Public
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/jobs         | List jobs (with filters, pagination) |
| GET    | /api/jobs/:id     | Get job by ID            |
| POST   | /api/auth/register| Register new user        |
| POST   | /api/auth/login   | Login and get JWT token  |

### Authenticated (requires `Authorization: Bearer <token>`)
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | /api/jobs             | Create a new job listing     |
| POST   | /api/applications     | Apply to a job               |
| GET    | /api/applications/me  | Get current user's applications |

## Running Locally

### Prerequisites
- Java 17+ and Maven
- MySQL 8+
- Node.js 18+

### Backend
```bash
cd backend
# Update MySQL credentials in src/main/resources/application.properties
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (proxied to backend)

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on every push to `main`:

1. **Frontend Build** — Installs dependencies and builds the Vite app
2. **Backend Build** — Compiles the Spring Boot project
3. **Deploy to Vercel** — On successful builds, deploys frontend to Vercel production

### Required GitHub Secrets
| Secret            | Description                          |
|-------------------|--------------------------------------|
| VERCEL_TOKEN      | Vercel API token                     |
| VERCEL_ORG_ID     | Vercel organization/team ID          |
| VERCEL_PROJECT_ID | Vercel project ID                    |

## Screenshots & Pages

- `/` — Browse and search jobs
- `/login` — User login
- `/register` — User registration
- `/jobs/:id` — Job detail page
- `/jobs/:id/apply` — Apply to a job (auth required)
- `/jobs/new` — Post a new job (auth required)
- `/my-applications` — View your applications (auth required)
