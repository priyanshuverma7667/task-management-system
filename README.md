# Task Management System

## Overview
A full stack task management app (board + list views, guest login, theming) built for the Full Stack Developer assessment.

## Tech Stack
- Backend: NestJS (TypeScript) — chosen for its structured, modular architecture (controllers/services/modules) which scales well and is easy to explain/maintain
- Database: SQLite — chosen for zero-config local development; no external DB server needed, works out of the box for this assessment
- ORM: TypeORM (with better-sqlite3 driver) — chosen over Prisma since Prisma's engine binary download had connectivity issues in dev environment; better-sqlite3 is synchronous and fast
- Frontend: Next.js (App Router) with Tailwind CSS v4 — chosen per assignment tech stack preference
- Theming: implemented via CSS custom properties (variables) switched using `data-theme` and `data-accent` attributes on the `<html>` element, controlled by an inline script in the root layout to prevent flash-of-wrong-theme on load. Preferences persist via `localStorage`.


- Backend runs on port 3001, frontend on port 3000 (standard Next.js default) — configured via `.env` files on each side
- CORS explicitly configured on the backend to allow requests from the frontend's origin

## Live Demo
- App: (coming soon)
- API: (coming soon)

## Setup (Local)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
### Backend
```bash
cd backend
npm install
npm run start:dev
```
The server runs on `http://localhost:3000` by default. A local `database.sqlite` file is created automatically on first run.

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
- Guest sessions are isolated per-login: each "Continue as Guest" click creates a brand-new guest account with its own task list, rather than persisting one guest identity across visits.
- Figma frames are desktop-only (1280px); mobile/tablet layouts were adapted by me: sidebar collapses into a slide-in drawer below 768px (triggered by a hamburger menu), and the top bar's search/Fields/Add Task controls compress to icon-only versions on narrow screens rather than disappearing, keeping all functionality accessible at every size.


## Component Library
- `Button` — primary (filled) and secondary (outlined) variants
- `Input` — labeled text input with theme-aware focus ring
- `Card` — bordered container surface
All components use CSS variables for theming, requiring no dark-mode-specific logic.

## Part 2 — AbleSpace Walkthrough
(link to doc/video — coming soon)


## Live Demo
- App: https://task-management-system-je6itha18-smart-task-management.vercel.app
- API: https://task-management-system-wusa.onrender.com

## Deployment Notes
- Backend deployed on Render (free tier) — note: free tier spins down after inactivity, first request after idle may take ~50 seconds to respond
- Frontend deployed on Vercel
- CORS configured to allow both localhost (dev) and the deployed frontend origin