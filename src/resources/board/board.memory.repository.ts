import  TaskRepository from '../task/task.memory.repository';
import Board from '../../entity/board.entity';
import { getRepository } from 'typeorm';
import TaskColumn from '../../entity/column.entity';

const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({ relations: ["columns"] });
};


const createBoard = async (board: Board): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const newBoard = boardRepository.create(board);
  return boardRepository.save(newBoard);
};


const getById = async (id: number): Promise<number | Board | undefined> => {
  const boardRepository = getRepository(Board);
  return boardRepository.findOne(id,{ relations: ["columns"] });
};

const putById = async (newBoard: Board, id: number): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(TaskColumn);
  const oldBoard = await boardRepository.findOne(id, { relations: ["columns"] });
  const { columns = [], title } = newBoard;
  const deleteResults = oldBoard?.columns?.map((col) =>  columnRepository.delete(Number(col.id)));
  if (deleteResults) {
    await Promise.all(deleteResults);
  }
  const newCols = columns.map((col) => columnRepository.create(col));
  if (title) {
    const board = await boardRepository.findOne(id);
    if (board) {
      await boardRepository.update(id, {title});
    }
  }
  const board = await boardRepository.findOne(id);
  await columnRepository.save(newCols);
  if (board) {
    board.columns = newCols;
    return boardRepository.save(board);
  }
  return undefined;
};


const deleteById = async (id: number): Promise<number> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  if (board) {
    await TaskRepository.deleteBoard(id);
    await boardRepository.delete(id);
    return 204;
  }
  return 404;
};

export default { getAll, createBoard, getById, putById, deleteById };

