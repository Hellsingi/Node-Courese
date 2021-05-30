/**
 * Board repository
 * @module board/repository
 */


 /**
 * Board instance type
 * @typedef {Object} Board
 * @ignore
 * @property {String} id board id
 * @property {String} title board title
 * @property {Array<Column>} columns an array of Column instances
 */

const Board = require('./board.model');

const db = [
  new Board({title: 'Board1'}),
  new Board({title: 'Board2'}),
];

/**
 * Retrieves all instances of Board class
 * @returns {Promise<Array<Board>>} promise resolving to array of all boards
 */

const getAll = async () => db;

/**
 * Forwards an instance of Board to be added to database
 * @param {Board} boardInstance board instance
 * @returns {Promise<Board>} promise resolving to provided boardInstance
 */

const save = async (data) => db.push(data);

/**
 * Retrieves an instance of Board by id
 * @param {String} id board id
 * @returns {Promise<Board>} promise resolving to board
 */

const getById = async (id) => db.find((board) => board.id === id);

/**
 * Forwards set of new props to be applied to board with id
 * @param {Board} Boardprops collection of key: value pairs
 * @param {Object} Boardprops collection of key: value pairs for update
 * @returns {Promise<Board>} promise resolving to updated Board instance
 */

const update = async (board, newBoard) => {
  const idx = db.indexOf(board);
  db.splice(idx, 1, newBoard);
};

/**
 * Forwards id of a board to be removed to database
 * @param {Sting} id board id
 * @returns {Promise<Board>} promise resolving to updated Board instance
 */

const deleteBoard = async (id) => {
  const board = await getById(id);
  const idx = db.indexOf(board);
  db.splice(idx, 1);
  return board;
};

module.exports = { getAll, save, getById, update, deleteBoard };
