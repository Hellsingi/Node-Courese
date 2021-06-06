import { IBoardProps } from './board.types';

const dbBoards: IBoardProps[] = [];

const getAllBoards = async () => dbBoards;

const createBoard = async (board: IBoardProps) => dbBoards.push(board);

const getById = async (id: string) => dbBoards.find((board) => board.id === id);

const updateBoard = async (board: IBoardProps, newBoard: IBoardProps) => {
  const idx = dbBoards.indexOf(board);
  dbBoards.splice(idx, 1, newBoard);
};

const deleteBoard = async (id: string) => {
  const board = await getById(id);
  if (!board) return null;
  const idx = dbBoards.indexOf(board);
  dbBoards.splice(idx, 1);
  return board;
};

export { getAllBoards, createBoard, getById, updateBoard, deleteBoard };
