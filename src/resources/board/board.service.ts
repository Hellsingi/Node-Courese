import boardsRepo from './board.memory.repository';
import Board from '../../entity/board.entity';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getAll = ():Promise<Board[]> => boardsRepo.getAll();

  createBoard = (board: Board):Promise<Board> => boardsRepo.createBoard(board);

  getById = (id: number):Promise<number | Board | undefined> => boardsRepo.getById(id);

  putById = (newBoard: Board, id: number):Promise<Board | undefined> => boardsRepo.putById(newBoard, id);

  deleteById = (id:number):Promise<number> => boardsRepo.deleteById(id);
}
