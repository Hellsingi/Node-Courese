import * as tasksRepo from './task.memory.repository';
import { ITaskProps } from './task.types';

const getAll = () => tasksRepo.getAllTasks();

const create = (data: ITaskProps) => tasksRepo.createTask(data);

const getById = async (id: string) => {
  const task = await tasksRepo.getById(id);
  if (!task) return false;

  return task;
};

const update = (task: ITaskProps, updateInfo: Partial<ITaskProps>) => tasksRepo.updateTask(task, updateInfo);

const deleteTask = async (id: string) => tasksRepo.deleteTask(id);

export { getAll, create, getById, update, deleteTask };
