const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const {
    params: { boardId },
  } = req;

  const task = await new Task({
    ...req.body,
    boardId,
  });
  tasksService.save(task);
  res.status(201).json(task);
});

router.get('/:taskId', async (req, res) => {
  const task = await tasksService.getById(req.params.taskId);
  if (!task) {
    res.status(404).send({ message: "task doesn't found" });
  } else {
    res.status(200).json(task);
  }
});

router.put('/:taskId', async (req, res) => {
  const task = await tasksService.getById(req.params.taskId);
  const updateTask = await tasksService.update(task, req.body);
  res.json(updateTask);
});

router.delete('/:taskId', async (req, res) => {
  const del = await tasksService.deleteTask(req.params.taskId);
  if (del) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
