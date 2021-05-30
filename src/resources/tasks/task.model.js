/**
 * Task model
 * @module task/model
 */

const uuid = require('uuid').v4;

/**
 * Task instance type
 * @typedef {Object} Task
 * @property {String} id id
 * @property {String} title title
 * @property {String} description description
 * @property {String|null} userId id of the user assigned to this instance
 * @property {String|null} boardId id of the board this instance belongs to
 * @property {String|null} columnId id of the column this instance belongs to
 * @property {Number} order order of this instance within its Column
 */

 /** Class representing a task */
class Task {
  constructor({
    id = uuid(),
    title = 'task',
    order = 1,
    description = 'play',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
