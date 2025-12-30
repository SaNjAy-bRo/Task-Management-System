# Task & Request Management System

An internal Task Management System built with **NestJS**, **Prisma**, and **Next.js**. 
Designed to demonstrate scalable architecture, modular backend design, and modern frontend patterns for technical interviews.

![TaskFlow Dashboard](https://via.placeholder.com/800x400?text=TaskFlow+Dashboard+Preview)

## 🚀 Features

*   **Role-Based Access Control (RBAC)**: Distinct User and Admin capabilities.
*   **Modern UI**: Glassmorphism, card layouts, and gradients using Tailwind CSS.
*   **Scalable Backend**: NestJS modular architecture with DTO validation and Service layer separation.
*   **In-Memory Database**: Zero-config execution using a custom Prisma mock store (runs entirely in RAM).

## 🛠 Tech Stack

*   **Backend**: NestJS, TypeScript, Prisma (Mock), Class-Validator.
*   **Frontend**: Next.js 16 (App Router), Tailwind CSS, Axios.
*   **Protocol**: REST API (Ports: Backend 4000, Frontend 3000).

## 🏃‍♂️ Getting Started

### 1. Start the Backend
```bash
cd backend
npm install
npm run start:dev
```
*Server runs on http://localhost:4000*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*App runs on http://localhost:3000*

## 📚 Documentation
*   [Walkthrough & Verification Steps](./WALKTHROUGH.md)
*   [Interview Preparation Guide](./INTERVIEW_GUIDE.md)
*   [Deployment Guide](./DEPLOYMENT.md)

---
© 2025 Internal Tools Team.
