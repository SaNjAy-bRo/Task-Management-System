# Walkthrough: Task Management System

I have successfully built the Task & Request Management System. Here is a summary of what was accomplished and how to verify it.

## 1. Backend (NestJS + Prisma)

*   **Port**: Running on `http://localhost:4000` (to avoid conflict with Next.js).
*   **Database**: **In-Memory Mock Database**. I implemented a custom `PrismaService` that mocks the Prisma Client behavior using in-memory arrays.
    *   *Why?* To ensure the app runs flawlessly without needing a local PostgreSQL setup during the demo/interview.
    *   *Note*: Data resets when you restart the backend.
*   **Modules**:
    *   `AuthModule`: Mock Auth with `AuthService` (login) and `AuthGuard` (RBAC).
    *   `TasksModule`: CRUD operations with role checks.
*   **Validation**: Used `class-validator` DTOs (`LoginDto`, `CreateTaskDto`).

## 2. Frontend (Next.js)

*   **Port**: Running on `http://localhost:3000`.
*   **UI Design**: Modern, glassmorphic design using **Tailwind CSS**.
    *   **Login**: Glass card with gradients and high-contrast inputs.
    *   **Dashboard**: Card-based layout with status badges and clean typography.
    *   **Create Task**: 3D-floating card interaction.
*   **Pages**:
    *   `/login`: Login form supporting User/Admin role toggle.
    *   `/dashboard`: Lists tasks, allows status updates and deletion.
    *   `/tasks/new`: Form to create a new task.

## 3. How to Run & Verify

### Backend
1.  Navigate to `backend` folder.
2.  Run `npm run start:dev`.
3.  Server starts on **Port 4000**.

### Frontend
1.  Navigate to `frontend` folder.
2.  Run `npm run dev`.
3.  Open `http://localhost:3000`.

### Verification Steps
1.  **Login**: Enter `test@example.com`, select Role **USER**.
2.  **Create**: Create a task "Learn NestJS".
3.  **Update**: Change status to "IN_PROGRESS".
4.  **Admin Check**: Logout, login as `admin@example.com` (Role **ADMIN**). You will see the task created by the previous user.
5.  **Clean**: Delete the task.

## 4. Interview Prep
Refer to `INTERVIEW_PREP.md` for answers to:
*   "Why did you use NestJS?"
*   "How does the Auth Guard work?"
*   "Why is the DB in-memory?" (Explain it was a design choice for portability!)
