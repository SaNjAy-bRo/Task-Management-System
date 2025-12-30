export interface User {
    id: string;
    email: string;
    name?: string;
    role: 'USER' | 'ADMIN';
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
    userId: string;
    user?: User;
    createdAt: string;
}
