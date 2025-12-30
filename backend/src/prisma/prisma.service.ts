import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { User, Task, Role, TaskStatus } from './types_workaround';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  // In-memory storage
  private users: User[] = [];
  private tasks: Task[] = [];

  constructor() {
    this.logger.warn('Running with In-Memory Mock Database (Prisma Generation Failed)');
  }

  async onModuleInit() {
    this.logger.log('Connected to In-Memory Database');
  }

  async onModuleDestroy() {
    this.logger.log('Disconnected from In-Memory Database');
  }

  // Mocking Prisma Client 'user' delegate
  get user() {
    return {
      findUnique: async (args: { where: { email?: string; id?: string } }) => {
        if (args.where.email) {
          return this.users.find(u => u.email === args.where.email) || null;
        }
        if (args.where.id) {
          return this.users.find(u => u.id === args.where.id) || null;
        }
        return null;
      },
      create: async (args: { data: any }) => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: args.data.email,
          name: args.data.name,
          role: args.data.role || Role.USER,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
      },
    };
  }

  // Mocking Prisma Client 'task' delegate
  get task() {
    return {
      findMany: async (args?: { where?: any; include?: any; orderBy?: any }) => {
        let results = [...this.tasks];

        // Simple filtering
        if (args?.where?.userId) {
          results = results.filter(t => t.userId === args.where.userId);
        }

        // Sorting (desc)
        if (args?.orderBy?.createdAt === 'desc') {
          results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }

        // Mock inclusion of user
        if (args?.include?.user) {
          results = results.map(t => ({
            ...t,
            user: this.users.find(u => u.id === t.userId)
          }));
        }

        return results;
      },
      findUnique: async (args: { where: { id: string }; include?: any }) => {
        const task = this.tasks.find(t => t.id === args.where.id);
        if (!task) return null;

        if (args.include?.user) {
          return {
            ...task,
            user: this.users.find(u => u.id === task.userId)
          };
        }
        return task;
      },
      create: async (args: { data: any; include?: any }) => {
        const newTask: Task = {
          id: `task-${Date.now()}`,
          title: args.data.title,
          description: args.data.description,
          status: TaskStatus.PENDING,
          userId: args.data.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.tasks.push(newTask);

        if (args.include?.user) {
          return {
            ...newTask,
            user: this.users.find(u => u.id === newTask.userId)
          };
        }
        return newTask;
      },
      update: async (args: { where: { id: string }; data: any }) => {
        const taskIndex = this.tasks.findIndex(t => t.id === args.where.id);
        if (taskIndex === -1) throw new Error('Task not found');

        const updatedTask = { ...this.tasks[taskIndex], ...args.data, updatedAt: new Date() };
        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
      },
      delete: async (args: { where: { id: string } }) => {
        const taskIndex = this.tasks.findIndex(t => t.id === args.where.id);
        if (taskIndex === -1) throw new Error('Task not found');

        const deleted = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1);
        return deleted;
      }
    };
  }
}
