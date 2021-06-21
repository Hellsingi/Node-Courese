import { getRepository } from 'typeorm';
import { BoardDB } from '../../modelsDb/Board';

const getAllBoards = async (): Promise<BoardDB[]> => {
  const boardRepository = await getRepository(BoardDB);
  const allBoards = await boardRepository.find();
  return allBoards;
}

const createBoard = async (board: BoardDB): Promise<BoardDB> => {
  const boardRepository = await getRepository(BoardDB);
  const newBoard = await boardRepository.create({ ...board });
  await boardRepository.save(newBoard);
  return newBoard;
};

const getById = async (id: string): Promise<BoardDB | undefined> => {
  const boardRepository = await getRepository(BoardDB);
  const findBoard = await boardRepository.findOne(id);
  return findBoard;
}

const updateBoard = async (board: BoardDB, newBoard: BoardDB): Promise<BoardDB | null> => {
  const boardRepository = await getRepository(BoardDB);
  const findBoard = await boardRepository.findOne(board.id);
  if (findBoard === undefined) return null;
  if (board.id === undefined) return null;
  await boardRepository.update(board.id, { ...newBoard });
  return findBoard;
}

const deleteBoard = async (id: string): Promise<boolean> => !!(await getRepository(BoardDB).delete(id));

export { getAllBoards, createBoard, getById, updateBoard, deleteBoard };