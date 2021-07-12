import Task from '../../entity/task.entity';
import { getRepository } from 'typeorm';

const getAll = async (): Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find();
};


const createTask = async (task: Task): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create(task);
  return await taskRepository.save(newTask);
};


const getById = async (id: number): Promise<number | Task | undefined> => {
  const taskRepository = getRepository(Task);
  return taskRepository.findOne(id);
};


const putById = async (newTask: Task, id: number): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  await taskRepository.update(id, newTask);
  return newTask;
};


const deleteById = async (id: number): Promise<number> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id);
  if (task) {
    await taskRepository.delete(id.toString());
    return 204;
  }
  return 404;
};

const deleteUser = async (id: number): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find();
  tasks.map(async (task) => {
    if (task.userId === id.toString()) {
      await taskRepository.update(Number(task.id),{  userId: null });
    }
  });
};


const deleteBoard = async (id: number): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find();
  tasks.map(async (task) => {
    if (task.boardId === id.toString())
      await taskRepository.delete(Number(task.id));
  });
};
export default { getAll, createTask, getById, putById, deleteById, deleteUser, deleteBoard };

