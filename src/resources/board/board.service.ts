import * as boardsRepo from './board.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';
import { BoardDB } from '../../modelsDb/Board';

const getAll = (): Promise<BoardDB[]> => boardsRepo.getAllBoards();

const create = (board: BoardDB): Promise<BoardDB> => boardsRepo.createBoard(board);

const getById = (id: string): Promise<BoardDB | undefined> => boardsRepo.getById(id);

const update = (board: BoardDB, newBoard: BoardDB): Promise<BoardDB | null> => boardsRepo.updateBoard(board, newBoard);

const deleteBoard = async (id: string): Promise<boolean> => {
  tasksRepo.removeBoardTasks(id);
  return boardsRepo.deleteBoard(id);
};

export { getAll, create, getById, update, deleteBoard };
