import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from './task.model';
import * as tasksService from './task.service';

// const router = express.Router({ mergeParams: true });
const router = require('express').Router({ mergeParams: true });

router.get('/', async (_req: Request, res: Response) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.post('/', async (req: Request, res: Response) => {
  const { boardId } = req.params;

  const task = await new Task({
    ...req.body,
    boardId,
  });
  tasksService.create(task);
  res.status(StatusCodes.CREATED).json(task);
});

router.get('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await tasksService.getById(taskId as string);

  if (!task) {
    res.status(StatusCodes.NOT_FOUND).send({ message: "task doesn't found" });
  } else {
    res.status(StatusCodes.OK).json(task);
  }
});

router.put('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await tasksService.getById(taskId as string);
  if (!task) return;
  const updateTask = await tasksService.update(task, req.body);
  res.json(updateTask);
});

router.delete('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const del = await tasksService.deleteTask(taskId as string);
  if (del) {
    res.status(StatusCodes.NO_CONTENT).end();
  } else {
    res.status(StatusCodes.NOT_FOUND).end();
  }
});

module.exports = router;
