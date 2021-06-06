import { IBoardProps } from './board.types';
import * as boardsRepo from './board.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';

const getAll = () => boardsRepo.getAllBoards();

const create = (board: IBoardProps) => boardsRepo.createBoard(board);

const getById = (id: string) => boardsRepo.getById(id);

const update = (board: IBoardProps, newBoard: IBoardProps) => boardsRepo.updateBoard(board, newBoard);

const deleteBoard = async (id: string) => {
  tasksRepo.removeBoardTasks(id);

  return boardsRepo.deleteBoard(id);
};

export { getAll, create, getById, update, deleteBoard };
