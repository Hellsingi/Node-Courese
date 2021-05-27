const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const user = await new User(req.body);
  usersService.save(user);
  res.status(201).json(User.toResponse(user));
});

router.get('/:userId', async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  res.json(User.toResponse(user));
});

router.delete('/:userId', async (req, res) => {
  const deletedUser = await usersService.deleteUser(req.params.userId);
  res.status(204).json(User.toResponse(deletedUser));
});

router.put('/:userId', async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  const updateUser = await usersService.update(user, req.body);
  res.json(User.toResponse(updateUser));
});

module.exports = router;
