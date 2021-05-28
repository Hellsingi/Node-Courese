/**
 * Board model
 * @module board/model
 */

const uuid = require('uuid').v4;

/**
 * Board instance type
 * @typedef {Object} Board
 * @property {String} id board id
 * @property {String} title board title
 * @property {Array<Column>} columns an array of Column instances
 */

 /** Class representing a board */

class Board {
  constructor({
    id = uuid(),
    title = 'test',
    columns = [
      {
        id: uuid(),
        title: 'backlog',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;