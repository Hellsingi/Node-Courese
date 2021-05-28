/**
 * Task service
 * @module task/service
 */

const tasksRepo = require('./task.memory.repository');

/**
 * Calls repository  and retrieves all tasks on that board
 * @returns {Task[]} return array of tasks on board
 * {@link module:task/repository}
 */

const getAll = () => tasksRepo.getAll();

/**
 * Save a  Task instance from props and forwards to repository to be added to db
 * @param {Object} Taskprops collection of key: value pairs
 * @returns {Task} return to task on board
 * {@link module:task/repository}
 */

const save = (data) => tasksRepo.saveTask(data);

/**
 * Calls repository and retrieves one task by id
 * @param {String} id task id
 * @returns {Task} return to task on board
 * {@link module:task/repository}
 */

const getById = async (id) => {
  const task = await tasksRepo.getById(id);
  if (!task) return false;

  return task;
};

/**
 * Forwards new props to be applied to task on board
 * @param {Object} Taskprops collection of key: value task
 * @param {Object} Taskprops a collection of key: value for update task
 * @returns {Task}
 * {@link module:task/repository}
 */

const update = (task, updateInfo) => tasksRepo.update(task, updateInfo);

/**
 * Calls repository to remove task on board
 * @param {String} id - task id
 * @returns {boolean} success deleted or not
 * {@link module:task/repository}
 */

const deleteTask = async (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, save, getById, update, deleteTask };
