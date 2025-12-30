# Interview Preparation Guide: Task Management System

## 1. The "60-Second Pitch"
"I built an internal Task & Request Management System designed for scalability and clean architecture. 
On the **Backend**, I used **NestJS** to enforce modularity and separation of concerns, employing **Services** for business logic, **Controllers** for routing, and **DTOs** with `class-validator` for robust input validation. I chose **Prisma** as the ORM with **PostgreSQL** for its type-safety and modern developer experience.
For the **Frontend**, I used **Next.js (App Router)** to leverage server-side rendering for the dashboard performance, while treating interactive forms as Client Components.
I also implemented a custom **Role-Based Access Control (RBAC)** system using NestJS Guards and Decorators to secure Admin-only endpoints. The entire stack is fully typed with TypeScript to prevent runtime errors."

## 2. Key Architecture Defenses

### Why NestJS over Express?
"Express is unopinionated, which leads to 'spaghetti code' in large teams. NestJS provides a rigid, Angular-like structure (Modules, Services, Controllers) that forces separation of concerns, making the app testable and maintainable as it scales."

### Why Prisma over TypeORM?
"TypeORM is powerful but older and relies heavily on decorators that can be tricky with complex relations. Prisma generates a type-safe client based on my schema, meaning if I change my DB structure, my code won't compile until I fix it. This prevents an entire class of runtime bugs."

### Why Logic in Services?
"Controllers should only handle HTTP concerns (requests/responses). Business logic (like 'who owns this task?') lives in Services so it can be re-used, tested independently of the API, or even called by cron jobs/CLI tools later without mocking HTTP requests."

## 3. Tough Interview Questions

**Q: How did you handle Authentication?**
**A:** "For this demo, I implemented a 'Mock Auth' strategy using a custom Authorization Guard. The frontend sends a token that encodes the user ID and Role. The Guard parses this, validates the format, and mimics a JWT verification process. In a production scenario, I would replace the mock token logic with `@nestjs/jwt` and `passport-jwt` strategies, but the *guard structure* would remain exactly the same."

**Q: Explain SSR vs CSR in your Dashboard.**
**A:** "The Dashboard page uses `useEffect` currently (Client-Side Rendering) because we are relying on local storage for auth tokens. However, in a production Next.js app, I would move the token to an HTTP-only cookie. This would allow me to fetch data *on the server* (in the Page component) before sending HTML to the browser, improving SEO and initial load performance."

**Q: How do you prevent a User from deleting an Admin's task?**
**A:** "In the `TasksService`, specifically the `remove` method, I don't just delete by ID. I first check if the task exists. Then, I check the user's role. If they are an ADMIN, they can delete anything. If they are a USER, I strictly check if `task.userId === currentUser.id`. If not, I throw a `ForbiddenException`. The UI also hides the button, but the API is the real source of truth."

## 4. Common Weak Points (Don't Fail Here!)
*   **Environment Variables**: Never commit `.env`. Explain that `api.ts` uses `process.env.NEXT_PUBLIC_API_URL` so we can point to Staging/Prod easier.
*   **HTTP Codes**: Don't return 200 for errors. I used 201 for Created, 403 for Forbidden (RBAC), 404 for Not Found.
*   **Validation**: Don't validate in the controller manually. I used `ValidationPipe` globally and DTOs with decorators like `@IsNotEmpty()` so invalid data never even reaches my Service layer.
