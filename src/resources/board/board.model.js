const uuid = require('uuid').v4;

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