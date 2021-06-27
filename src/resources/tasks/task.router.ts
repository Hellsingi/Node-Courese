import { Request, Response, Router, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as tasksService from './task.service';
import { ExtendedError } from '../../logger/logger';
import { taskValidation } from '../../middleware/errorHandler';

const router = Router({ mergeParams: true });

router.get('/', async (_req: Request, res: Response) => {
  try {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json('Access token is missing or invalid');
  }
});;

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    taskValidation(req);
    const { title, order, description, userId, columnId } = req.body;
    const { boardId } = req.params;
    if (!boardId) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Board not found.");
    }

    const task = await tasksService.save(title, order, description, userId, boardId, columnId);
    if (task) {
      res.status(StatusCodes.CREATED).json(task);
    } else {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Task not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Task not found.");
    }
    const task = await tasksService.getTask(taskId);
    if (task) {
      res.status(StatusCodes.OK).json(task);
    } else {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Task not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    taskValidation(req);
    const { boardId, taskId } = req.params;

    const { title, order, description, userId, columnId } = req.body;
    if (!taskId || !boardId) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Task not found.");
    }
    const task = await tasksService.update(taskId, title, order, description, userId, boardId, columnId);
    if (task) {
      res.status(StatusCodes.OK).json(task);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json('Bad request');
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params
    const result = await tasksService.deleteTaskById(taskId as string);
    if (result) {
      res.status(StatusCodes.NO_CONTENT).json('The task has been deleted');
    } else {
      res.status(StatusCodes.NOT_FOUND).json('Task not found');
    }
  } catch (err) {
    next(err);
  }
});

export default router;
