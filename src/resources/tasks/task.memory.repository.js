/**
 * Task repository
 * @module task/repository
 */

const Task = require('./task.model');

const db = [new Task()];

/**
 * Task instance type
 * @typedef {Object} Task
 * @ignore
 * @property {String} id id
 * @property {String} title title
 * @property {String} description description
 * @property {String|null} userId id of the user assigned to this instance
 * @property {String|null} boardId id of the board this instance belongs to
 * @property {String|null} columnId id of the column this instance belongs to
 * @property {Number} order order of this instance within its Column
 */


 /**
 * Retrieves all Tasks from a given boardId
 * @param {String} boardId id of a board the task belongs to
 * @returns {Promise<Array<Task>>} promise resolving to array tasks
 */

const getAll = async () => db;


/**
 * Forwards a task instance to database
 * @param {string} title Task title
 * @param {number} order Task title
 * @param {description} description Task description
 * @param {userId} userId Task userId
 * @param {boardId} boardId boardId boardId
 * @param {columnId} columnId Task columnId
 * @returns {Promise<Task>} promise resolving to task instance
 */

const saveTask = async (data) => db.push(data);

/**
 * Retrieves a Task instance by id and boardId
 * @param {String} boardId id of a board the task belongs to
 * @param {String} id task id
 * @returns {Promise<Task>} promise resolving to task
 */

const getById = async (id) => db.find((task) => task.id === id);

/**
 * Forwards set of new props to be applied to task on board
 * @param {Object} Taskprops collection of key: value task
 * @param {Object} Taskprops a collection of key: value for update task
 * @returns {Promise<Task>} promise resolving to updated Task
 */

const update = async (task, updateInfo) => {
  const idx = db.indexOf(task);
  const updateTask = { ...task, ...updateInfo };
  db.splice(idx, 1, updateTask);
  return updateTask;
};


/**
 * Deletes task from a given board
 * @param {String} id task id
 * @returns {boolean} success deleted or not
 */

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

/**
 * Deletes all tasks on a given board
 * @param {String} boardId board id
 * @returns {String}
 */

const removeBoardTasks = async (id) => {
  const boardTasks = db.filter(({ boardId }) => boardId === id);

  await Promise.allSettled(
    boardTasks.map(({ id: boardId }) => deleteTask(boardId))
  );

  return 'Deleted';
};

module.exports = {
  getAll,
  saveTask,
  getById,
  update,
  deleteTask,
  removeUsersTasks,
  removeBoardTasks,
};
