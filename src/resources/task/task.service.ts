import tasksRepo from './task.memory.repository';
import Task from '../../entity/task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getAll = ():Promise<Task[]> => tasksRepo.getAll();

  createTask = (task: Task): Promise<Task> => tasksRepo.createTask(task);

  getById = (id: number):Promise<number | Task | undefined> => tasksRepo.getById(id);

  putById = (newTask:Task, id: number):Promise<Task | undefined>  => tasksRepo.putById(newTask, id);

  deleteById = (id: number):Promise<number> => tasksRepo.deleteById(id);

  public deleteUser = (id: number):Promise<void> => tasksRepo.deleteUser(id);

  public deleteBoard = (id: number):Promise<void> => tasksRepo.deleteBoard(id);
}
