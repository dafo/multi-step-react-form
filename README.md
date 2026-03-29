# Ethics Form Application

A multi-step form wizard for submitting research ethics applications. Built with React, TypeScript, and Vite.

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

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) — dev server and bundler
- [react-hook-form](https://react-hook-form.com) — form state and submission handling
- [Zod](https://zod.dev) — schema-based validation
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) — Zod adapter for react-hook-form

## Project Structure

```
src/
├── components/
│   ├── FormWizard.tsx        # Wizard shell, progress bar, auto-save restore
│   ├── StepApplicant.tsx     # Step 1 — applicant information
│   ├── StepEthicsCategory.tsx# Step 2 — ethics category & risk
│   ├── StepResearchDetails.tsx# Step 3 — project details
│   └── StepDeclaration.tsx   # Step 4 — declaration & signature
├── context/
│   └── FormContext.tsx       # Global state (Context + useReducer)
├── hooks/
│   └── useAutoSave.ts        # localStorage auto-save logic
└── schemas/
    └── ethicsForm.ts         # Zod schemas and TypeScript types
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- npm (bundled with Node.js)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and compile a production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
