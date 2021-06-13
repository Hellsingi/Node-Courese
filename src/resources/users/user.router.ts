import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from './user.model'
import * as usersService from './user.service';
import { userValidation } from '../../middleware/errorHandler';
import { ExtendedError } from '../../logger/logger';

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.post('/', async (req, res, next) => {
  try {
    userValidation(req);
    const user = await new User(req.body);
    usersService.save(user);
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } catch (err) {
    next(err)
  }

});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.userId);
    if (!user) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "User not found.");
    }
    res.json(User.toResponse(user));
  } catch (err) {
    next(err)
  }
});

router.delete('/:userId', async (req, res) => {
  const deletedUser = await usersService.deleteUser(req.params.userId);
  if (!deletedUser) return;
  res.status(StatusCodes.NO_CONTENT).json(User.toResponse(deletedUser));
});

router.put('/:userId', async (req, res, next) => {
  try {
    userValidation(req);
    const user = await usersService.getById(req.params.userId);
    if (!user) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "User not found.");
    }
    const updateUser = await usersService.update(user, req.body);
    res.json(User.toResponse(updateUser));
  } catch (err) {
    next(err)
  }
});

export default router;
