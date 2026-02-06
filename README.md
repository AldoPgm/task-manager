# Task Manager

A professional, full-stack Task Management application built with **React**, **TailwindCSS**, **Node.js**, **Express**, and **SQLite**.
Designed to demonstrate modern web development practices including RESTful API design, state management, and responsive UI.

## Features
- **Create, Read, Update, Delete** todos.
- **Filter** by status (All, Active, Completed).
- **Search** functionality.
- **Responsive Design** with TailwindCSS.

## Project Structure
- `client/`: Frontend (Vite + React).
- `server/`: Backend (Express + SQLite).

## Setup & Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs concurrent runner and dependencies for both client and server.

2. **Start Development Server**
   ```bash
   npm start
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`

   The application runs both concurrently.

## Deployment on Vercel

1. Import this repository to Vercel.
2. Vercel should automatically detect the configuration from `vercel.json`.
3. **Note**: Since this uses SQLite, the database is **ephemeral** on Vercel. Data will reset on new deployments or cold starts. For persistent production data, connect to an external database like Turso or Neon.
