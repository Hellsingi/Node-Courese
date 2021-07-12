import { BoardService } from './board.service';
import {Response} from 'express';
import Board from '../../entity/board.entity';
import TaskColumn from '../../entity/column.entity';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

function toResponse(board: Board) {
  const copy = board.columns?.map(col => {
    return { ...col, id: col.id?.toString() } as TaskColumn;
  });
  return { id: board.id?.toString(), columns: copy, title: board.title };
}

@Controller('boards')
export class BoardController {
  constructor(private readonly boardsService: BoardService) {
  }

  @Get()
  async getAll(@Res() res: Response) {
    const boards = await this.boardsService.getAll();
    res.status(HttpStatus.OK).json(boards.map(toResponse));
  }

  @Post()
  async createBoard(@Body() rawBoard: Board, @Res() res: Response) {
    const board = await this.boardsService.createBoard(rawBoard);
    res.status(201).json(toResponse(board));
  }

  @Get(':id')
  async getById(@Param() params, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const board = await this.boardsService.getById(Number(id)).catch(console.log.bind(console));
      if (!board) {
        res.status(404).send();
      } else {
        res.json(toResponse(board as Board));
      }
    }
  }

  @Put(':id')
  async putById(@Param() params, @Body() rawBoard: Board, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const board = await this.boardsService.putById(rawBoard, Number(id));
      res.json(toResponse(board as Board));
    }
  }

  @Delete(':id')
  async deleteById(@Param() params, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const status = await this.boardsService.deleteById(Number(id));
      res.status(status).send();
    }
  }
}
