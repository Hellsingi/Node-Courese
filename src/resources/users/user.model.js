const uuid = require('uuid').v4;

/**
 * User model
 * @module user/model
 */

/**
 * User instance type
 * @typedef {Object} User
 * @property {String} id user id
 * @property {String} name user name
 * @property {String} login user login
 * @property {String} password user password
 */

/** Class representing a user */

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Strips provided userInstance to basic properties and returns a JS object without password
   * @param {User} userInstance user instance
   * @returns {Object} simple JavaScript object without password field
   */

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
