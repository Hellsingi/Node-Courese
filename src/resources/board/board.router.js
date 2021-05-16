const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const board = await boardsService.getAll();
  res.status(200).json(board);
});

router.post('/', async (req, res) => {
  const board = new Board(req.body);
  boardsService.save(board);
  res.status(201).json(board);
});

router.get('/:id', async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (!board) {
    res.status(404).end();
  } else {
    res.json(board);
  }
});

router.put('/:id', async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  boardsService.update(board, req.body);
  res.json(board);
});

router.delete('/:id', async (req, res) => {
  boardsService.deleteBoard(req.params.id);
  res.status(204).end();
});

module.exports = router;
