import { getRepository } from 'typeorm';
import { TaskDB } from '../../modelsDb/Task';

const getAll = async (): Promise<TaskDB[]> => {
  const taskRepository = await getRepository(TaskDB);
  const allTasks = await taskRepository.find({ where: {}, loadRelationIds: true })
  return allTasks;
}

const getById = async (id: string): Promise<TaskDB | null> => {
  const taskRepository = await getRepository(TaskDB);
  const findTask = await taskRepository.findOne({ where: { id }, loadRelationIds: true });
  return findTask ?? null;
}

const save = async (title: string, order: number, description: string, userId: string, boardId: string, columnId: string): Promise<TaskDB> => {
  const taskRepository = await getRepository(TaskDB);
  const newTask = await taskRepository.create({ title, order, description, userId, boardId, columnId })
  await taskRepository.save(newTask);
  return newTask;
};

const update = async (id: string, title: string, order: number, description: string, userId: string, boardId: string, columnId: string): Promise<TaskDB | null> => {
  const taskRepository = await getRepository(TaskDB);
  const findTask = await taskRepository.findOne(id);
  if (findTask === undefined) return null;
  await taskRepository.update(id, { title, order, description, userId, boardId, columnId })
  const newTask = await taskRepository.findOne(id)
  return newTask ?? null;
}

const deleteTaskById = async (id: string): Promise<boolean> => {
  const taskRepository = await getRepository(TaskDB);
  const deletedTask = await taskRepository.delete(id);
  if (deletedTask.affected) {
    return true;
  }
  return false;
}

const deleteTaskByBordId = async (boardId: string): Promise<void> => {
  const taskRepository = await getRepository(TaskDB);
  await taskRepository.delete({ boardId });
}

const anonymizeAssignee = async (userId: string): Promise<void> => {
  const taskRepository = await getRepository(TaskDB);
  await taskRepository.update({ userId }, { 'userId': null })
}
export { getAll, save, getById, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee };