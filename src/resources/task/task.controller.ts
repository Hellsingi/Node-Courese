import { TaskService } from './task.service';
import Task from '../../entity/task.entity';
import {Response} from 'express';
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';


function toResponse(task: Task) {
  const id = task.id?.toString();
  return { ...task, id };
}

@Controller('boards/:boardId/tasks/')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {
  }

  @Get()
  async getAll(@Res() res: Response) {
    const tasks = await this.tasksService.getAll();
    res.json(tasks.map(toResponse));
  }

  @Post()
  async createBoard(@Body() rawTask: Task, @Param() params, @Res() res: Response) {
    const newTask = { ...rawTask };
    const { boardId } = params;
    newTask.boardId = boardId;
    const task = await this.tasksService.createTask(newTask);
    res.status(201).json(toResponse(task));
  }

  @Get(':id')
  async getById(@Param() params, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const task = await this.tasksService.getById(Number(id)).catch(console.log.bind(console));
      if (!task) {
        res.status(404).send();
      } else {
        res.json(toResponse(task as Task));
      }
    }
  }

  @Put(':id')
  async putById(@Param() params, @Body() rawTask: Task, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const task = await this.tasksService.putById(rawTask, Number(id));
      res.json(toResponse(task as Task));
    }
  }

  @Delete(':id')
  async deleteById(@Param() params, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const status = await this.tasksService.deleteById(Number(id));
      res.status(status).send();
    }
  }
}
