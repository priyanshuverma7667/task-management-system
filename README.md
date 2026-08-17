# Task Management System

## Overview
A full stack task management app (board + list views, guest login, theming) built for the Full Stack Developer assessment.

## Tech Stack
- Backend: NestJS (TypeScript) — chosen for its structured, modular architecture (controllers/services/modules) which scales well and is easy to explain/maintain
- Database: SQLite — chosen for zero-config local development; no external DB server needed, works out of the box for this assessment
- ORM: TypeORM (with better-sqlite3 driver) — chosen over Prisma since Prisma's engine binary download had connectivity issues in dev environment; better-sqlite3 is synchronous and fast
- Frontend: (coming soon)

## Live Demo
- App: (coming soon)
- API: (coming soon)

## Setup (Local)
### Backend
```bash
cd backend
npm install
npm run start:dev
```
The server runs on `http://localhost:3000` by default. A local `database.sqlite` file is created automatically on first run.

### Frontend
(coming soon)

## API Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /tasks | No (yet) | Returns all tasks |
| POST | /tasks | No (yet) | Creates a new task (validates title is required) |
| POST | /auth/guest | No | Creates a guest user and returns a JWT token |
| GET | /tasks | Yes | Returns all tasks |
| GET | /tasks/:id | Yes | Returns a single task, 404 if not found |
| POST | /tasks | Yes | Creates a new task (validates title) |
| PATCH | /tasks/:id | Yes | Updates a task, 404 if not found |
| DELETE | /tasks/:id | Yes | Deletes a task, 404 if not found |

| GET | /tasks | Yes (own tasks only) | Returns all tasks belonging to the logged-in user |

## Deviations from Figma Design
- Guest sessions are isolated per-login: each "Continue as Guest" click creates a brand-new guest account with its own task list, rather than persisting one guest identity across visits. This was a simplification appropriate for an assessment project.

## Part 2 — AbleSpace Walkthrough
(link to doc/video — coming soon)
