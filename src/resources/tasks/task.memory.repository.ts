import { ITaskProps } from "./task.types";

const dbTasks: ITaskProps[] = [];

const getAllTasks = async () => dbTasks;

const createTask = async (task: ITaskProps) => dbTasks.push(task);

const getById = async (id: string) => dbTasks.find((task) => task.id === id);

const updateTask = async (task: ITaskProps, updateInfo: Partial<ITaskProps>): Promise<ITaskProps> => {
  const idx = dbTasks.indexOf(task);
  const updateTaskInfo = { ...task, ...updateInfo };
  dbTasks.splice(idx, 1, updateTaskInfo);
  return updateTaskInfo;
};

const deleteTask = async (id: string) => {
  const task = await getById(id);
  if (!task) return false;
  const idx = dbTasks.indexOf(task);
  dbTasks.splice(idx, 1);
  return true;
};

const removeUsersTasks = async (id: string) => {
  const usersTasks = dbTasks.filter(({ userId }) => userId === id);
  usersTasks.forEach((task) => {
    updateTask(task, {
      userId: null,
    });
  });

  return 'Deleted';
};

const removeBoardTasks = async (id: string) => {
  const boardTasks = dbTasks.filter(({ boardId }) => boardId === id);

  await Promise.allSettled(
    boardTasks.map(({ id: boardId }) => deleteTask(boardId))
  );

  return 'Deleted';
};

export {
  getAllTasks,
  createTask,
  getById,
  updateTask,
  deleteTask,
  removeUsersTasks,
  removeBoardTasks,
};
