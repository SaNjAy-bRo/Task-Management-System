export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export interface User {
    id: string;
    email: string;
    name?: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status: TaskStatus;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
