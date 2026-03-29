# Ethics Form Application

A multi-step form wizard for submitting research ethics applications. Built with React, TypeScript, and Vite, with an ASP.NET Core Web API backend that persists submissions to SQL Server via Entity Framework Core.

## Overview

This application guides applicants through a four-step form to submit a research ethics application. Each step is validated independently before proceeding, and progress is auto-saved to `localStorage` so users can resume where they left off.

### Form Steps

| Step | Title | Description |
|------|-------|-------------|
| 1 | Applicant Info | Name, email, department, and supervisor |
| 2 | Ethics & Risk | Ethics category (human / animal / environmental), risk level (1–5), and funding details |
| 3 | Research Details | Project title, description, start/end dates, and participant count |
| 4 | Declaration | Agreement to terms and data policy, plus digital signature |

## Features

- **Step-by-step wizard** with a clickable progress bar for non-linear navigation
- **Per-step validation** using [Zod](https://zod.dev) schemas via `react-hook-form`
- **Auto-save** — form state is periodically written to `localStorage`; on next visit the user is prompted to restore their progress
- **Global form state** managed with React Context and `useReducer`
- **Submission summary** displayed on successful completion
- **REST API backend** — submitted data is posted to an ASP.NET Core Web API and saved to SQL Server

## Tech Stack

### Frontend
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) — dev server and bundler
- [react-hook-form](https://react-hook-form.com) — form state and submission handling
- [Zod](https://zod.dev) — schema-based validation
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) — Zod adapter for react-hook-form

### Backend
- [ASP.NET Core 8](https://learn.microsoft.com/aspnet/core) — Web API
- [Entity Framework Core 8](https://learn.microsoft.com/ef/core) — ORM
- [SQL Server / LocalDB](https://learn.microsoft.com/sql/database-engine/configure-windows/sql-server-express-localdb) — database

## Project Structure

```
multi-step-react-form/
├── src/
│   ├── api/
│   │   └── submitApplication.ts  # fetch wrapper — POSTs form data to the API
│   ├── components/
│   │   ├── FormWizard.tsx         # Wizard shell, progress bar, auto-save restore
│   │   ├── StepApplicant.tsx      # Step 1 — applicant information
│   │   ├── StepEthicsCategory.tsx # Step 2 — ethics category & risk
│   │   ├── StepResearchDetails.tsx# Step 3 — project details
│   │   └── StepDeclaration.tsx    # Step 4 — declaration & signature
│   ├── context/
│   │   └── FormContext.tsx        # Global state (Context + useReducer)
│   ├── hooks/
│   │   └── useAutoSave.ts         # localStorage auto-save logic
│   └── schemas/
│       └── ethicsForm.ts          # Zod schemas and TypeScript types
└── backend/
    └── EthicsFormApi/
        ├── Controllers/
        │   └── EthicsApplicationsController.cs  # POST /api/ethicsapplications
        ├── Data/
        │   └── AppDbContext.cs    # EF Core DbContext
        ├── Models/
        │   └── EthicsApplication.cs  # EF entity / table model
        ├── Migrations/            # EF Core migration files
        ├── appsettings.json       # Connection string configuration
        └── Program.cs             # Service registration (EF Core, CORS)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- SQL Server LocalDB (ships with Visual Studio) — run `sqllocaldb info` to verify.
---

## Backend Setup (first time only)

### 1. Install the EF Core CLI tool

```bash
dotnet tool install --global dotnet-ef
```

### 2. Create and seed the database

```bash
cd backend/EthicsFormApi
dotnet ef database update
```

This creates the `EthicsFormDb` database and the `EthicsApplications` table in LocalDB.

---

## Running the Application

Both the backend API and the frontend dev server must be running at the same time.

### Terminal 1 — Backend API

```bash
cd backend/EthicsFormApi
dotnet run
```

Note the port reported (e.g. `Now listening on: http://localhost:5240`).
If it differs from `5240`, update `API_URL` in `src/api/submitApplication.ts`.

### Terminal 2 — Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Frontend-only Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and compile a production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
