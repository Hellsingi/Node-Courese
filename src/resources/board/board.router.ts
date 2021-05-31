import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { Board } from './board.model';
import * as boardsService from './board.service';

const router = express.Router();
router.route('/').get(async (_req, res) => {
  const board = await boardsService.getAll();
  res.status(StatusCodes.OK).json(board);
});

router.post('/', async (req, res) => {
  const board = new Board(req.body);
  boardsService.create(board);
  res.status(StatusCodes.CREATED).json(board);
});

router.get('/:id', async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (!board) {
    res.status(StatusCodes.NOT_FOUND).end();
  } else {
    res.json(board);
  }
});

router.put('/:id', async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (!board) return;
  boardsService.update(board, req.body);
  res.json(board);
});

router.delete('/:id', async (req, res) => {
  const deletedBoard = await boardsService.deleteBoard(req.params.id);
  res.status(StatusCodes.NO_CONTENT).json(deletedBoard);
});

module.exports = router;
