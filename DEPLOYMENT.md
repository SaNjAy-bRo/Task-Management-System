# Deployment Guide

Since this project has a separate **Frontend** and **Backend**, we will host them on two different (free) platforms that are best suited for each.

## 1. Hosting the Frontend (Next.js) on Vercel
Vercel is the creators of Next.js, making it the easiest place to deploy.

1.  Push your latest code to GitHub.
2.  Go to [Vercel.com](https://vercel.com) and Sign Up/Log In.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `Task-Management-System` repository.
5.  **Important**: In the configuration screen:
    *   **Root Directory**: Click "Edit" and select `frontend`.
6.  **Environment Variables**:
    *   Open the "Environment Variables" section.
    *   Add `NEXT_PUBLIC_API_URL`.
    *   Value: `https://your-backend-url.onrender.com` (You will get this URL in Step 2, for now you can leave it or update it later).
7.  Click **Deploy**.

## 2. Hosting the Backend (NestJS) on Render
Render is great for Node.js services (like NestJS) that need to keep running.

1.  Go to [Render.com](https://render.com) and Sign Up/Log In.
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub repository.
4.  **Important**: In the configuration settings:
    *   **Root Directory**: `backend`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm run start:prod`
5.  **Environment Variables**:
    *   Key: `PORT` -> Value: `4000` (or whatever Render assigns, usually Render handles `PORT` automatically, but good to set).
    *   *Note*: Since we are using the **In-Memory Mock DB**, you don't need to add `DATABASE_URL`.
6.  Click **Create Web Service**.
7.  Wait for the build to finish. Render will give you a URL like `https://task-management-backend.onrender.com`.

## 3. Connecting Them
1.  Copy your new **Backend URL** from Render.
2.  Go back to your **Vercel Project Settings** -> **Environment Variables**.
3.  Update (or Add) `NEXT_PUBLIC_API_URL` with the Render URL.
4.  Go to **Deployments** on Vercel and **Redeploy** the latest commit so the new variable takes effect.

## ⚠️ Important Note on Data
Because this demo uses an **In-Memory Database**:
*   Every time you Redeploy the backend, **all users and tasks will be deleted**.
*   If Render "spins down" your free server due to inactivity, **data will be reset**.
*   This is acceptable for a portfolio demo/interview, but for a real app, you would connect a PostgreSQL database (Render provides a free Postgres instance too!).
