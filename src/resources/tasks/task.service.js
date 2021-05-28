const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

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

const save = (data) => tasksRepo.save(data);

const getById = async (id) => {
  const task = await tasksRepo.getById(id);
  if (!task) return false;

  return task;
};

const update = (task, updateInfo) => tasksRepo.update(task, updateInfo);

const deleteTask = async (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, save, getById, update, deleteTask };
