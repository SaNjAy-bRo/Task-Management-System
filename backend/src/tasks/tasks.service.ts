import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role, User as UserType } from '../prisma/types_workaround';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(createTaskDto: CreateTaskDto, user: { id: string }) {
        // Cast to any because our types workaround might not match generated client signature exactly
        // but arguments should be correct.
        return (this.prisma as any).task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                userId: user.id,
            },
            include: { user: true }
        });
    }

    async findAll(user: { id: string; role: Role }) {
        if (user.role === Role.ADMIN) {
            return (this.prisma as any).task.findMany({
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            });
        }
        return (this.prisma as any).task.findMany({
            where: { userId: user.id },
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOne(id: string, user: { id: string; role: Role }) {
        const task = await (this.prisma as any).task.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        if (user.role !== Role.ADMIN && task.userId !== user.id) {
            throw new ForbiddenException('You do not have permission to view this task');
        }

        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, user: { id: string; role: Role }) {
        // Check existence and permission first
        await this.findOne(id, user);

        return (this.prisma as any).task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async remove(id: string, user: { id: string; role: Role }) {
        await this.findOne(id, user);
        return (this.prisma as any).task.delete({
            where: { id },
        });
    }
}
