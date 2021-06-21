import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as boardsService from './board.service';
import { boardValidation } from '../../middleware/errorHandler';
import { ExtendedError } from '../../logger/logger';

const router = express.Router();
router.route('/').get(async (_req, res, next) => {
  try {
    const board = await boardsService.getAll();
    res.status(StatusCodes.OK).json(board);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    boardValidation(req);
    const board =await boardsService.create(req.body);
    res.status(StatusCodes.CREATED).json(board);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const board = await boardsService.getById(req.params.id);
    if (!board) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Board not found.");
    } else {
      res.json(board);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    boardValidation(req);
    const board = await boardsService.getById(req.params.id);
    if (!board) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Board not found.");
    }
    boardsService.update(board, req.body);
    res.json(board);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedBoard = await boardsService.deleteBoard(req.params.id);
    res.status(StatusCodes.NO_CONTENT).json(deletedBoard);
  } catch (err) {
    next(err);
  }
});

export default router;
