/**
 * Board service
 * @module board/service
 */

const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * Calls repository to retrieve all boards
 * @returns {Board[]} return to array of boards
 * {@link module:board/repository}
 */

const getAll = () => boardsRepo.getAll();

/**
 * Forwards a newly-created Board instance to repository
 * @param {Object} props collection of key: value pairs
 * @returns {Promise<Board>} promise resolving to board
 * {@link module:board/repository}
 */

const save = (data) => boardsRepo.save(data);

/**
 * Calls board/repository to retrieve one board by id
 * @param {String} id board id
 * @returns {Promise<Board>} promise resolving to board
 * {@link module:board/repository}
 */

const getById = (id) => boardsRepo.getById(id);

/**
 * Forwards new props that should be applied to board with id to repository
 * @param {Object} Boardprops collection of key: value pairs
 * @param {Object} Boardprops collection of key: value pairs for update
 * @returns {Promise<Board>} promise resolving to Board
 * {@link module:board/repository}
 */

const update = (board, newBoard) => boardsRepo.update(board, newBoard);

/**
 * Calls repository to remove board and task service to remove all tasks associated with removed board
 * @param {String} id board id
 * @returns {Promise<Board>} promise resolving to Board
 * {@link module:board/repository}
 * {@link module:task/service}
 */

const deleteBoard = async (id) => {
  tasksRepo.removeBoardTasks(id);

  return boardsRepo.deleteBoard(id);
};

module.exports = { getAll, save, getById, update, deleteBoard };
