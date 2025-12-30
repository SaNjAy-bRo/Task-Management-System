import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/user.decorator';
import { Role } from '../prisma/types_workaround';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: { id: string }) {
        return this.tasksService.create(createTaskDto, user);
    }

    @Get()
    findAll(@GetUser() user: { id: string; role: Role }) {
        return this.tasksService.findAll(user);
    }

    @Get('my')
    findMyTasks(@GetUser() user: { id: string; role: Role }) {
        // Re-use logic or just force filter. Service handles it cleanly if we pass User Role,
        // but specific endpoint for "my" usually means "Just mine regardless of admin".
        // Let's implement specific "my" logic by mocking a user role temporarily or adding method.
        // Actually, findAll returns ALL for admin. If admin wants to see "my tasks", they use this.
        // We can just filter by userId in service if we add a dedicated method.
        // For now, let's reuse `findAll` but with a trick: pass User Role as USER strictly to force own tasks?
        // Brittle. Let's add a direct service method or just return specific query.
        // For simplicity/speed:
        return this.tasksService.findAll({ ...user, role: Role.USER });
    }

    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: { id: string; role: Role }) {
        return this.tasksService.findOne(id, user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: { id: string; role: Role }) {
        return this.tasksService.update(id, updateTaskDto, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string, @GetUser() user: { id: string; role: Role }) {
        return this.tasksService.remove(id, user);
    }
}
