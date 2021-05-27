const Board = require('./board.model');

const db = [
  new Board({title: 'Board1'}),
  new Board({title: 'Board2'}),
];

const getAll = async () => db;

const save = async (data) => db.push(data);

const getById = async (id) => db.find((board) => board.id === id);

const update = async (board, newBoard) => {
  const idx = db.indexOf(board);
  db.splice(idx, 1, newBoard);
};

const deleteBoard = async (id) => {
  const board = await getById(id);
  const idx = db.indexOf(board);
  db.splice(idx, 1);
  return board;
};

module.exports = { getAll, save, getById, update, deleteBoard };
