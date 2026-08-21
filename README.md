# Task Management System

A full stack task management application built for the Full Stack Developer Assessment — featuring guest login, a Kanban board, list view, task and project management, and a full light/dark + accent-color theming system.

## Live Demo
- **App:** https://task-management-system-two-hazel.vercel.app
- **API:** https://task-management-system-wusa.onrender.com

> Note: The backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take up to 50 seconds to respond — this is expected, not a bug.

## Tech Stack
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Backend:** NestJS + TypeScript
- **Database:** SQLite (via TypeORM, `better-sqlite3` driver) — chosen for zero-config local development with no external database server required
- **Auth:** Guest login via JWT (JSON Web Tokens), using Passport's JWT strategy
- **Deployment:** Frontend on Vercel, Backend on Render

## Features
- Guest login (no password required) — each session is isolated per user
- Task board (Kanban view) and list view with a toggle between them
- Task creation with labels/tags
- Task detail page — view, edit, and delete tasks
- Projects — create, view, and delete projects
- Full light/dark mode with 6 selectable accent colors (Amber, Blue, Pink, Rose, Emerald, Black), persisted across sessions
- Fully responsive layout — collapsible mobile sidebar drawer, adaptive top bar, responsive board grid

## Setup (Local Development)

### Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```
PORT=3001
JWT_SECRET=your-random-secret-string-here
```
Then run:
```bash
npm run start:dev
```
The backend runs on `http://localhost:3001`. A local `database.sqlite` file is created automatically on first run.

### Frontend
```bash
cd frontend
npm install
```
Create a `.env.local` file in `frontend/`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Then run:
```bash
npm run dev
```
The frontend runs on `http://localhost:3000`.

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /auth/guest | No | Creates a guest user and returns a JWT token |
| GET | /tasks | Yes | Returns all tasks belonging to the logged-in user |
| GET | /tasks/:id | Yes | Returns a single task (404 if not found, 403 if not owned by requester) |
| POST | /tasks | Yes | Creates a new task (validates required title) |
| PATCH | /tasks/:id | Yes | Updates a task |
| DELETE | /tasks/:id | Yes | Deletes a task |
| GET | /projects | Yes | Returns all projects belonging to the logged-in user |
| GET | /projects/:id | Yes | Returns a single project |
| POST | /projects | Yes | Creates a new project |
| PATCH | /projects/:id | Yes | Updates a project |
| DELETE | /projects/:id | Yes | Deletes a project |

All `/tasks` and `/projects` routes require a valid JWT in the `Authorization: Bearer <token>` header, obtained from `/auth/guest`. Every user only has access to their own data — verified with isolated multi-guest testing during development.

## Deviations from Figma Design

- **Guest sessions are isolated per login:** each "Continue as Guest" click creates a brand-new guest account with its own empty task list, rather than persisting one guest identity across visits/browsers. This was a scoping decision appropriate for a guest-only auth flow within this assessment's timeframe.
- **Board status columns simplified:** the board uses 4 core status columns (To Do, Doing, Completed, On Hold) rather than the 7 shown in Figma (which also included Backend, User Feedback, Performance) — those additional columns appeared to be project/team-specific categorization rather than universal task states, so were scoped out.
- **Board layout uses a responsive CSS grid** (1 column on mobile, 2 on tablet, 4 on desktop) instead of horizontal scrolling, since only 4 status columns are used — this keeps all columns visible and reachable without a scroll gesture on any device size. The Figma frames were desktop-only (1280px); this and other mobile/tablet adaptations (collapsible sidebar drawer, compact top bar controls) were designed by me to extend the design responsively.
- **"Login with Google" is present in the UI but not functional** — the assignment required guest login specifically; the Google button is a visual placeholder matching the Figma design.
- **Settings/Profile page was scoped out** due to time constraints, to prioritize core task/project functionality and deployment.
- **Fields dropdown (column visibility toggle) is not yet functional** — present visually in the top bar, not wired to actual column filtering, due to time constraints.
- **Task labels/tags** were added as a custom field (not explicitly itemized in the initial task breakdown) to better match the richer task cards shown in the Figma reference (assignee, due date, and tag chips).

## Project Structure
```
task-management-system/
├── backend/          # NestJS API
│   └── src/
│       ├── auth/     # Guest login, JWT strategy & guard
│       ├── tasks/    # Task entity, DTOs, service, controller
│       ├── projects/ # Project entity, DTOs, service, controller
│       └── users/    # User entity
├── frontend/         # Next.js app
│   ├── app/
│   │   ├── login/           # Guest login page
│   │   └── (app)/           # Shared authenticated layout (sidebar + top bar)
│   │       ├── board/       # Board/list view + task detail
│   │       └── projects/    # Projects list
│   ├── components/  # Reusable UI components (Button, Input, Card, Modal, Sidebar, TopBar)
│   └── lib/          # API client functions
└── README.md
```

## Part 2 — AbleSpace Product Walkthrough

https://docs.google.com/document/d/1u9upLiDR-awLpmcBeFMvPCdtqO8RMN1QJKi_PNgI8dw/edit?usp=sharing
