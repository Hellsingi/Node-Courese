import express from 'express';
import { User } from './user.model'
import * as usersService from './user.service';

const router = express.Router();

router.get('/', async (_req, res) => {
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
  if (!user) return;
  res.json(User.toResponse(user));
});

router.delete('/:userId', async (req, res) => {
  const deletedUser = await usersService.deleteUser(req.params.userId);
  if (!deletedUser) return;
  res.status(204).json(User.toResponse(deletedUser));
});

router.put('/:userId', async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  if (!user) return;
  const updateUser = await usersService.update(user, req.body);
  res.json(User.toResponse(updateUser));
});

module.exports = router;
