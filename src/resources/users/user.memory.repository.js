const User = require('./user.model');

/**
 * User repository
 * @module user/repository
 */

const db = [new User()];

/**
 * Retrieves all users in database
 * @returns {<Array<User>>}  return to an array of users
 */

const getAll = async () => db;

/**
 * Add a User instance to database
 * @param {User} userInstance user instance
 * @returns {<User>} return a user
 */

const save = async (data) => db.push(data);

/**
 * Retrieves a user by id
 * @param {String} id  user id
 * @returns {<User>}  return to user instance
 */

const getById = async (id) => db.find((user) => user.id === id);

/**
 * Delete user by id
 * @param {String} id  user id
 * @returns {<User>}  return to user instance
 */

const deleteUser = async (id) => {
  const user = await getById(id);
  const idx = db.indexOf(user);
  db.splice(idx, 1);
  return user || {};
};

/**
 * Forwards props with new values to database to create a new User
 * @param {String} id user id
 * @param {Object} props collection of key: value pairs
 * @returns {<User>} return a user
 */

const update = async (user, updateInfo) => {
  const idx = db.indexOf(user);
  const updateUser = { ...user, ...updateInfo };

  db.splice(idx, 1, updateUser);
  return updateUser;
};

module.exports = { getAll, save, getById, deleteUser, update };
