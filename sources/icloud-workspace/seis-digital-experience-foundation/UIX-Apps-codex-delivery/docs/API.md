# Emirhan Kudun  API ReferencePortfolio

## Base URL
```
http://localhost:4173
```

## Health Check

### GET /health
Server health status

**Response:**
```json
{
  "status": "operational",
  "uptime": 3600,
  "timestamp": "2026-05-18T22:05:48.570+03:00"
}
```

---

## Contact Submissions

### POST /api/contact
Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Portfolio Inquiry",
  "message": "Your work is great...",
  "phone": "+90 555 123 4567"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "submissionId": "sub_abc123def456",
  "timestamp": "2026-05-18T22:05:48.570+03:00"
}
```

**Response (429 Too Many Requests):**
```json
{
  "error": "Rate limit exceeded. Try again later.",
  "retryAfter": 600
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid input. Name, email, subject, and message are required."
}
```

---

## Portfolio Items

### GET /api/projects
List all portfolio projects

**Response:**
```json
{
  "projects": [
    {
      "id": "proj_001",
      "title": "Project Name",
      "description": "Short description",
      "thumbnail": "/images/project1.jpg",
      "technologies": ["React", "Node.js", "PostgreSQL"],
      "link": "https://project.example.com",
      "caseStudy": "/case-studies/project1"
    }
  ]
}
```

### GET /api/projects/:id
Get single project details

---

## Skills

### GET /api/skills
List all skills with proficiency levels

**Response:**
```json
{
  "skills": [
    {
      "category": "Frontend",
      "items": [
        {"name": "React", "level": 95},
        {"name": "TypeScript", "level": 90},
        {"name": "CSS/SASS", "level": 92}
      ]
    },
    {
      "category": "Backend",
      "items": [
        {"name": "Node.js", "level": 88},
        {"name": "PostgreSQL", "level": 85}
      ]
    }
  ]
}
```

---

## Content

### GET /index.html
Main portfolio page (HTML)

### GET /style.css
Global styles

### GET /script.js
Frontend JavaScript

### GET /manifest.json
PWA manifest

### GET /robots.txt
Search engine robots configuration

### GET /sitemap.xml
XML sitemap for SEO

---

## Static Assets

### GET /assets/*
Public asset files (any file in `/assets` directory)

### GET /images/*
Image files (any file in `/images` directory)

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "timestamp": "2026-05-18T22:05:48.570+03:00"
}
```

### Common Status Codes
- `200  Request successfulOK`
- `400 Bad  Invalid inputRequest`
- `404 Not  Resource not foundFound`
- `429 Too Many  Rate limit exceededRequests`
- `500 Internal Server  Server errorError`

---

## Rate Limiting

- **General endpoints**: 100 requests per 10 minutes
- **Contact form**: 8 submissions per 10 minutes per IP

Rate limit info included in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

---

## CORS Policy

Requests from the following origins are allowed:
- `http://localhost:3000`
- `http://localhost:4173`
- `https://emirhankudun.com`

---

## Content-Type

All responses are JSON-formatted with:
```
Content-Type: application/json; charset=utf-8
```

---

## Authentication

This portfolio API does not require authentication for public endpoints.
Admin endpoints (if implemented) will require JWT tokens.

---

**Last Updated:** 2026-05-18
**Version:** 1.0.0
