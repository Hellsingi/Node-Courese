/**
 * User service
 * @module user/service
 */

const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

/**
 * Calls repository and retrieves all users
 * @returns {User[]} return to array of users
 * {@link module:user/repository}
 */

const getAll = () => usersRepo.getAll();

/**
 * Save a user from props and sends to repository to be added to database
 * @param {props} userProps collection of key: value pairs
 * @returns {User} return to user
 * {@link module:user/repository}
 */

const save = (data) => usersRepo.save(data);

/**
 * Calls repository and retrieves one user by id
 * @param {String} id user id
 * @returns {User} return to user
 * {@link module:user/repository}
 */

const getById = async (id) => {
  const user = await usersRepo.getById(id);
  if (!user) return {};

  return user;
};

/**
 * Forwards id of a user to be removed to repository, cleans up tasks
 * @param {String} id user id
 * @returns {User} return to user
 * {@link module:user/repository}
 * {@link module:task/service}
 */

const deleteUser = async (id) => {
  taskRepo.removeUsersTasks(id);
  return usersRepo.deleteUser(id);
};

/**
 * Forwards new user props to repository
 * @param {String} id user id
 * @param {Object} props collection of key: value pairs
 * @returns {User} return to user
 * {@link module:user/repository}
 */

const update = (user, updateInfo) => usersRepo.update(user, updateInfo);

module.exports = { getAll, save, getById, deleteUser, update };
