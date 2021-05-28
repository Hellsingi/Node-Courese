const Task = require('./task.model');

const db = [new Task()];

const getAll = async () => db;


/**
 * Save new task
 * @param {string} title Task title
 * @param {number} order Task title
 * @param {description} description Task description
 * @param {userId} userId Task userId
 * @param {boardId} boardId boardId boardId
 * @param {columnId} columnId Task columnId
 * @returns {Task}
 */

const save = async (data) => db.push(data);

const getById = async (id) => db.find((task) => task.id === id);

const update = async (task, updateInfo) => {
  const idx = db.indexOf(task);
  const updateTask = { ...task, ...updateInfo };
  db.splice(idx, 1, updateTask);
  return updateTask;
};

const deleteTask = async (id) => {
  const task = await getById(id);
  if (!task) return false;
  const idx = db.indexOf(task);
  db.splice(idx, 1);
  return true;
};

const removeUsersTasks = async (id) => {
  const usersTasks = db.filter(({ userId }) => userId === id);
  usersTasks.forEach((task) => {
    update(task, {
      userId: null,
    });
  });

  return 'Deleted';
};

const removeBoardTasks = async (id) => {
  const boardTasks = db.filter(({ boardId }) => boardId === id);

  await Promise.allSettled(
    boardTasks.map(({ id: boardId }) => deleteTask(boardId))
  );

  return 'Deleted';
};

module.exports = {
  getAll,
  save,
  getById,
  update,
  deleteTask,
  removeUsersTasks,
  removeBoardTasks,
};
