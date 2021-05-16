const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const save = data => boardsRepo.save(data);

const getById = id => boardsRepo.getById(id);


const update = (board, newBoard) => boardsRepo.update(board, newBoard);

const deleteBoard = async id => {
  const taskDb = await tasksRepo.getAll();
  taskDb.forEach(task => {
    if (task.boardId === id) {
      tasksRepo.remove(task.id);
    }
  });

  boardsRepo.deleteBoard(id);
};

module.exports = { getAll, save, getById, update, deleteBoard };
